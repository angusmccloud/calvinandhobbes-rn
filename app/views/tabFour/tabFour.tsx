import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { NavStackFourParamList } from 'models';
import { Text } from 'components';
import { Styles } from 'styles';

type NavProps = StackScreenProps<NavStackFourParamList, 'TabFour'>;

const TabFourScreen = ({ route, navigation }: NavProps): React.ReactElement => {
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
