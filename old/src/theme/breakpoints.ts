import { createBreakpoints } from '@chakra-ui/theme-tools';

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: '321px',
  md: '769px',
  lg: '961px',
  xl: '1201px',
  '2xl': '1537px',
});

export default breakpoints;
