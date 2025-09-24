import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../services/db';
import * as ReactWindow from 'react-window';
import { formatDate, formatCurrency } from '../../../lib/formatters';

// Defensively access FixedSizeList to handle different module export structures from the CDN.
const List = (ReactWindow as any).FixedSizeList || (ReactWindow as any).default?.FixedSizeList;

function HistoryList() {
  const refuelRecords = useLiveQuery(
    () => db.refuelRecords.orderBy('timestamp').reverse().toArray(),
    [],
  );

  if (!refuelRecords) {
    return <p>Loading history...</p>;
  }

  if (refuelRecords.length === 0) {
    return <p>No refuel records yet. Add one to get started!</p>;
  }

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const record = refuelRecords[index];
    return (
      <div style={style} className="flex items-center justify-between border-b border-gray-800 p-2">
        <div>
          <p className="font-bold">{formatDate(record.timestamp)}</p>
          <p className="text-sm text-gray-400">
            Odometer: {record.odometerKm.toFixed(0)} km
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-lg text-brand-primary">
            {record.liters.toFixed(2)} L
          </p>
          {record.totalCost && (
            <p className="text-sm text-gray-400">
              {formatCurrency(record.totalCost)}
            </p>
          )}
        </div>
      </div>
    );
  };

  if (!List) {
      return <p>Error: Could not load the list component from 'react-window'.</p>;
  }

  return (
    <div className='h-full w-full'>
      <List
        height={400}
        itemCount={refuelRecords.length}
        itemSize={60}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
}

export default HistoryList;
