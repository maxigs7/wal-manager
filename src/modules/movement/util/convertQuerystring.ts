import queryString from 'query-string';

export const convertQuerystring = (q: { accountId: string; month: string; year: string }) => {
  return queryString.stringify(q);
};
