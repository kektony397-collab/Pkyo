
import React from 'react';
import Card from '../../../components/Card';

interface GpsStatusProps {
  isAvailable: boolean;
}

const GpsStatus = React.memo(({ isAvailable }: GpsStatusProps) => {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-sm uppercase text-brand-secondary">GPS</p>
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${
              isAvailable ? 'animate-pulse bg-brand-primary' : 'bg-brand-error'
            }`}
          ></span>
          <p className="font-mono text-xl">
            {isAvailable ? 'ACTIVE' : 'OFFLINE'}
          </p>
        </div>
      </div>
    </Card>
  );
});

export default GpsStatus;
