import { fireEvent, render, waitFor } from '@testing-library/react';

import ImageWithFallback from '../';

describe('<ImageWithFallback />', () => {
  const alt = 'img-alt';
  const fallbackSrc = '/fallback-img.png';
  const src = '/mock-img.png';

  describe('when no error', () => {
    it('image should be rendered from src prop', () => {
      const { getByAltText } = render(
        <ImageWithFallback alt={alt} fallbackSrc={fallbackSrc} src={src} />,
      );
      const expected = getByAltText(alt);
      expect(expected).toHaveAttribute('src', src);
    });
  });

  describe('when error', () => {
    it('image should be rendered from fallbackSrc prop', async () => {
      const { getByAltText } = render(
        <ImageWithFallback alt={alt} fallbackSrc={fallbackSrc} src={src} />,
      );
      const expected = getByAltText(alt);

      // simulate error event on element
      fireEvent.error(expected, {
        target: expected,
      });

      await waitFor(() => {
        expect(expected).toHaveAttribute('src', fallbackSrc);
      });
    });
  });
});
