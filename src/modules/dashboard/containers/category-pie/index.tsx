import { Box, Heading } from '@chakra-ui/react';
import { addMonths } from 'date-fns';
import { useCallback, useMemo, useRef, useState } from 'react';
import { getElementAtEvent, Pie } from 'react-chartjs-2';

import { formatToCurrency } from '@lib';
import { TransactionType } from '@models';

import { ICategoryDataset, OTHERS_CATEGORY_ID, PARENTS_CATEGORY_ID } from './types';
import { useDatasetByType } from './useDatasetByType';
import { buildPieDataset } from './util';

interface IProps {
  title: string;
  type: TransactionType;
}

const CategoryPie: React.FC<IProps> = ({ title, type }) => {
  const chartRef = useRef(null);
  const [active, setActive] = useState<string[]>([]);
  const startDate = useMemo(() => addMonths(new Date(), -1), []);
  const endDate = useMemo(() => new Date(), []);
  const options = useMemo(
    () => ({
      parsing: {
        key: 'amount',
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const data = context.dataset.data[context.dataIndex];
              return `${data.label}: ${formatToCurrency(data.amount)}`;
            },
          },
        },
        legend: {
          maxHeight: 60,
          labels: {
            usePointStyle: true,
          },
        },
      },
    }),
    [],
  );
  const { data: parents, isLoading } = useDatasetByType(type, startDate, endDate);

  const pieData = useMemo(() => {
    return {
      labels: [...parents.map((p) => p.label)],
      datasets: buildPieDataset(parents, active),
    };
  }, [active, parents]);

  const onClickHandler = useCallback(
    (event: any) => {
      if (!chartRef.current) return;

      const [datasetEvt] = getElementAtEvent(chartRef.current, event);
      if (!datasetEvt) {
        setActive([]);
      } else {
        const datasetData = pieData.datasets[datasetEvt.datasetIndex];
        const category = datasetData.data[datasetEvt.index];
        if (
          datasetData.id !== PARENTS_CATEGORY_ID &&
          datasetData.id !== OTHERS_CATEGORY_ID &&
          (active.includes(datasetData.id) || active.includes(category.id))
        ) {
          setActive([]);
        } else if (datasetData.id !== OTHERS_CATEGORY_ID) {
          setActive([category.id]);
        } else {
          setActive((state) => [state[0], category.id]);
        }
      }
    },
    [active, pieData.datasets],
  );

  return (
    <Box bg="white" p="2">
      <Heading as="h2" fontSize="md">
        {title}
      </Heading>
      <Pie data={pieData} onClick={(evt) => onClickHandler(evt)} options={options} ref={chartRef} />
    </Box>
  );
};

export { CategoryPie };
