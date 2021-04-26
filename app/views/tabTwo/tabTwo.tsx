import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from 'components';
import {Styles} from 'styles';

const TabTwoScreen = ({route, navigation}): React.ReactElement => {

  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <Text size="XXL" bold>
          Tab 2
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TabTwoScreen;
