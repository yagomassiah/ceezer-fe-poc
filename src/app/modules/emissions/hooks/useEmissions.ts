import { useState } from 'react';
import { EmissionEntry } from '../types';
import { EmissionsCalculator } from '../api/emissionsCalculator';
import { EmissionsService } from '../services/emissionsService';

export interface UseEmissionsReturn {
  entries: EmissionEntry[];
  numberOfDays: number | '';
  currentEntry: Partial<EmissionEntry>;
  totalEmissions: number;
  emissionsByCategory: Record<string, number>;
  setNumberOfDays: (days: number | '') => void;
  addEntry: (entry: EmissionEntry) => void;
  removeEntry: (index: number) => void;
  updateCurrentEntry: (entry: Partial<EmissionEntry>) => void;
  isValidNumberOfDays: boolean;
}

export function useEmissions(): UseEmissionsReturn {
  const [entries, setEntries] = useState<EmissionEntry[]>([]);
  const [numberOfDays, setNumberOfDays] = useState<number | ''>(1);
  const [currentEntry, setCurrentEntry] = useState<Partial<EmissionEntry>>({});

  const isValidNumberOfDays = typeof numberOfDays === 'number' && numberOfDays > 0;

  const addEntry = (entry: EmissionEntry) => {
    if (EmissionsService.validateEntry(entry)) {
      setEntries([...entries, entry]);
      setCurrentEntry({});
    }
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateCurrentEntry = (entry: Partial<EmissionEntry>) => {
    setCurrentEntry(entry);
  };

  const totalEmissions = isValidNumberOfDays 
    ? EmissionsCalculator.calculateTotalEmissions(entries, numberOfDays as number)
    : 0;

  const emissionsByCategory = isValidNumberOfDays
    ? EmissionsCalculator.calculateEmissionsByCategory(entries, numberOfDays as number)
    : {};

  return {
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
  };
} 