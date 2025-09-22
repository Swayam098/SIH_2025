import express from "express";
import cors from "cors";     
import supabase from "./db.js";
import { computeETA } from "./utils.js";
import { ensureStopTranslation } from "./translate.js";
import getBusStatus from "./telemetry_sms.js";

 

const app = express();
app.use(cors());          
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => res.send("Backend with Supabase is running!"));

// ✅ Get all stops
app.get("/api/stops", async (req, res) => {
  try {
    const targetLang = (req.query.lang || "en").toLowerCase();

    const { data: stops, error } = await supabase
      .from("stops")
      .select("id, name, lat, lon, translations");

    if (error) throw error;

    const mapped = await Promise.all(
      stops.map(async (s) => {
        const translatedName =
          targetLang === "en"
            ? s.name
            : s.translations?.[targetLang] ||
              (await ensureStopTranslation(s.id, s.name, targetLang));

        return {
          id: s.id,
          name: s.name,
          name_translated: translatedName,
          lat: s.lat,
          lon: s.lon,
        };
      })
    );

    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stops", details: err.message });
  }
});

// ✅ Get all routes
app.get("/api/routes", async (req, res) => {
  try {
    const lang = (req.query.lang || "en").toLowerCase();

    const { data: routes, error } = await supabase
      .from("routes")
      .select("id, name, polyline");  // ⬅ fetch polyline too

    if (error) throw error;

    const routesWithStops = await Promise.all(
      routes.map(async (route) => {
        const { data: rs, error: stopError } = await supabase
          .from("route_stops")
          .select("stop_order, stops(id, name, lat, lon, translations)")
          .eq("route_id", route.id)
          .order("stop_order", { ascending: true });

        if (stopError) throw stopError;

        const stops = await Promise.all(
          rs.map(async (r) => {
            const s = r.stops;
            const name_translated =
              lang === "en"
                ? s.name
                : s.translations?.[lang] ||
                  (await ensureStopTranslation(s.id, s.name, lang));
            return {
              stop_order: r.stop_order,
              id: s.id,
              name: s.name,
              name_translated,
              lat: s.lat,
              lon: s.lon,
            };
          })
        );

        return { 
          id: route.id, 
          name: route.name, 
          stops, 
          polyline: route.polyline ? JSON.parse(route.polyline) : null // ✅ send parsed polyline
        };
      })
    );

    res.json(routesWithStops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch routes", details: err.message });
  }
});


// ✅ Get all buses with latest location + ETA
app.get("/api/buses", async (req, res) => {
  const lang = (req.query.lang || "en").toLowerCase();

  try {
    const { data: buses, error: busError } = await supabase
      .from("buses")
      .select("id, route_id, status");
    if (busError) throw busError;

    const { data: routes, error: routeError } = await supabase
      .from("routes")
      .select("id, name");
    if (routeError) throw routeError;

    const busLocations = await Promise.all(
      buses.map(async (bus) => {
        const { data: locs, error: locError } = await supabase
          .from("locations")
          .select("latitude, longitude, timestamp")
          .eq("bus_id", bus.id)
          .order("timestamp", { ascending: false })
          .limit(1);

        if (locError) throw locError;
        const latestLoc = locs[0] || null;

        // fetch route stops
        const { data: rs, error: stopError } = await supabase
          .from("route_stops")
          .select("stop_order, stops(id, name, lat, lon, translations)")
          .eq("route_id", bus.route_id)
          .order("stop_order", { ascending: true });
        if (stopError) throw stopError;

        const stops = rs.map(r => ({ order: r.stop_order, ...r.stops }));

        // pick next stop
        let nextStop = null;
        if (stops.length && latestLoc) {
          nextStop =
            stops.find(
              (s) =>
                computeETA(
                  { lat: latestLoc.latitude, lng: latestLoc.longitude },
                  { lat: s.lat, lng: s.lon }
                ) > 0
            ) || stops[stops.length - 1];
        }

        let translatedNextStop = null;
        let eta = null;
        if (nextStop && latestLoc) {
          const translatedName = await ensureStopTranslation(
            nextStop.id,
            nextStop.name,
            lang
          );
          translatedNextStop = {
            id: nextStop.id,
            lat: nextStop.lat,
            lon: nextStop.lon,
            name_translated: translatedName,
          };
          eta = computeETA(
            { lat: latestLoc.latitude, lng: latestLoc.longitude },
            { lat: nextStop.lat, lng: nextStop.lon }
          );
        }

        return {
          bus_id: bus.id,
          route_id: bus.route_id,
          status: bus.status,
          latitude: latestLoc?.latitude,
          longitude: latestLoc?.longitude,
          timestamp: latestLoc?.timestamp,
          next_stop: translatedNextStop,
          eta_minutes: eta
        };
      })
    );

    res.json(busLocations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch buses", details: err.message });
  }
});

// ✅ Update bus location
app.post("/api/location", async (req, res) => {
  const { bus_id, latitude, longitude } = req.body;
  if (!bus_id || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing bus_id, latitude or longitude" });
  }

  const { data, error } = await supabase
    .from("locations")
    .insert([{ bus_id, latitude, longitude }]);

  if (error) return res.status(500).json(error);
  res.json({ message: "Location updated", data });
});

app.get("/api/sms", async (req, res) => {
  const busId = parseInt(req.query.bus_id);
  const lang = req.query.lang || "en";
  if (isNaN(busId)) {
    return res.status(400).json({ error: "Invalid bus_id" });
  }
  try {
    const message = await getBusStatus(busId, lang);
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: "Failed to get SMS response", details: err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
