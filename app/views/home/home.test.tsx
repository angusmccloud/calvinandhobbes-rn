import 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import HomeScreen from './home';

jest.mock('@react-navigation/native');

describe('<HomeScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<HomeScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
