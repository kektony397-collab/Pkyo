
import { StateCreator } from 'zustand';
import { AllSlices } from '../useBoundStore';

export interface BikeStateSlice {
  currentFuelL: number;
  tripKm: number;
  totalOdometerKm: number;
  currentSpeedKph: number;
  isGpsAvailable: boolean;
  isNetworkAvailable: boolean;
  actions: {
    updatePosition: (speedKph: number, distanceDeltaKm: number) => void;
    consumeFuel: (fuelConsumedL: number) => void;
    setGpsStatus: (isAvailable: boolean) => void;
    addFuel: (liters: number) => void;
    resetTrip: () => void;
  };
}

export const createBikeStateSlice: StateCreator<
  AllSlices,
  [],
  [],
  BikeStateSlice
> = (set, get) => ({
  currentFuelL: 10,
  tripKm: 0,
  totalOdometerKm: 12345,
  currentSpeedKph: 0,
  isGpsAvailable: false,
  isNetworkAvailable: navigator.onLine,
  actions: {
    updatePosition: (speedKph, distanceDeltaKm) =>
      set((state) => ({
        currentSpeedKph: speedKph,
        tripKm: state.tripKm + distanceDeltaKm,
        totalOdometerKm: state.totalOdometerKm + distanceDeltaKm,
      })),
    consumeFuel: (fuelConsumedL) =>
      set((state) => ({
        currentFuelL: Math.max(0, state.currentFuelL - fuelConsumedL),
      })),
    setGpsStatus: (isAvailable) => set({ isGpsAvailable: isAvailable }),
    addFuel: (liters) => {
      const tankCapacity = get().settings.tankCapacityL;
      set((state) => ({
        currentFuelL: Math.min(tankCapacity, state.currentFuelL + liters),
      }));
    },
    resetTrip: () => set({ tripKm: 0 }),
  },
});
