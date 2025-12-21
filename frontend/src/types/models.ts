export interface Ingredient {
  id: number;
  userId?: number;
  name: string;
  details?: { price?: number; dryMatter?: number; days?: number };
  currentStock: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface GroupReport {
  animals: number;
  totalMilk: number;
  avgMilk: number;
  tmrFed: number;
  leftover: number;
  tmrIntake: number;
  perAnimalTmr: number;
}

export interface DailyFeedEfficiencyReport {
  date: string;
  totalHerdStrength: number;
  totalMilk: number;
  totalFeedCost: number;
  feedCostPerLiter: number;
  totalDryMatter: number;
  dmiPerLiter: number;
  groups: Record<string, GroupReport>;
}
interface CowMilkRow {
  date: string;
  milk: number;
}

interface CowWiseMilkReport {
  cowNo: string;
  from: string;
  to: string;
  rows: CowMilkRow[];
  avg7Day: number;
}
