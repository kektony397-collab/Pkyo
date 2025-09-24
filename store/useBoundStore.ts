
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  createBikeStateSlice,
  type BikeStateSlice,
} from './slices/bikeStateSlice';
import {
  createSettingsSlice,
  type SettingsSlice,
} from './slices/settingsSlice';
import { createHistorySlice, type HistorySlice } from './slices/historySlice';
import { dexieStorage } from './storage';

export type AllSlices = BikeStateSlice & SettingsSlice & HistorySlice;

export const useBoundStore = create<AllSlices>()(
  persist(
    (...a) => ({
      ...createBikeStateSlice(...a),
      ...createSettingsSlice(...a),
      ...createHistorySlice(...a),
    }),
    {
      name: 'smart-bike-store',
      storage: dexieStorage,
      partialize: (state) => ({
        settings: state.settings,
        totalOdometerKm: state.totalOdometerKm,
        currentFuelL: state.currentFuelL,
      }),
      merge: (persistedState, currentState) => {
        const typedPersistedState = persistedState as Partial<AllSlices>;

        // Perform a deep merge for the 'settings' object to ensure default
        // values are preserved when loading a partial or older state. This
        // prevents a common crash where `settings` becomes undefined.
        const mergedSettings = {
          ...currentState.settings,
          ...(typedPersistedState?.settings || {}),
        };

        return {
          ...currentState,
          ...typedPersistedState,
          settings: mergedSettings,
        };
      },
    },
  ),
);
