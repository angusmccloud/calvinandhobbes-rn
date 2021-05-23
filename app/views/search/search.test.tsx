import 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import SearchScreen from './search';

jest.mock('@react-navigation/native');

describe('<SearchScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<SearchScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
