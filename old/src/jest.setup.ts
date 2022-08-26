// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import dotenv from 'dotenv';

import { startFontAwesome } from '@lib/font-awesome';

import '@testing-library/jest-dom';

dotenv.config({ path: '.env.test' });

startFontAwesome();

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

window.scroll = jest.fn();
window.alert = jest.fn();
