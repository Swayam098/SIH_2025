import supabase from "./db.js";
import haversine from "haversine-distance";

async function getBusStatus(busId, lang = "en") {
  // 1️⃣ Latest location
  const { data: locData, error: locError } = await supabase
    .from("locations")
    .select("*")
    .eq("bus_id", busId)
    .order("timestamp", { ascending: false })
    .limit(1);
  if (locError || !locData?.length) return lang === "ta" ? "பஸ் இருப்பிடம் இல்லை." : lang === "hi" ? "बस स्थान नहीं मिला।" : "No bus location found.";

  const busLoc = locData[0];

  // 2️⃣ Bus route
  const { data: busData, error: busError } = await supabase
    .from("buses")
    .select("route_id")
    .eq("id", busId)
    .single();
  if (busError || !busData) return lang === "ta" ? "பஸ் பாதை கிடைக்கவில்லை." : lang === "hi" ? "बस का मार्ग नहीं मिला।" : "No route found for this bus.";

  const routeId = busData.route_id;

  // 3️⃣ Get stops with translations
  const { data: stopsData, error: stopsError } = await supabase
    .from("route_stops")
    .select(`
      stop_order,
      stops (
        id,
        name,
        lat,
        lon,
        translations
      )
    `)
    .eq("route_id", routeId)
    .order("stop_order", { ascending: true });

  if (stopsError || !stopsData?.length) return lang === "ta" ? "பாதை நிறுத்தங்கள் இல்லை." : lang === "hi" ? "कोई स्टॉप नहीं मिला।" : "No stops found for this route.";

  const stops = stopsData.map(s => {
    const tName = lang === "en" ? s.stops.name : s.stops.translations?.[lang] || s.stops.name;
    return {
      order: s.stop_order,
      name: tName,
      lat: s.stops.lat,
      lon: s.stops.lon
    };
  });

  // 4️⃣ Nearest stop
  let lastStop = null;
  let nextStop = null;
  for (let i = 0; i < stops.length; i++) {
    const dist = haversine({ lat: busLoc.latitude, lon: busLoc.longitude }, { lat: stops[i].lat, lon: stops[i].lon });
    if (dist < 300) {
      lastStop = stops[i];
      nextStop = stops[i + 1] || null;
      break;
    }
  }

  // 5️⃣ ETA
  let eta = lang === "ta" ? "ஏன்.ஏ." : lang === "hi" ? "एन/ए" : "N/A";
  if (nextStop) {
    const dist = haversine({ lat: busLoc.latitude, lon: busLoc.longitude }, { lat: nextStop.lat, lon: nextStop.lon });
    const avgSpeed = 10; // m/s
    eta = Math.round(dist / avgSpeed / 60); // minutes
  }

  const totalStopsLeft = nextStop ? stops.length - nextStop.order + 1 : 0;

  // 6️⃣ SMS-style message per language
  const templates = {
    en: `Bus ${busId} | Last: ${lastStop ? lastStop.name : "N/A"} | Next: ${nextStop ? nextStop.name : "End"} (ETA: ${eta} min) | Stops Left: ${totalStopsLeft}`,
    hi: `बस ${busId} | पिछला: ${lastStop ? lastStop.name : "N/A"} | अगला: ${nextStop ? nextStop.name : "अंत"} (ETA: ${eta} मिनट) | शेष स्टॉप: ${totalStopsLeft}`,
    ta: `பஸ் ${busId} | கடைசி: ${lastStop ? lastStop.name : "N/A"} | அடுத்தது: ${nextStop ? nextStop.name : "முடிவு"} (ETA: ${eta} நிமிடம்) | மீதமுள்ள நிறுத்தங்கள்: ${totalStopsLeft}`
  };

  return templates[lang] || templates["en"];
}

export default getBusStatus;
