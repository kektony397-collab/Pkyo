import React, { useState } from 'react';
import { useBoundStore } from '../../store/useBoundStore';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Switch } from '@headlessui/react';

// FIX: Changed interface to a type alias to fix issue with props not being inherited from React.InputHTMLAttributes.
type SettingInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const SettingInput = ({ label, ...props }: SettingInputProps) => (
  <div>
    <label
      htmlFor={props.name}
      className="block text-sm font-medium text-brand-secondary"
    >
      {label}
    </label>
    <div className="mt-1">
      <input
        {...props}
        className="block w-full rounded-md border-gray-600 bg-brand-dark/50 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
      />
    </div>
  </div>
);

function SettingsPage() {
  const settings = useBoundStore((state) => state.settings);
  const { setSettings } = useBoundStore((state) => state.actions);
  const [localSettings, setLocalSettings] = useState(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setLocalSettings((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    setSettings(localSettings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-center text-4xl font-bold text-brand-primary">
        Settings
      </h1>
      <Card>
        <form
          className="w-full space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <SettingInput
            label="Bike Model"
            name="bikeModel"
            value={localSettings.bikeModel}
            onChange={handleChange}
          />
          <SettingInput
            label="Tank Capacity (Liters)"
            name="tankCapacityL"
            type="number"
            value={localSettings.tankCapacityL}
            onChange={handleChange}
            step={0.1}
            min={1}
          />
          <SettingInput
            label="Fuel Economy (km/L)"
            name="fuelEconomyKmPerL"
            type="number"
            value={localSettings.fuelEconomyKmPerL}
            onChange={handleChange}
            step={0.1}
            min={1}
          />
          <SettingInput
            label="Reserve Fuel (Liters)"
            name="reserveLiters"
            type="number"
            value={localSettings.reserveLiters}
            onChange={handleChange}
            step={0.1}
            min={0}
          />

          <div className="flex items-center justify-between">
            <span className="text-brand-light">Enable Eco Mode Tips</span>
            <Switch
              checked={false} // Placeholder
              onChange={() => {}}
              className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent bg-gray-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-dark"
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
              />
            </Switch>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSaved}>
              {isSaved ? 'Saved!' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SettingsPage;