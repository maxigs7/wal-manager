/********************************************
 * HEADERS
 ********************************************/
const HeaderTagsMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

export type HeaderTags = typeof HeaderTagsMap;
export type HeaderTagsType = keyof typeof HeaderTagsMap;

export const HeaderSizeMap: HeaderTags = {
  h1: 'text-6xl',
  h2: 'text-5xl',
  h3: 'text-4xl',
  h4: 'text-3xl',
  h5: 'text-2xl',
  h6: 'text-1xl',
};

/********************************************
 * TEXT
 ********************************************/
const TextTagsMap = {
  p: 'p',
  span: 'span',
  strong: 'strong',
};

export type TextTags = typeof TextTagsMap;
export type TextTagsType = keyof typeof TextTagsMap;

export const TextWeightMap: TextTags = {
  p: 'font-light',
  span: 'font-light',
  strong: 'font-bold',
};
