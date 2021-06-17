import { render } from '@testing-library/react';

import Title, { HeaderTags } from '../title';

describe('<Title />', () => {
  describe('when default props', () => {
    it('should be rendered a h1 element', () => {
      const { getByText } = render(<Title>Test</Title>);
      expect(getByText('Test')).toBeDefined();
      expect(getByText('Test').tagName).toEqual('H1');
      expect(getByText('Test').classList).toContainEqual('text-6xl');
    });
  });

  describe('when tag is string props', () => {
    it('should be rendered correctly', () => {
      const { getByText } = render(<Title tag="h2">Test</Title>);
      expect(getByText('Test')).toBeDefined();
      expect(getByText('Test').tagName).toEqual('H2');
    });
  });

  describe('when tag is enum props', () => {
    it('should be rendered correctly', () => {
      const { getByText } = render(<Title tag={HeaderTags.H4}>Test</Title>);
      expect(getByText('Test')).toBeDefined();
      expect(getByText('Test').tagName).toEqual('H4');
    });
  });

  describe('when noStyles true', () => {
    it("margin classes shouldn't be present", () => {
      const { getByText } = render(<Title noStyled>Test</Title>);
      expect(getByText('Test')).toBeDefined();
      expect(getByText('Test').classList).not.toContain('mt-');
      expect(getByText('Test').classList).not.toContain('mb-');
    });
  });
});
