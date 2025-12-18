import { RankType } from '../components/RankBadge';

export interface RunResult {
  pace: string;
  percentile: number;
  rank: RankType;
}

// Parse time input (formats: 20, 20:00, 1:20:00)
export function parseTime(timeInput: string): number | null {
  const trimmed = timeInput.trim();
  
  // Format: 20 (minutes only)
  if (/^\d+$/.test(trimmed)) {
    return parseInt(trimmed, 10);
  }
  
  // Format: 20:00 (MM:SS)
  if (/^\d+:\d{2}$/.test(trimmed)) {
    const [minutes, seconds] = trimmed.split(':').map(Number);
    return minutes + seconds / 60;
  }
  
  // Format: 1:20:00 (H:MM:SS)
  if (/^\d+:\d{2}:\d{2}$/.test(trimmed)) {
    const [hours, minutes, seconds] = trimmed.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
  }
  
  return null;
}

// Calculate pace in min/km
export function calculatePace(distanceKm: number, timeMinutes: number): string {
  const paceMinutes = timeMinutes / distanceKm;
  const minutes = Math.floor(paceMinutes);
  const seconds = Math.round((paceMinutes - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Calculate normalized score based on speed (km/h)
// Higher speed = higher score
export function calculateScore(distanceKm: number, timeMinutes: number): number {
  const speed = (distanceKm / timeMinutes) * 60; // km/h
  return speed;
}

// Determine rank based on pace and distance
// Using realistic running pace benchmarks
export function determineRank(distanceKm: number, timeMinutes: number): RankType {
  const paceMinPerKm = timeMinutes / distanceKm;
  
  // Pace thresholds (min/km) for different ranks
  // Based on realistic running performances
  if (paceMinPerKm <= 3.0) return 'Challenger';  // < 3:00/km (elite competitive)
  if (paceMinPerKm <= 3.5) return 'Grandmaster'; // 3:00-3:30/km (sub-elite)
  if (paceMinPerKm <= 4.0) return 'Master';      // 3:30-4:00/km (advanced)
  if (paceMinPerKm <= 4.5) return 'Diamond';     // 4:00-4:30/km (very good)
  if (paceMinPerKm <= 5.0) return 'Platinum';    // 4:30-5:00/km (good)
  if (paceMinPerKm <= 5.5) return 'Gold';        // 5:00-5:30/km (intermediate)
  if (paceMinPerKm <= 6.5) return 'Silver';      // 5:30-6:30/km (casual)
  if (paceMinPerKm <= 7.5) return 'Bronze';      // 6:30-7:30/km (beginner)
  return 'Iron';                                  // > 7:30/km (starting out)
}

// Calculate percentile based on pace
// Lower percentile = better performance (Top X%)
export function calculatePercentile(distanceKm: number, timeMinutes: number): number {
  const paceMinPerKm = timeMinutes / distanceKm;
  
  // Percentile mapping based on pace
  if (paceMinPerKm <= 3.0) return 1;   // Top 1%
  if (paceMinPerKm <= 3.5) return 3;   // Top 3%
  if (paceMinPerKm <= 4.0) return 5;   // Top 5%
  if (paceMinPerKm <= 4.5) return 10;  // Top 10%
  if (paceMinPerKm <= 5.0) return 20;  // Top 20%
  if (paceMinPerKm <= 5.5) return 35;  // Top 35%
  if (paceMinPerKm <= 6.5) return 50;  // Top 50%
  if (paceMinPerKm <= 7.5) return 70;  // Top 70%
  return 85;                            // Top 85%+
}

// Main calculation function
export function calculateRunResult(distanceKm: number, timeInput: string): RunResult | null {
  const timeMinutes = parseTime(timeInput);
  
  if (timeMinutes === null || timeMinutes <= 0) {
    return null;
  }
  
  const pace = calculatePace(distanceKm, timeMinutes);
  const rank = determineRank(distanceKm, timeMinutes);
  const percentile = calculatePercentile(distanceKm, timeMinutes);
  
  return {
    pace,
    rank,
    percentile
  };
}
