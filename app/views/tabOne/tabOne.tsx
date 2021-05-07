import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { NavStackOneParamList } from 'models';
import { Text } from 'components';
import { Styles } from 'styles';

type NavProps = StackScreenProps<NavStackOneParamList, 'TabOne'>;

const TabOneScreen = ({ route, navigation }: NavProps): React.ReactElement => {
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
