import 'react-native';
import React from 'react';
import renderer, {act} from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import TabTwoScreen from './tabTwo';

jest.mock('@react-navigation/native');

describe('<TabTwoScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<TabTwoScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
