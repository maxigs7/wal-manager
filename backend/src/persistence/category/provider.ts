import { Provider } from '@nestjs/common';
import { CategoryRepository } from './repository';

export const CategoryRepoProvider: Provider = {
  provide: 'CategoryRepo',
  useClass: CategoryRepository,
};
