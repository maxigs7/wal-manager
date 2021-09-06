import { render } from '@testing-library/react';

import EmptyMessage from '../';

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
      expect(container.querySelector('svg').classList).toContain('fa-5x');
    });
  });

  describe('when icon props', () => {
    it('should be rendered with correct icon and size', () => {
      const { container } = render(<EmptyMessage icon="tags" iconSize="2x" />);
      expect(container.querySelector('svg')).toBeDefined();
      expect(container.querySelector('svg').classList).toContain('fa-tags');
      expect(container.querySelector('svg').classList).toContain('fa-2x');
    });
  });
});
