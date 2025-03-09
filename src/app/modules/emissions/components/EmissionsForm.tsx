'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmissionCategory, EmissionEntry } from '../types';
import { EmissionsService } from '../services/emissionsService';
import { useEmissions } from '../hooks/useEmissions';

export function EmissionsForm() {
  const {
    entries,
    numberOfDays,
    currentEntry,
    totalEmissions,
    emissionsByCategory,
    setNumberOfDays,
    addEntry,
    removeEntry,
    updateCurrentEntry,
    isValidNumberOfDays,
  } = useEmissions();

  const handleAddEntry = () => {
    if (EmissionsService.validateEntry(currentEntry)) {
      addEntry(currentEntry as EmissionEntry);
    }
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setNumberOfDays('');
    } else {
      const numValue = parseInt(value);
      setNumberOfDays(numValue);
    }
  };

  const handleUsageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      updateCurrentEntry({ ...currentEntry, dailyUsage: undefined });
    } else {
      const numValue = parseFloat(value);
      updateCurrentEntry({ ...currentEntry, dailyUsage: numValue });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Carbon Footprint Calculator</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={currentEntry.category}
                onValueChange={(value: EmissionCategory) => 
                  updateCurrentEntry({ ...currentEntry, category: value, type: undefined })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="home_energy">Home Energy</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={currentEntry.type}
                onValueChange={(value) => updateCurrentEntry({ ...currentEntry, type: value as EmissionEntry['type'] })}
                disabled={!currentEntry.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {currentEntry.category && 
                    EmissionsService.getTypeOptions(currentEntry.category).map((type) => (
                      <SelectItem key={type} value={type}>
                        <div>
                          <div>{EmissionsService.formatTypeLabel(type)}</div>
                          <div className="text-xs text-muted-foreground">
                            {EmissionsService.getEmissionDescription(currentEntry.category!, type)}
                          </div>
                        </div>
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Average Daily Usage/Consumption
              ({currentEntry.category ? EmissionsService.getUnitLabel(currentEntry.category, currentEntry.type) : ''})
            </Label>
            <div className="flex gap-4">
              <Input
                type="number"
                step="0.1"
                placeholder="Enter amount"
                value={currentEntry.dailyUsage ?? ''}
                onChange={handleUsageChange}
              />
              <Button onClick={handleAddEntry} disabled={!EmissionsService.validateEntry(currentEntry)}>
                Add Entry
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Current Entries</h3>
          {entries.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg mb-2">
              <div>
                <span className="font-medium">
                  {EmissionsService.formatTypeLabel(entry.category)}: 
                </span>
                <span className="ml-2">
                  {EmissionsService.formatTypeLabel(entry.type)}
                </span>
                <span className="ml-2">
                  ({entry.dailyUsage} {EmissionsService.getUnitLabel(entry.category, entry.type)}/day)
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {EmissionsService.getEmissionDescription(entry.category, entry.type)}
                </span>
              </div>
              <Button variant="destructive" size="sm" onClick={() => removeEntry(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>Number of Days</Label>
            <div className="space-y-1">
              <Input
                type="number"
                value={numberOfDays}
                onChange={handleDaysChange}
                min={1}
                className={!isValidNumberOfDays ? 'border-red-500' : ''}
              />
              {!isValidNumberOfDays && (
                <p className="text-sm text-red-500">
                  Please enter a valid number of days (minimum 1)
                </p>
              )}
            </div>
          </div>

          {entries.length > 0 && isValidNumberOfDays && (
            <Card className="p-4 bg-primary/5">
              <h3 className="text-lg font-semibold mb-2">Emission Summary</h3>
              <p className="text-2xl font-bold">
                Total Carbon Footprint: {totalEmissions.toFixed(2)} kg CO₂e
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-muted-foreground">
                  Based on {entries.length} entries over {numberOfDays} days
                </p>
                <div className="space-y-1">
                  {Object.entries(emissionsByCategory).map(([category, amount]) => (
                    <p key={category} className="text-sm">
                      {EmissionsService.formatTypeLabel(category)}: {amount.toFixed(2)} kg CO₂e
                    </p>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
} 