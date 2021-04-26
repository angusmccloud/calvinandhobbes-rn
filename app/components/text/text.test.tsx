import React from 'react';
import renderer from 'react-test-renderer';
import Text from './text';

describe('Text Component rendered correctly', () => {
  it('XXS Text Size', () => {
    const text = renderer.create(<Text size="XXS">XXS Text</Text>);
    expect(text).toMatchSnapshot();
  });
  it('XS Text Size', () => {
    const text = renderer.create(<Text size="XS">XS Text</Text>);
    expect(text).toMatchSnapshot();
  });
  it('S Text Size', () => {
    const text = renderer.create(<Text size="S">S Text</Text>);
    expect(text).toMatchSnapshot();
  });
  it('M Text Size', () => {
    const text = renderer.create(<Text size="M">M Text</Text>);
    expect(text).toMatchSnapshot();
  });
  it('L Text Size', () => {
    const text = renderer.create(<Text size="L">L Text</Text>);
    expect(text).toMatchSnapshot();
  });
  it('XL Text Size', () => {
    const text = renderer.create(<Text size="XL">XL Text</Text>);
    expect(text).toMatchSnapshot();
  });
  it('XXL Text Size', () => {
    const text = renderer.create(<Text size="XXL">XXL Text</Text>);
    expect(text).toMatchSnapshot();
  });
  it('No Size Defined', () => {
    const text = renderer.create(<Text>No Size Defined Text</Text>);
    expect(text).toMatchSnapshot();
  });
  it('Bold Text', () => {
    const text = renderer.create(<Text bold>Bold Text</Text>);
    expect(text).toMatchSnapshot();
  });
});
