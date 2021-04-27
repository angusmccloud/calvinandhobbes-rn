import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from 'components';
import { Styles } from 'styles';

const TabFourScreen = ({ route, navigation }): React.ReactElement => {
  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <Text size="XXL" bold>
          Tab 4
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TabFourScreen;
