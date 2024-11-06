// src/utils/colorUtils.ts

export function getTemperatureColor(temperature: number): string {
    if (temperature < 0) return '#0d47a1'; // Dark blue for below zero
    if (temperature >= 0 && temperature <= 10) return '#ffeb3b'; // Yellow for 0-10
    return '#e57373'; // Red for above 10
  }
  