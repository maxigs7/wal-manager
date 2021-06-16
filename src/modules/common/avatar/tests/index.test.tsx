import { fireEvent, render, waitFor } from '@testing-library/react';

import Avatar, { AvatarSizes } from '../';

describe('<Avatar />', () => {
  describe('when default props', () => {
    it('should be rendered correctly', () => {
      const { getByAltText } = render(<Avatar alt="profile" src="mock-src.jpg" />);
      const expected = getByAltText('profile');
      expect(expected.classList).toContain('w-12');
      expect(expected).toHaveAttribute('src', 'mock-src.jpg');
    });
  });

  describe('when size with SM enum value', () => {
    it('should be rendered correctly with w-8 class', () => {
      const { getByAltText } = render(
        <Avatar alt="profile" size={AvatarSizes.SM} src="mock-src.jpg" />,
      );
      const expected = getByAltText('profile');
      expect(expected.classList).toContain('w-8');
    });
  });

  describe('when size with SM string value', () => {
    it('should rendered correctly with w-8 class', () => {
      const { getByAltText } = render(<Avatar alt="profile" size="sm" src="mock-src.jpg" />);
      const expected = getByAltText('profile');
      expect(expected.classList).toContain('w-8');
    });
  });

  describe('when onError', () => {
    it('should rendered with default profile image', async () => {
      const { getByAltText } = render(<Avatar alt="profile" size="sm" src="mock-src.jpg" />);
      const expected = getByAltText('profile');

      // simulate error event on element
      fireEvent.error(expected, {
        target: expected,
      });

      await waitFor(() => {
        expect(expected).toHaveAttribute('src', 'default-profile.png');
      });
    });
  });
});
