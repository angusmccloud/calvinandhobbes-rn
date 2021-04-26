import initialsFromString from './initialsFromString';

describe('initialsFromString Utility calculates correctly', () => {
  it('Connor Tyrrell becomes CT', () => {
    const result = initialsFromString('Connor Tyrrell');
    expect(result).toEqual('CT');
  });
  it('Connor John Tyrrell becomes CJT', () => {
    const result = initialsFromString('Connor John Tyrrell');
    expect(result).toEqual('CJT');
  });
  it('Empty input string returns an empty output string', () => {
    const result = initialsFromString('');
    expect(result).toEqual('');
  });
});
