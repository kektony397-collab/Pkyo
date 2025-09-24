
import React from 'react';

interface FuelGaugeProps {
  currentFuel: number;
  tankCapacity: number;
}

const FuelGauge = React.memo(
  ({ currentFuel, tankCapacity }: FuelGaugeProps) => {
    const percentage =
      tankCapacity > 0 ? (currentFuel / tankCapacity) * 100 : 0;
    const strokeDashoffset = 283 - (283 * Math.min(100, Math.max(0, percentage))) / 100;

    return (
      <div className="relative flex h-48 w-48 flex-col items-center justify-center">
        <svg className="absolute h-full w-full" viewBox="0 0 100 100">
          <circle
            className="stroke-current text-gray-700"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
          ></circle>
          <circle
            className="stroke-current text-brand-primary transition-all duration-500 ease-in-out"
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          ></circle>
        </svg>
        <div className="text-center">
          <span className="font-mono text-4xl font-bold">
            {currentFuel.toFixed(1)}
          </span>
          <span className="block text-lg text-brand-secondary">Liters</span>
        </div>
      </div>
    );
  },
);

export default FuelGauge;
