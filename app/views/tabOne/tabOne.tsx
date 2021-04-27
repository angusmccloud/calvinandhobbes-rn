import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from 'components';
import { Styles } from 'styles';

const TabOneScreen = ({ route, navigation }): React.ReactElement => {
  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <Text size="XXL" bold>
          Tab 1
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TabOneScreen;
