import { Box, Heading, useTheme } from '@chakra-ui/react';
import { addMonths } from 'date-fns';
import { useCallback, useMemo, useRef, useState } from 'react';
import { getDatasetAtEvent, getElementAtEvent, getElementsAtEvent, Pie } from 'react-chartjs-2';

import { TransactionType } from '@models';

import { IExpenseDataset, useDatasetByType } from './useDatasetByType';

interface IProps {
  title: string;
  type: TransactionType;
}

const INACTIVE_INDEX = -1;
const CategoryPie: React.FC<IProps> = ({ title, type }) => {
  const chartRef = useRef(null);
  const [active, setActive] = useState(-1);
  const startDate = useMemo(() => addMonths(new Date(), INACTIVE_INDEX), []);
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
              return `${data.label}: ${data.amount}`;
            },
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
      datasets: [
        {
          id: 'parent',
          label: 'parents',
          data: parents,
          backgroundColor: parents.map((t) => t.color),
        },
        ...parents.reduce((subset: any[], parent: IExpenseDataset) => {
          if (!parent.children || !parent.children.length) return subset;
          return [
            ...subset,
            {
              id: parent.id,
              label: parent.label,
              data: parent.children,
              backgroundColor: parent.children.map((t) => t.color),
              hidden: active >= 0 ? parents[active!].id !== parent.id : true,
            },
          ];
        }, []),
      ],
    };
  }, [active, parents]);

  const onClickHandler = useCallback(
    (event: any) => {
      if (!chartRef.current) return;

      const [dataset] = getElementAtEvent(chartRef.current, event);
      console.log(dataset);
      if (dataset.datasetIndex > 0 || active === dataset.index) {
        setActive(INACTIVE_INDEX);
      } else {
        setActive(dataset.index);
      }
    },
    [active],
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
