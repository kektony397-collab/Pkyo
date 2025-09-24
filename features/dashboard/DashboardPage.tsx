
import useGpsProcessor from './hooks/useGpsProcessor';
import useFuelCalculator from './hooks/useFuelCalculator';
import { useBoundStore } from '../../store/useBoundStore';
import Speedometer from './components/Speedometer';
import FuelGauge from './components/FuelGauge';
import Odometer from './components/Odometer';
import GpsStatus from './components/GpsStatus';
import RangeEstimator from './components/RangeEstimator';

function DashboardPage() {
  useGpsProcessor();
  useFuelCalculator();

  const {
    currentSpeedKph,
    currentFuelL,
    tripKm,
    totalOdometerKm,
    isGpsAvailable,
  } = useBoundStore((state) => ({
    currentSpeedKph: state.currentSpeedKph,
    currentFuelL: state.currentFuelL,
    tripKm: state.tripKm,
    totalOdometerKm: state.totalOdometerKm,
    isGpsAvailable: state.isGpsAvailable,
  }));

  const tankCapacityL = useBoundStore((state) => state.settings.tankCapacityL);
  const fuelEconomyKmPerL = useBoundStore(
    (state) => state.settings.fuelEconomyKmPerL,
  );

  return (
    <div className="grid h-full grid-cols-1 grid-rows-3 gap-4 p-4 md:grid-cols-3 md:grid-rows-2">
      <div className="flex items-center justify-center md:col-span-2 md:row-span-2">
        <Speedometer speed={currentSpeedKph} />
      </div>
      <div className="flex items-center justify-center">
        <FuelGauge
          currentFuel={currentFuelL}
          tankCapacity={tankCapacityL}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Odometer label="Trip" distance={tripKm} />
        <Odometer label="Total" distance={totalOdometerKm} />
        <RangeEstimator
          currentFuel={currentFuelL}
          economy={fuelEconomyKmPerL}
        />
        <GpsStatus isAvailable={isGpsAvailable} />
      </div>
    </div>
  );
}

export default DashboardPage;
