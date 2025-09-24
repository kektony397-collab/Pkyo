import React, { useState, useMemo, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../services/db';
import { formatDate, formatCurrency } from '../../../lib/formatters';
import { RefuelRecord } from '../../../types';

const ITEM_HEIGHT = 85; // Height of each row in pixels
const OVERSCAN = 5; // Number of items to render above and below the visible area
const LIST_HEIGHT = 400; // The fixed height of the list container

// The component for rendering a single row.
const Row = ({
  record,
  style,
}: {
  record: RefuelRecord;
  style: React.CSSProperties;
}) => {
  return (
    <div
      style={style}
      className="absolute left-0 right-0 flex flex-col items-start justify-center border-b border-gray-800 p-3"
    >
      <div className="flex w-full items-center justify-between">
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
      {record.notes && (
        <p className="mt-1 w-full truncate text-sm italic text-gray-500">
          Note: {record.notes}
        </p>
      )}
    </div>
  );
};

/**
 * Replaces react-window with a lightweight, custom virtualization solution
 * using the onScroll event. This provides good performance for moderately
 * long lists without adding a library dependency.
 */
function HistoryList() {
  const refuelRecords = useLiveQuery(
    () => db.refuelRecords.orderBy('timestamp').reverse().toArray(),
    [],
  );

  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  // Memoize calculations to determine which items are visible
  const { startIndex, visibleItems } = useMemo(() => {
    if (!refuelRecords) {
      return { startIndex: 0, visibleItems: [] };
    }

    const visibleCount = Math.ceil(LIST_HEIGHT / ITEM_HEIGHT);
    const currentStartIndex = Math.floor(scrollTop / ITEM_HEIGHT);

    const startIndex = Math.max(0, currentStartIndex - OVERSCAN);
    const endIndex = Math.min(
      refuelRecords.length,
      currentStartIndex + visibleCount + OVERSCAN,
    );

    return {
      startIndex,
      visibleItems: refuelRecords.slice(startIndex, endIndex),
    };
  }, [refuelRecords, scrollTop]);

  // Render loading or empty states
  if (!refuelRecords) {
    return <p className="p-4 text-center">Loading history...</p>;
  }

  if (refuelRecords.length === 0) {
    return (
      <p className="p-4 text-center">
        No refuel records yet. Add one to get started!
      </p>
    );
  }

  return (
    <div
      className="h-full w-full overflow-y-auto"
      style={{ height: LIST_HEIGHT }}
      onScroll={handleScroll}
    >
      {/* This div creates the scrollbar for the entire list height */}
      <div
        style={{
          height: refuelRecords.length * ITEM_HEIGHT,
          position: 'relative',
        }}
      >
        {/* Render only the items that should be visible */}
        {visibleItems.map((record, index) => {
          const actualIndex = startIndex + index;
          return (
            <Row
              key={record.id}
              record={record}
              style={{
                height: ITEM_HEIGHT,
                top: `${actualIndex * ITEM_HEIGHT}px`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HistoryList;
