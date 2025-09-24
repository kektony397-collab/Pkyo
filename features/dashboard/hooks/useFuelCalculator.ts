
import { useEffect, useRef } from 'react';
import { useBoundStore } from '../../../store/useBoundStore';

const useFuelCalculator = () => {
  const tripKm = useBoundStore((state) => state.tripKm);
  const fuelEconomyKmPerL = useBoundStore(
    (state) => state.settings.fuelEconomyKmPerL,
  );
  const { consumeFuel } = useBoundStore((state) => state.actions);

  const lastTripKm = useRef(tripKm);

  useEffect(() => {
    const distanceDelta = tripKm - lastTripKm.current;

    if (distanceDelta > 0 && fuelEconomyKmPerL > 0) {
      const fuelConsumed = distanceDelta / fuelEconomyKmPerL;
      consumeFuel(fuelConsumed);
    }

    lastTripKm.current = tripKm;
  }, [tripKm, fuelEconomyKmPerL, consumeFuel]);

  return null;
};

export default useFuelCalculator;
