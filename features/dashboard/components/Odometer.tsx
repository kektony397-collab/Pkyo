
import React from 'react';
import Card from '../../../components/Card';

interface OdometerProps {
  label: string;
  distance: number;
}

const Odometer = React.memo(({ label, distance }: OdometerProps) => {
  return (
    <Card>
      <div className="text-center">
        <p className="text-sm uppercase text-brand-secondary">{label}</p>
        <p className="font-mono text-3xl font-bold">
          {distance.toFixed(1)}
          <span className="text-lg"> km</span>
        </p>
      </div>
    </Card>
  );
});

export default Odometer;
