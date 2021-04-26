import 'react-native';
import React from 'react';
import renderer, {act} from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import AboutScreen from './about';

jest.mock('@react-navigation/native');

describe('<AboutScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<AboutScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
