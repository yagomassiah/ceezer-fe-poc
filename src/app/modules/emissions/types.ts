export type TransportationType = 'plane' | 'gasoline_car' | 'electric_car' | 'train' | 'biking' | 'walking';
export type HomeEnergyType = 'electricity' | 'natural_gas' | 'heating_oil' | 'solar_energy';
export type FoodType = 'chicken' | 'rice' | 'fruits' | 'beef' | 'pork' | 'vegetables';

export type EmissionCategory = 'transportation' | 'home_energy' | 'food';

export interface EmissionEntry {
  category: EmissionCategory;
  type: TransportationType | HomeEnergyType | FoodType;
  dailyUsage: number; // Amount per day (e.g., km for transport, kWh/m³/L for energy, kg for food)
}

export interface EmissionSummary {
  entries: EmissionEntry[];
  numberOfDays: number;
  totalCarbonFootprint: number; // in kg CO2e
}

// Unit types for different categories
export const UNIT_TYPES = {
  home_energy: {
    electricity: 'kWh',
    natural_gas: 'm³',
    heating_oil: 'L',
    solar_energy: 'kWh',
  },
} as const;

// Emission factors (kg CO2e per unit)
export const EMISSION_FACTORS = {
  transportation: {
    plane: 0.1, // per passenger km
    gasoline_car: 0.21, // per km
    electric_car: 0.075, // per km
    train: 0.04, // per km
    biking: 0.0, // per km
    walking: 0.0, // per km
  },
  home_energy: {
    electricity: 0.4, // per kWh (using average of 0.3-0.5)
    natural_gas: 2.2, // per m³
    heating_oil: 2.5, // per L
    solar_energy: 0.0, // per kWh
  },
  food: {
    chicken: 6.9, // per kg
    rice: 2.7, // per kg
    fruits: 0.9, // per kg
    beef: 27, // per kg
    pork: 7.2, // per kg
    vegetables: 1, // per kg
  },
} as const; 