import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400'],
});

const fonts = {
  heading: openSans.style.fontFamily,
  body: openSans.style.fontFamily,
};

export default fonts;
