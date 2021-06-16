import { render, screen } from '@testing-library/react';

import EmptyMessage from '../';
// icon = 'inbox',
//   iconSize = '5x',
//   children,
//   className,
//   ...props
describe('<EmptyMessage />', () => {
  describe('when default props', () => {
    it('should be rendered correctly', () => {
      const { getByText } = render(
        <EmptyMessage>
          <p>Message</p>
        </EmptyMessage>,
      );
      const expected = getByText('Message');
      expect(expected).toBeDefined();
    });

    it('default icon should be present', () => {
      const { container } = render(<EmptyMessage />);
      expect(container.querySelector('svg')).toBeDefined();
      expect(container.querySelector('svg').classList).toContain('fa-inbox');
    });
  });
});
