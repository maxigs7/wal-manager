import { SupabaseClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

import { cleanFromServer } from '@lib';
import { CategoryTotalItem } from '@models';

import { IDashboardRepository } from './dashboard.types';

export class DashboardRepository implements IDashboardRepository {
  constructor(private supabase: SupabaseClient) {}

  getTotalsByCategory = async (startDate: Date, endDate: Date): Promise<CategoryTotalItem[]> => {
    const { data, error } = await this.supabase.rpc('get_totals_by_category', {
      startDate: format(startDate, 'yyyy-MM-dd') + 'T00:00:00.000Z',
      endDate: format(endDate, 'yyyy-MM-dd') + 'T23:59:59.999Z',
    });
    if (error) {
      throw new Error(JSON.stringify(error));
    }
    if (!data) return [];

    return cleanFromServer(data);
  };
}
