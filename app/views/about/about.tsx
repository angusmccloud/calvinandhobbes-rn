import React from 'react';
import { SafeAreaView, View, Image, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { NavStackAboutParamList } from 'models';
import { Text } from 'components';
import { Styles } from 'styles';

type NavProps = StackScreenProps<NavStackAboutParamList, 'About'>;

const AboutScreen = ({ route, navigation }: NavProps): React.ReactElement => {
  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <ScrollView>
        <View style={{paddingBottom: 10}}>
          <Text size="L">
            Connor is an application development senior delivery principal consultant for Slalom Consulting. A Bostonian since 2004, he has consulted with Slalom for six years and with Accenture the 7 years before that.
          </Text>
        </View>
        <View style={{paddingBottom: 10}}>
          <Text size="L">
            His consulting expertise encompasses years of IT project management that included the implementation of data warehousing and reporting platform, implementing team-collaboration tools at global clients, and years of work with energy trading systems. More recently his work takes a dive into hands on application development focusing on full-stack web development and mobile applications.
          </Text>
        </View>
        <View style={{paddingBottom: 10}}>
          <Text size="L">
            Connor's passion for problem solving and creative IT solutions extends into his personal life as the founder and mobile developer for the global app BrewGene (>200k users).
          </Text>
        </View>
        <View style={{paddingBottom: 10}}>
          <Text size="L">
            Connor loves playing games with friends and family while his two cats Sherlock and Watson sit close by. He is a friendly vegetarian, beer and wine aficionado, and spends the year longing for ski weekends in Vermont.
          </Text>
        </View>
        <View>
          <Text size="L">
            He is a life-long Circle Schooler and would love to help you and your coworkers get better at recycling and composting.
          </Text>
        </View>
        <Image source={require('assets/images/connor.jpg')} style={{width: 400, height: 300, resizeMode: 'contain', marginTop: 10, marginLeft: 10}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;
