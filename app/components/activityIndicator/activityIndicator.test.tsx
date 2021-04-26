import React from 'react';
import renderer from 'react-test-renderer';
import ActivityIndicator from './activityIndicator';

describe('Activity Indicator Component rendered correctly', () => {
  it('Visible Indicator, Default Settings', () => {
    const indicator = renderer.create(<ActivityIndicator />);
    expect(indicator).toMatchSnapshot();
  });

  it('Custom Color and Size Indicator, Default Settings', () => {
    const indicator = renderer.create(
      <ActivityIndicator size={20} color="red" />,
    );
    expect(indicator).toMatchSnapshot();
  });

  it('Hidden Indicator, Default Settings', () => {
    const indicator = renderer.create(<ActivityIndicator visible={false} />);
    expect(indicator).toMatchSnapshot();
  });
});
