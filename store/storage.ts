
import { StateStorage } from 'zustand/middleware';
import { db } from '../services/db';

export const dexieStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const item = await db.zustandState.get(name);
    return item ? JSON.stringify(item.state) : null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await db.zustandState.put({
      name,
      state: JSON.parse(value),
    });
  },
  removeItem: async (name: string): Promise<void> => {
    await db.zustandState.delete(name);
  },
};
