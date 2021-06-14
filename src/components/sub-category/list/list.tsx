import React from 'react';

import { SubCategory } from '@app/api/categories';

import { SubCategoriesWrapper } from './wrapper';

interface Props {
  subCategories: SubCategory[];
}

export const SubCategoriesList: React.FC<Props> = React.memo(() => {
  console.log('SubCategoriesList component rendering...');
  return <SubCategoriesWrapper>Sub Categories here</SubCategoriesWrapper>;
});
