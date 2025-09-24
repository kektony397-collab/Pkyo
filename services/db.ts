import Dexie, { type Table } from 'dexie';
import { Settings, RefuelRecord, TripLog } from '../types';

interface ZustandState {
  name: string;
  state: unknown;
}

export class SmartBikeDB extends Dexie {
  settings!: Table<Settings, number>;
  refuelRecords!: Table<RefuelRecord, number>;
  tripLogs!: Table<TripLog, number>;
  zustandState!: Table<ZustandState, string>;

  constructor() {
    super('SmartBikeDB');
    this.version(1).stores({
      // FIX: Removed invalid 'key' index from settings schema as 'key' property does not exist on Settings type.
      settings: '++id',
      refuelRecords: '++id, timestamp',
      tripLogs: '++id, startTimestamp',
      zustandState: 'name', // Primary key is the store name
    });
  }
}

export const db = new SmartBikeDB();