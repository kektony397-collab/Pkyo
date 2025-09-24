
import { useState } from 'react';
import { useBoundStore } from '../../store/useBoundStore';
import Card from '../../components/Card';
import Button from '../../components/Button';
import HistoryList from './components/HistoryList';

function RefuelHistoryPage() {
  const { addRefuelRecord } = useBoundStore((state) => state.actions);
  const totalOdometerKm = useBoundStore((state) => state.totalOdometerKm);

  const [liters, setLiters] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const handleAddRecord = async () => {
    const litersNum = parseFloat(liters);
    const totalCostNum = totalCost ? parseFloat(totalCost) : undefined;

    if (isNaN(litersNum) || litersNum <= 0) {
      alert('Please enter a valid number of liters.');
      return;
    }

    await addRefuelRecord({
      timestamp: Date.now(),
      liters: litersNum,
      totalCost: totalCostNum,
      odometerKm: totalOdometerKm,
    });

    setLiters('');
    setTotalCost('');
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-center text-4xl font-bold text-brand-primary">
        Refuel History
      </h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="flex-col items-start">
            <h2 className="mb-4 text-xl text-brand-secondary">Add New Record</h2>
            <form
              className="w-full space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddRecord();
              }}
            >
              <div>
                <label htmlFor="liters" className="block text-sm">
                  Liters
                </label>
                <input
                  id="liters"
                  type="number"
                  value={liters}
                  onChange={(e) => setLiters(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-600 bg-brand-dark/50 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label htmlFor="totalCost" className="block text-sm">
                  Total Cost (Optional)
                </label>
                <input
                  id="totalCost"
                  type="number"
                  value={totalCost}
                  onChange={(e) => setTotalCost(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-600 bg-brand-dark/50 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
                  step="0.01"
                />
              </div>
              <Button type="submit" className="w-full">
                Add Record
              </Button>
            </form>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <HistoryList />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RefuelHistoryPage;
