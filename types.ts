export interface Settings {
  bikeModel: string;
  tankCapacityL: number;
  fuelEconomyKmPerL: number;
  reserveLiters: number;
}

export interface RefuelRecord {
  id: number;
  timestamp: number;
  liters: number;
  pricePerLiter?: number;
  totalCost?: number;
  odometerKm: number;
  notes?: string;
}

export interface TripLog {
  id: number;
  startTimestamp: number;
  endTimestamp: number;
  distanceKm: number;
  averageSpeedKph: number;
  fuelConsumedL: number;
}

export interface GpsPosition {
  latitude: number;
  longitude: number;
  speed: number | null; // meters per second
  timestamp: number;
}

export interface GpsError {
  code: number;
  message: string;
}