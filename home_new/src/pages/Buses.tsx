// src/pages/Buses.tsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, CircleMarker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Stop = { lat: number; lon: number; name: string; name_translated?: string };
type Route = { id?: string | number; route_no?: string | number; stops: Stop[]; polyline?: [number, number][] };
type Bus = { bus_id?: string | number; latitude?: number; longitude?: number; next_stop?: any; eta_minutes?: number };

function Buses({ lang }: { lang: string }) {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const busRes = await fetch(`http://localhost:5000/api/buses?lang=${lang}`);
        const busesData = await busRes.json();
        if (!mounted) return;
        setBuses(busesData);

        const routeRes = await fetch(`http://localhost:5000/api/routes?lang=${lang}`);
        const routesData = await routeRes.json();
        if (!mounted) return;
        setRoutes(routesData);
      } catch (err) {
        if (!mounted) return;
        setError("Failed to fetch buses or routes. Make sure backend is running.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, [lang]);

  const busIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61239.png",
    iconSize: [25, 25],
  });

  // ... rest of the JSX unchanged (copy from buses.js) ...
  return (
    <section>
      <h2>Live Buses</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="buses-layout">
        <div className="buses-routes">
          <h3>Routes</h3>
          {[...routes]
            .sort((a, b) => {
              const numA = Number((a as any).route_no ?? (a as any).id);
              const numB = Number((b as any).route_no ?? (b as any).id);
              return numA - numB;
            })
            .map((route, idx) => (
              <div
                key={idx}
                className={`route-card${selectedRoute === idx ? " selected" : ""}`}
                onClick={() => setSelectedRoute(idx)}
              >
                <b>Route {route.route_no ? route.route_no : route.id}</b>
                {selectedRoute === idx && (
                  <div className="stops-list">
                    <h4>Stops:</h4>
                    {route.stops.map((stop, i) => (
                      <div key={i} className="stop-item">
                        {stop.name_translated || stop.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="buses-map">
          <div id="map" style={{ height: 400, width: "100%", marginTop: 10 }}>
            <MapContainer center={[11.025, 76.905]} zoom={12} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
              {selectedRoute !== null && routes[selectedRoute] && (
                <>
                  {routes[selectedRoute].stops.map((stop, i) => (
                    <CircleMarker
                      key={i}
                      center={[stop.lat, stop.lon]}
                      radius={7}
                      // DO NOT set explicit colors if you want Tailwind control; here inline is fine
                      color="#38bdf8"
                      fillColor="#0ea5e9"
                      fillOpacity={0.9}
                    >
                      <Popup>{stop.name_translated || stop.name}</Popup>
                    </CircleMarker>
                  ))}
                  {routes[selectedRoute].polyline && routes[selectedRoute].polyline.length > 0 ? (
                    <Polyline positions={routes[selectedRoute].polyline as any} color="#38bdf8" weight={6} />
                  ) : (
                    <Polyline
                      positions={routes[selectedRoute].stops.map((s) => [s.lat, s.lon]) as any}
                      color="#0ea5e9"
                      dashArray="5,5"
                    />
                  )}
                </>
              )}
              {buses.map(
                (bus, i) =>
                  bus.latitude &&
                  bus.longitude && (
                    <Marker key={i} position={[bus.latitude as number, bus.longitude as number]} icon={busIcon}>
                      <Popup>
                        Bus {bus.bus_id}
                        <br />
                        Next Stop: {bus.next_stop?.name_translated || "End"}
                        <br />
                        ETA: {bus.eta_minutes || "N/A"} min
                      </Popup>
                    </Marker>
                  )
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Buses;
