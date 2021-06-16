import { render } from '@testing-library/react';

import Skeleton from '../';

describe('<Skeleton />', () => {
  describe('when default props', () => {
    it('should be rendered one line and gray', () => {
      const { getAllByTestId } = render(<Skeleton />);
      expect(getAllByTestId('skeleton')).toHaveLength(1);
      expect(getAllByTestId('skeleton')[0].classList).toContainEqual('bg-gray-200');
    });
  });

  describe('when 4 lines props and color class', () => {
    it('should be rendered 4 lines with color class', () => {
      const linesExpected = 4;
      const classExpected = 'red';
      const { getAllByTestId } = render(<Skeleton color={classExpected} lines={linesExpected} />);
      expect(getAllByTestId('skeleton')).toHaveLength(linesExpected);
      expect(getAllByTestId('skeleton')[0].classList).toContainEqual(classExpected);
    });
  });
});
