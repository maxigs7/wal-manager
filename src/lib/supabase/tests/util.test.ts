import { getTableName } from '../util';

describe('getTableName', () => {
  it('correct name should return collection name', () => {
    const tableName = getTableName('ACCOUNT');
    expect(tableName).toBe('account');
  });

  it('wrong name should throw an error', () => {
    expect(() => getTableName('ACCOUNTS')).toThrow('WRONG KEY');
  });
});
