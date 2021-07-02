import { library } from '@fortawesome/fontawesome-svg-core';

import { CategoryIcons, CategoryIconsName, CoreIcons } from './fas';

export const startFontAwesome = (): void => {
  library.add(...CoreIcons, ...CategoryIcons);
};

export { CategoryIconsName };
