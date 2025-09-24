
interface Point {
  lat: number;
  lon: number;
}

/**
 * Calculates the distance between two points on Earth using the Haversine formula.
 * @param p1 - The first point { lat, lon }.
 * @param p2 - The second point { lat, lon }.
 * @returns The distance in kilometers.
 */
export function haversineDistance(p1: Point, p2: Point): number {
  const R = 6371; // Radius of the Earth in kilometers
  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(p2.lat - p1.lat);
  const dLon = toRad(p2.lon - p1.lon);
  const lat1 = toRad(p1.lat);
  const lat2 = toRad(p2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
