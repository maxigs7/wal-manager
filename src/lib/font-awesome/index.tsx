import { library } from '@fortawesome/fontawesome-svg-core';

import { CategoryIcons, CoreIcons } from './fas';

export const startFontAwesome = (): void => {
  library.add(...CoreIcons, ...CategoryIcons);
};
