import 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import ComicDetailsScreen from './comicDetails';

jest.mock('@react-navigation/native');

describe('<ComicDetailsScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<ComicDetailsScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
