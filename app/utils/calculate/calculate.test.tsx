import calculate from './calculate';

describe('Calculate Utility calculates values correctly', () => {
  it('2 + 2 = 4', () => {
    const result = calculate('2 + 2');
    expect(result).toEqual(4);
  });
  it('2 + 2 * 4 = 10', () => {
    const result = calculate('2 + 2 * 4');
    expect(result).toEqual(10);
  });
  it('2 + 2 / 4 = 2.5', () => {
    const result = calculate('2 + 2 / 4');
    expect(result).toEqual(2.5);
  });
});
