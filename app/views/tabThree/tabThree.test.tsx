import 'react-native';
import React from 'react';
import renderer, {act} from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import TabThreeScreen from './tabThree';

jest.mock('@react-navigation/native');

describe('<TabThreeScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<TabThreeScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
