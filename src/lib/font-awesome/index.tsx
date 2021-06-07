import { library } from '@fortawesome/fontawesome-svg-core';

import * as FasIcons from './fas';

export const startFontAwesome = (): void => {
  library.add(FasIcons);
};
