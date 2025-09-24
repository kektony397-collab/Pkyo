
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
        // Custom merge to ensure actions are preserved
        const typedPersistedState = persistedState as Partial<AllSlices>;
        return {
          ...currentState,
          ...typedPersistedState,
        };
      },
    },
  ),
);
