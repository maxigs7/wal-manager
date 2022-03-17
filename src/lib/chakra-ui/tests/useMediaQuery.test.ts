jest.mock('@chakra-ui/react');

import { useMediaQuery as useChakraMediaQuery, useTheme } from '@chakra-ui/react';
import { renderHook } from '@testing-library/react-hooks';

import { useMediaQuery } from '../useMediaQuery';

const useThemeMocked = useTheme as jest.Mock;
const useChakraMediaQueryMocked = useChakraMediaQuery as jest.Mock;

useThemeMocked.mockReturnValue({
  breakpoints: {
    sm: '10px',
    md: '20px',
    lg: '30px',
    xl: '40px',
    '2xl': '50px',
  },
});

describe('useMediaQuery', () => {
  it('when xs is true all other values are false', () => {
    useChakraMediaQueryMocked.mockReturnValue([false, false, false, false, false]);
    const { result } = renderHook(useMediaQuery);

    expect(useThemeMocked).toHaveBeenCalled();
    expect(useChakraMediaQueryMocked).toHaveBeenCalled();
    expect(result.current.xs).toBeTruthy();
    expect(result.current.sm).toBeFalsy();
    expect(result.current.md).toBeFalsy();
    expect(result.current.lg).toBeFalsy();
    expect(result.current.xl).toBeFalsy();
    expect(result.current.xl2).toBeFalsy();
  });

  it('when sm is true all other values are false', () => {
    useChakraMediaQueryMocked.mockReturnValue([true, false, false, false, false]);
    const { result } = renderHook(useMediaQuery);

    expect(useThemeMocked).toHaveBeenCalled();
    expect(useChakraMediaQueryMocked).toHaveBeenCalled();
    expect(result.current.xs).toBeFalsy();
    expect(result.current.sm).toBeTruthy();
    expect(result.current.md).toBeFalsy();
    expect(result.current.lg).toBeFalsy();
    expect(result.current.xl).toBeFalsy();
    expect(result.current.xl2).toBeFalsy();
  });

  it('when md is true all other values are false', () => {
    useChakraMediaQueryMocked.mockReturnValue([true, true, false, false, false]);
    const { result } = renderHook(useMediaQuery);

    expect(useThemeMocked).toHaveBeenCalled();
    expect(useChakraMediaQueryMocked).toHaveBeenCalled();
    expect(result.current.xs).toBeFalsy();
    expect(result.current.sm).toBeFalsy();
    expect(result.current.md).toBeTruthy();
    expect(result.current.lg).toBeFalsy();
    expect(result.current.xl).toBeFalsy();
    expect(result.current.xl2).toBeFalsy();
  });

  it('when lg is true all other values are false', () => {
    useChakraMediaQueryMocked.mockReturnValue([true, true, true, false, false]);
    const { result } = renderHook(useMediaQuery);

    expect(useThemeMocked).toHaveBeenCalled();
    expect(useChakraMediaQueryMocked).toHaveBeenCalled();
    expect(result.current.xs).toBeFalsy();
    expect(result.current.sm).toBeFalsy();
    expect(result.current.md).toBeFalsy();
    expect(result.current.lg).toBeTruthy();
    expect(result.current.xl).toBeFalsy();
    expect(result.current.xl2).toBeFalsy();
  });

  it('when xl is true all other values are false', () => {
    useChakraMediaQueryMocked.mockReturnValue([true, true, true, true, false]);
    const { result } = renderHook(useMediaQuery);

    expect(useThemeMocked).toHaveBeenCalled();
    expect(useChakraMediaQueryMocked).toHaveBeenCalled();
    expect(result.current.xs).toBeFalsy();
    expect(result.current.sm).toBeFalsy();
    expect(result.current.md).toBeFalsy();
    expect(result.current.lg).toBeFalsy();
    expect(result.current.xl).toBeTruthy();
    expect(result.current.xl2).toBeFalsy();
  });

  it('when xl2 is true all other values are false', () => {
    useChakraMediaQueryMocked.mockReturnValue([true, true, true, true, true]);
    const { result } = renderHook(useMediaQuery);

    expect(useThemeMocked).toHaveBeenCalled();
    expect(useChakraMediaQueryMocked).toHaveBeenCalled();
    expect(result.current.xs).toBeFalsy();
    expect(result.current.sm).toBeFalsy();
    expect(result.current.md).toBeFalsy();
    expect(result.current.lg).toBeFalsy();
    expect(result.current.xl).toBeFalsy();
    expect(result.current.xl2).toBeTruthy();
  });
});
