/* eslint-disable no-constant-condition */
import React from 'react';

import { CategoriesWrapper } from './wrapper';

// import classnames from '@lib/classnames';

const styles = {
  wrapper: 'p-5',
};

export const CategoriesEmpty: React.FC = React.memo(() => (
  <CategoriesWrapper className={styles.wrapper}>
    <p>Empty</p>
  </CategoriesWrapper>
));
