import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { NavStackTwoParamList } from 'models';
import { Text } from 'components';
import { Styles } from 'styles';

type NavProps = StackScreenProps<NavStackTwoParamList, 'TabTwo'>;

const TabTwoScreen = ({ route, navigation }: NavProps): React.ReactElement => {
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
