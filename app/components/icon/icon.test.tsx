import React from 'react';
import renderer from 'react-test-renderer';
import {eIcons} from 'models';
import Icon from './icon';

describe('Icon Component rendered correctly', () => {
  it('tab One Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.tabOne} />);
    expect(icon).toMatchSnapshot();
  });
  it('tab One Focused Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.tabOneFocused} />);
    expect(icon).toMatchSnapshot();
  });
  it('tab Two Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.tabTwo} />);
    expect(icon).toMatchSnapshot();
  });
  it('tab Two Focused Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.tabTwoFocused} />);
    expect(icon).toMatchSnapshot();
  });
  it('tab Three Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.tabThree} />);
    expect(icon).toMatchSnapshot();
  });
  it('tab Three Focused Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.tabThreeFocused} />);
    expect(icon).toMatchSnapshot();
  });
  it('tab Four Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.tabFour} />);
    expect(icon).toMatchSnapshot();
  });
  it('tab Four Focused Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.tabFourFocused} />);
    expect(icon).toMatchSnapshot();
  });
  it('About Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.about} />);
    expect(icon).toMatchSnapshot();
  });
  it('About Focused Icon', () => {
    const icon = renderer.create(<Icon icon={eIcons.aboutFocused} />);
    expect(icon).toMatchSnapshot();
  });
});
