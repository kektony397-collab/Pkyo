
import React from 'react';
import Card from '../../../components/Card';

interface RangeEstimatorProps {
  currentFuel: number;
  economy: number;
}

const RangeEstimator = React.memo(
  ({ currentFuel, economy }: RangeEstimatorProps) => {
    const range = currentFuel * economy;

    return (
      <Card>
        <div className="text-center">
          <p className="text-sm uppercase text-brand-secondary">Range</p>
          <p className="font-mono text-3xl font-bold">
            {range.toFixed(0)}
            <span className="text-lg"> km</span>
          </p>
        </div>
      </Card>
    );
  },
);

export default RangeEstimator;
