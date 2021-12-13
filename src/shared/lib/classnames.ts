const classnames = (...classes: (false | null | undefined | string)[]): string =>
  classes.filter(Boolean).join(' ');

export default classnames;

export { classnames };
