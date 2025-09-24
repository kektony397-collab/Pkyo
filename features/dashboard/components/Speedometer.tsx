
import React from 'react';

interface SpeedometerProps {
  speed: number;
}

const Speedometer = React.memo(({ speed }: SpeedometerProps) => {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-brand-primary bg-black/50 shadow-neon-primary md:h-96 md:w-96">
      <div className="text-center">
        <span className="font-mono text-7xl font-bold text-brand-light md:text-9xl">
          {Math.round(speed)}
        </span>
        <span className="block text-xl text-brand-primary md:text-2xl">
          km/h
        </span>
      </div>
    </div>
  );
});

export default Speedometer;
