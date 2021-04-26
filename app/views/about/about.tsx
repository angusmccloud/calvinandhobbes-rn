import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text} from 'components';
import { Styles } from 'styles';

const AboutScreen = ({ route, navigation }): React.ReactElement => {
  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <Text size='XXL' bold>
          About
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;
