import { esES, enUS } from '@mui/x-data-grid/locales';
import { GridLocaleText } from '@mui/x-data-grid/models';

import { useCurrentLocale } from './client';

export const useI18nGrid = (): Partial<GridLocaleText> => {
  const currentLocale = useCurrentLocale();
  switch (currentLocale) {
    case 'es':
      return esES.components.MuiDataGrid.defaultProps.localeText;
    case 'en':
      return enUS.components.MuiDataGrid.defaultProps.localeText;
    default:
      return enUS.components.MuiDataGrid.defaultProps.localeText;
  }
};
