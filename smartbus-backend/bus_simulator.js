import supabase from "./db.js";
import haversine from "haversine-distance"; // npm install haversine-distance

// Simulation settings
const TIME_SCALE = 5; // 1 min real = 5 sec simulation
const STOP_RADIUS_M = 50; // meters to detect stop
const AVG_SPEED_MPS = 10; // ~36 km/h

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Simulate a single bus along its polyline and stops ---
async function simulateBus(bus, polyline, stops) {
  console.log(`🚍 Starting simulation for Bus ${bus.id} on Route ${bus.route_id}`);

  for (let i = 0; i < polyline.length; i++) {
    const point = polyline[i];
    const lat = Number(point[0]);
    const lon = Number(point[1]);

    if (isNaN(lat) || isNaN(lon)) {
      console.warn(`⚠️ Skipping invalid polyline point at index ${i}:`, point);
      continue;
    }

    // Insert current location
    const { error: insertError } = await supabase.from("locations").insert({
      bus_id: bus.id,
      latitude: lat,
      longitude: lon,
      timestamp: new Date().toISOString()
    });

    if (insertError) {
      console.error(`❌ Error inserting location for Bus ${bus.id}:`, insertError.message);
    } else {
      console.log(`✅ Bus ${bus.id} moved to [${lat.toFixed(5)}, ${lon.toFixed(5)}]`);
    }

    // Check if near a stop
    const stopHere = stops.find(s => haversine({ lat, lon }, { lat: s.lat, lon: s.lon }) < STOP_RADIUS_M);
    if (stopHere) {
      console.log(`⏸️ Bus ${bus.id} stopping at ${stopHere.name}`);
      await wait(5000 / TIME_SCALE); // simulate stop
    }

    // Wait proportional to distance to next point
    if (i < polyline.length - 1) {
      const [nextLat, nextLon] = polyline[i + 1];
      const dist = haversine({ lat, lon }, { lat: nextLat, lon: nextLon });
      const waitTime = Math.max(5000, (dist / AVG_SPEED_MPS / TIME_SCALE) * 1000);
      await wait(waitTime);
    }
  }

  console.log(`🏁 Bus ${bus.id} completed Route ${bus.route_id}\n`);
}

// --- Run simulation for all buses ---
async function runSimulation() {
  const { data: buses, error: busError } = await supabase
    .from("buses")
    .select("id, route_id");

  if (busError) {
    console.error("❌ Error fetching buses:", busError.message);
    return;
  }

  // Map each bus to its simulation promise
  const simulationPromises = buses.map(async (bus) => {
    // fetch polyline
    const { data: route, error: routeError } = await supabase
      .from("routes")
      .select("polyline")
      .eq("id", bus.route_id)
      .single();
    if (routeError || !route?.polyline) return;

    let polyline = route.polyline;
    if (typeof polyline === "string") polyline = JSON.parse(polyline);
    if (!Array.isArray(polyline) || !polyline.every(p => Array.isArray(p) && p.length === 2)) return;

    // fetch stops
    const { data: stops, error: stopError } = await supabase
      .from("route_stops")
      .select("stop_order, stops (id, name, lat, lon)")
      .eq("route_id", bus.route_id)
      .order("stop_order", { ascending: true });
    if (stopError) return;

    const stopList = stops.map(s => ({
      id: s.stops.id,
      name: s.stops.name,
      lat: s.stops.lat,
      lon: s.stops.lon
    }));

    await simulateBus(bus, polyline, stopList);
  });

  // Run all simulations concurrently
  await Promise.all(simulationPromises);

  console.log("✅ All bus simulations completed.");
}


// Start simulation
runSimulation();
