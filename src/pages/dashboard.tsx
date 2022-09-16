import { HStack } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { getFullLayout, NextPageWithLayout } from '@layout';
import { CategoryPie } from '@m/dashboard';

ChartJS.register(ArcElement, Tooltip, Legend);
const DashboardPage: NextPageWithLayout = () => {
  return (
    <HStack p="10">
      <CategoryPie title="Gastos por categoria" type="expenses" />
      <CategoryPie title="Ingresos por categoria" type="incomes" />
    </HStack>
  );
};

DashboardPage.getLayout = getFullLayout;

export default DashboardPage;
