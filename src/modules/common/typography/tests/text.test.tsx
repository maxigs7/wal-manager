import { render } from '@testing-library/react';

import Text, { TextTags } from '../text';

describe('<Text />', () => {
  describe('when default props', () => {
    it('should be rendered a p element', () => {
      const { getByText } = render(<Text>Test</Text>);
      expect(getByText('Test')).toBeDefined();
      expect(getByText('Test').tagName).toEqual('P');
      expect(getByText('Test').classList).toContainEqual('font-light');
    });
  });

  describe('when tag string props', () => {
    it('should be rendered correctly', () => {
      const { getByText } = render(<Text tag="span">Test</Text>);
      expect(getByText('Test')).toBeDefined();
      expect(getByText('Test').tagName).toEqual('SPAN');
    });
  });

  describe('when tag enum props', () => {
    it('should be rendered correctly', () => {
      const { getByText } = render(<Text tag={TextTags.STRONG}>Test</Text>);
      expect(getByText('Test')).toBeDefined();
      expect(getByText('Test').tagName).toEqual('STRONG');
    });
  });

  describe('when noStyles true', () => {
    it("margin classes shouldn't be present", () => {
      const { getByText } = render(<Text noStyled>Test</Text>);
      expect(getByText('Test')).toBeDefined();
      expect(getByText('Test').classList).not.toContain('mt-');
      expect(getByText('Test').classList).not.toContain('mb-');
    });
  });
});
