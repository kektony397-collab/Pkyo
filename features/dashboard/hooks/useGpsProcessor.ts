
import { useEffect, useRef } from 'react';
import { KalmanFilter } from 'kalmanjs';
import { useBoundStore } from '../../../store/useBoundStore';
import useGeolocation from './useGeolocation';
import { haversineDistance } from '../../../lib/haversine';
import { GpsPosition } from '../../../types';

const useGpsProcessor = () => {
  const { position, isAvailable: isGpsHardwareAvailable } = useGeolocation();
  const { setGpsStatus, updatePosition } = useBoundStore(
    (state) => state.actions,
  );

  const kalmanFilter = useRef<KalmanFilter | null>(null);
  const lastPosition = useRef<GpsPosition | null>(null);

  useEffect(() => {
    setGpsStatus(isGpsHardwareAvailable && !!position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGpsHardwareAvailable, position]);

  useEffect(() => {
    if (!position) return;

    if (!kalmanFilter.current) {
      kalmanFilter.current = new KalmanFilter({ R: 0.01, Q: 3 });
    }

    const smoothedLat = kalmanFilter.current.filter(position.latitude);
    const smoothedLon = kalmanFilter.current.filter(position.longitude);

    const smoothedPosition: GpsPosition = {
      ...position,
      latitude: smoothedLat,
      longitude: smoothedLon,
    };

    let distanceDeltaKm = 0;
    if (lastPosition.current) {
      distanceDeltaKm = haversineDistance(
        {
          lat: lastPosition.current.latitude,
          lon: lastPosition.current.longitude,
        },
        {
          lat: smoothedPosition.latitude,
          lon: smoothedPosition.longitude,
        },
      );
    }
    
    const speedKph = (position.speed || 0) * 3.6;

    if(distanceDeltaKm < 0.5) { // prevent large jumps from GPS errors
      updatePosition(speedKph, distanceDeltaKm);
    }

    lastPosition.current = smoothedPosition;
  }, [position, updatePosition]);

  return null;
};

export default useGpsProcessor;
