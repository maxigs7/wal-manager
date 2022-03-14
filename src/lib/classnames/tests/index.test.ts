import { classnames } from '../';

describe('classnames', () => {
  it('all true should return concatenated string correctly', () => {
    const classname = classnames(true && 'classname', 1 === 1 && 'classname2');
    expect(classname).toBe('classname classname2');
  });

  it('all false should return empty string', () => {
    const classname = classnames(false && 'classname', 1 > 2 && 'classname2');
    expect(classname).toBe('');
  });

  it('true and false should return string', () => {
    const classname = classnames(true && 'classname', 1 > 2 && 'classname2');
    expect(classname).toBe('classname');
  });
});
