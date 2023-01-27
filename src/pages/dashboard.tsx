import { SimpleGrid } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { getFullLayout, NextPageWithLayout } from '@layout';
import { CategoryPie } from '@m/dashboard';

ChartJS.register(ArcElement, Tooltip, Legend);
const DashboardPage: NextPageWithLayout = () => {
  return (
    <SimpleGrid columns={[1, 2]} gap="3" p="5">
      <CategoryPie title="Gastos por categoria" type="expenses" />
      <CategoryPie title="Ingresos por categoria" type="incomes" />
    </SimpleGrid>
  );
};

DashboardPage.getLayout = getFullLayout;

export default DashboardPage;
