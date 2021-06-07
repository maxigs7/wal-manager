import React from 'react';

import { CardContainer, Switch } from '@app/components/ui';
import CategoriesListContainer from '@app/containers/categories/list';

const CategoriesPage: React.FC = () => {
  // Subscribe to Firestore document
  console.log('CategoriesPage rendering...');

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<MyColumn>({
  //   columns,
  //   data,
  // });

  return (
    <>
      <h1>Categories</h1>
      <p>Categories list here</p>
      <CardContainer>
        <Switch />
        <CategoriesListContainer />
      </CardContainer>
    </>
  );
};

export default CategoriesPage;
