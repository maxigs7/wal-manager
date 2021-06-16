import { render } from '@testing-library/react';

import CardContainer from '../';

describe('<CardContainer />', () => {
  describe('when default props', () => {
    it('should be rendered correctly', () => {
      const { getByText } = render(
        <CardContainer>
          <p>Test</p>
        </CardContainer>,
      );
      const expected = getByText('Test');
      expect(expected).toBeDefined();
    });
  });
});
