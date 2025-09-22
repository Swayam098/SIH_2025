import haversine from "haversine-distance";

/**
 * Compute ETA in minutes given current location and next stop
 * @param {object} current {lat, lng}
 * @param {object} stop {lat, lng}
 * @param {number} speedKmH average speed of bus
 */
export function computeETA(current, stop, speedKmH = 25) {
  if (!current || !stop) return null;

  const distanceMeters = haversine(current, stop); // meters
  const distanceKm = distanceMeters / 1000;
  const etaHours = distanceKm / speedKmH;
  return Math.round(etaHours * 60); // return ETA in minutes
}
