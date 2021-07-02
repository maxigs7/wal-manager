import { TransitionClasses } from '@headlessui/react';

import classnames from '@lib/classnames';

const DurationMap = {
  75: 'duration-75',
  100: 'duration-100',
  150: 'duration-150',
  200: 'duration-200',
  300: 'duration-300',
  500: 'duration-500',
  700: 'duration-700',
  1000: 'duration-1000',
};

type DurationType = keyof typeof DurationMap;

export const fadeTransition = (duration: DurationType = 100): TransitionClasses => ({
  enter: classnames('transition-opacity', DurationMap[duration]),
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: classnames('transition-opacity', DurationMap[duration]),
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
});
