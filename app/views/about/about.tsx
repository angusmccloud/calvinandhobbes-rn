import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { NavStackAboutParamList } from 'models';
import { Text } from 'components';
import { Styles } from 'styles';

type NavProps = StackScreenProps<NavStackAboutParamList, 'About'>;

const AboutScreen = ({ route, navigation }: NavProps): React.ReactElement => {
  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <Text size="XXL" bold>
          About
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;
