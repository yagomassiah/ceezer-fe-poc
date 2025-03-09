import { EmissionEntry, EmissionCategory, EMISSION_FACTORS, UNIT_TYPES } from '../types';

export class EmissionsService {
  /**
   * Get available types for a given category
   */
  static getTypeOptions(category: EmissionCategory): EmissionEntry['type'][] {
    switch (category) {
      case 'transportation':
        return Object.keys(EMISSION_FACTORS.transportation) as EmissionEntry['type'][];
      case 'home_energy':
        return Object.keys(EMISSION_FACTORS.home_energy) as EmissionEntry['type'][];
      case 'food':
        return Object.keys(EMISSION_FACTORS.food) as EmissionEntry['type'][];
      default:
        return [];
    }
  }

  /**
   * Get the unit label for a given category and type
   */
  static getUnitLabel(category: EmissionCategory, type?: string): string {
    if (category === 'home_energy' && type) {
      return UNIT_TYPES.home_energy[type as keyof typeof UNIT_TYPES.home_energy];
    }

    switch (category) {
      case 'transportation':
        return 'km';
      case 'home_energy':
        return 'unit'; // fallback if no type specified
      case 'food':
        return 'kg';
      default:
        return '';
    }
  }

  /**
   * Format type display name
   */
  static formatTypeLabel(type: string): string {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Get description for any emission type
   */
  static getEmissionDescription(category: EmissionCategory, type: string): string {
    const factor = EMISSION_FACTORS[category][type as keyof typeof EMISSION_FACTORS[typeof category]];
    const unit = this.getUnitLabel(category, type);
    return `${factor} kg CO₂e/${unit}`;
  }

  /**
   * Validate an emission entry
   */
  static validateEntry(entry: Partial<EmissionEntry>): boolean {
    return !!(
      entry.category && 
      entry.type && 
      typeof entry.dailyUsage === 'number' && 
      !isNaN(entry.dailyUsage) && 
      entry.dailyUsage > 0
    );
  }
} 