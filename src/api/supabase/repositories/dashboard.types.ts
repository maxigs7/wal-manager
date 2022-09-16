import { CategoryTotalItem } from '@models';

export interface IDashboardRepository {
  getTotalsByCategory(startDate: Date, endDate: Date): Promise<CategoryTotalItem[]>;
}
