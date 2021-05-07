import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { NavStackThreeParamList } from 'models';
import { Text } from 'components';
import { Styles } from 'styles';

type NavProps = StackScreenProps<NavStackThreeParamList, 'TabThree'>;

const TabThreeScreen = ({
  route,
  navigation,
}: NavProps): React.ReactElement => {
  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <Text size="XXL" bold>
          Tab 3
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TabThreeScreen;
