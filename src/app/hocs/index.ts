import compose from 'compose-function';

import { withChakra } from './with-chakra';

export const withProviders = compose(withChakra);
