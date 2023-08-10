import { commonColors } from '@nextui-org/theme';

module.exports = {
  colors: {
    info: {
      ...commonColors.blue,
      foreground: commonColors.white,
      DEFAULT: commonColors.blue[500],
    },
    accent: commonColors.red,
  },
};
