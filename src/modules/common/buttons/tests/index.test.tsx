import { render } from '@testing-library/react';

import Button from '../';
import { ButtonShapes } from '../types';

describe('<Button />', () => {
  describe('when default props', () => {
    it('should be rendered correctly', () => {
      const { getByText } = render(<Button>Button</Button>);
      const expected = getByText('Button') as HTMLButtonElement;
      const classList = [...expected.classList];
      expect(expected).toBeDefined();
      // Color
      expect(classList.some((c) => c.startsWith('bg-primary'))).toBeTruthy();
      // Disabled
      expect(expected.disabled).toBeFalsy();
      // Outlined
      expect(classList.some((c) => c.startsWith('border-primary'))).toBeFalsy();
      // Shape
      expect(classList.some((c) => c.startsWith('rounded'))).toBeTruthy();
      // Check default size
      expect(classList.some((c) => c.startsWith('text-sm') || c.startsWith('text-lg'))).toBeFalsy();
    });
  });

  describe('when disabled is true', () => {
    it('should be disabled', () => {
      const { getByText } = render(<Button disabled>Button</Button>);
      const expected = getByText('Button') as HTMLButtonElement;
      const classList = [...expected.classList];
      expect(expected).toBeDefined();
      expect(expected.disabled).toBeTruthy();
      expect(classList.some((c) => c.startsWith('cursor-not-allowed'))).toBeTruthy();
    });
  });

  describe('when outlined is true', () => {
    it('should have correct classes', () => {
      const { getByText } = render(<Button outlined>Button</Button>);
      const expected = getByText('Button');
      const classList = [...expected.classList];
      expect(expected).toBeDefined();
      expect(classList.some((c) => c.startsWith('border-primary'))).toBeTruthy();
    });
  });

  describe('when shape is used', () => {
    it('square shape should have correct classes', () => {
      const { getByText } = render(<Button shape={ButtonShapes.SQUARE}>Button</Button>);
      const expected = getByText('Button');
      const classList = [...expected.classList];
      expect(expected).toBeDefined();
      expect(classList.some((c) => c.startsWith('rounded'))).toBeFalsy();
    });

    it('circle shape should have correct classes', () => {
      const { getByText } = render(<Button shape={ButtonShapes.CIRCLE}>Button</Button>);
      const expected = getByText('Button');
      const classList = [...expected.classList];
      expect(expected).toBeDefined();
      expect(classList.some((c) => c.startsWith('p-'))).toBeTruthy();
      expect(classList.some((c) => c.startsWith('rounded-full'))).toBeTruthy();
    });
  });
});
