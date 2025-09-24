
import { StateCreator } from 'zustand';
import { AllSlices } from '../useBoundStore';
import { RefuelRecord, TripLog } from '../../types';
import { db } from '../../services/db';

export interface HistorySlice {
  actions: {
    addRefuelRecord: (record: Omit<RefuelRecord, 'id'>) => Promise<void>;
    deleteRefuelRecord: (id: number) => Promise<void>;
    addTripLog: (log: Omit<TripLog, 'id'>) => Promise<void>;
  };
}

export const createHistorySlice: StateCreator<
  AllSlices,
  [],
  [],
  HistorySlice
> = () => ({
  actions: {
    addRefuelRecord: async (record) => {
      await db.refuelRecords.add(record as RefuelRecord);
    },
    deleteRefuelRecord: async (id) => {
      await db.refuelRecords.delete(id);
    },
    addTripLog: async (log) => {
      await db.tripLogs.add(log as TripLog);
    },
  },
});
