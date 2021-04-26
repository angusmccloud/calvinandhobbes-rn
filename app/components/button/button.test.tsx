import React from 'react';
import renderer from 'react-test-renderer';
import {eIcons} from 'models';
import Button from './button';

const mockfn = jest.fn();

describe('Button Component rendered correctly', () => {
  it('Button Style Primary Large', () => {
    const button = renderer.create(
      <Button
        buttonStyle="primary"
        size="Large"
        text="Primary Large"
        onPress={mockfn}
      />,
    );
    expect(button).toMatchSnapshot();
  });
  it('Button Style Primary Small', () => {
    const button = renderer.create(
      <Button
        buttonStyle="primary"
        size="Small"
        text="Primary Small"
        onPress={mockfn}
      />,
    );
    expect(button).toMatchSnapshot();
  });
  it('Button Style Secondary', () => {
    const button = renderer.create(
      <Button
        buttonStyle="secondary"
        size="Large"
        text="Secondary"
        onPress={mockfn}
      />,
    );
    expect(button).toMatchSnapshot();
  });
  it('Button Style Hollow', () => {
    const button = renderer.create(
      <Button
        buttonStyle="hollow"
        size="Large"
        text="Hollow"
        onPress={mockfn}
      />,
    );
    expect(button).toMatchSnapshot();
  });
  it('Button Style Tertiary', () => {
    const button = renderer.create(
      <Button
        buttonStyle="tertiary"
        size="Large"
        text="Tertiary"
        onPress={mockfn}
      />,
    );
    expect(button).toMatchSnapshot();
  });
  it('Button With Icon', () => {
    const button = renderer.create(
      <Button
        buttonStyle="tertiary"
        iconName={eIcons.about}
        iconSize={16}
        text="Button With Icon"
        onPress={mockfn}
      />,
    );
    expect(button).toMatchSnapshot();
  });
  it('Button Is Disabled', () => {
    const button = renderer.create(
      <Button
        buttonStyle="primary"
        text="Disabled Button"
        disabled
        onPress={mockfn}
      />,
    );
    expect(button).toMatchSnapshot();
  });
});
