import 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import FavoritesScreen from './favorites';

jest.mock('@react-navigation/native');

describe('<FavoritesScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<FavoritesScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
