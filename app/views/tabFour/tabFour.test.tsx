import 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import TabFourScreen from './tabFour';

jest.mock('@react-navigation/native');

describe('<TabFourScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<TabFourScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
