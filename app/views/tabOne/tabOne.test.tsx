import 'react-native';
import React from 'react';
import renderer, {act} from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import TabOneScreen from './tabOne';

jest.mock('@react-navigation/native');

describe('<TabOneScreen />', () => {
  it('should render successfully', async () => {
    const result = renderer.create(<TabOneScreen />);
    await act(async () => {
      expect(result).toBeDefined;
    });
  });
});
