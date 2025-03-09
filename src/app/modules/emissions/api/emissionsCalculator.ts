import { EmissionEntry, EMISSION_FACTORS } from '../types';

export class EmissionsCalculator {
  /**
   * Calculates the total carbon footprint for a set of emission entries over a period
   */
  static calculateTotalEmissions(entries: EmissionEntry[], numberOfDays: number): number {
    return entries.reduce((total, entry) => {
      const factor = EMISSION_FACTORS[entry.category][entry.type as keyof typeof EMISSION_FACTORS[typeof entry.category]];
      return total + (entry.dailyUsage * factor * numberOfDays);
    }, 0);
  }

  /**
   * Calculates emissions by category
   */
  static calculateEmissionsByCategory(entries: EmissionEntry[], numberOfDays: number) {
    return entries.reduce((acc, entry) => {
      const factor = EMISSION_FACTORS[entry.category][entry.type as keyof typeof EMISSION_FACTORS[typeof entry.category]];
      const emissions = entry.dailyUsage * factor * numberOfDays;
      
      return {
        ...acc,
        [entry.category]: (acc[entry.category] || 0) + emissions
      };
    }, {} as Record<string, number>);
  }

  /**
   * Get emission factor for a specific entry
   */
  static getEmissionFactor(entry: EmissionEntry): number {
    return EMISSION_FACTORS[entry.category][entry.type as keyof typeof EMISSION_FACTORS[typeof entry.category]];
  }
} 