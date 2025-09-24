
import { StateCreator } from 'zustand';
import { AllSlices } from '../useBoundStore';
import { Settings } from '../../types';

export interface SettingsSlice {
  settings: Settings;
  actions: {
    setSettings: (newSettings: Partial<Settings>) => void;
    setFuelEconomy: (kmPerL: number) => void;
    setReserveLiters: (liters: number) => void;
  };
}

const defaultSettings: Settings = {
  bikeModel: 'CyberBike 2077',
  tankCapacityL: 15,
  fuelEconomyKmPerL: 25,
  reserveLiters: 3,
};

export const createSettingsSlice: StateCreator<
  AllSlices,
  [],
  [],
  SettingsSlice
> = (set) => ({
  settings: defaultSettings,
  actions: {
    setSettings: (newSettings) =>
      set((state) => ({
        settings: { ...state.settings, ...newSettings },
      })),
    setFuelEconomy: (kmPerL) =>
      set((state) => ({
        settings: { ...state.settings, fuelEconomyKmPerL: kmPerL },
      })),
    setReserveLiters: (liters) =>
      set((state) => ({
        settings: { ...state.settings, reserveLiters: liters },
      })),
  },
});
