import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TabOneScreen,
  TabTwoScreen,
  TabThreeScreen,
  TabFourScreen,
  AboutScreen,
} from 'views';
import {Colors, Typography} from 'styles';
import { Icon } from 'components';
import { eIcons } from 'models';

const NavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.greenDark,
  },
  headerTintColor: Colors.white,
  headerTitleStyle: Typography.fontBold,
};

const TabOneStack = createStackNavigator();
const TabTwoStack = createStackNavigator();
const TabThreeStack = createStackNavigator();
const TabFourStack = createStackNavigator();
const AboutStack = createStackNavigator();

function TabOneStackScreen() {
  return (
    <TabOneStack.Navigator screenOptions={NavOptions}>
      <TabOneStack.Screen name="Tab One" component={TabOneScreen} />
    </TabOneStack.Navigator>
  );
}

function TabTwoStackScreen() {
  return (
    <TabTwoStack.Navigator screenOptions={NavOptions}>
      <TabTwoStack.Screen name="Tab Two" component={TabTwoScreen} />
    </TabTwoStack.Navigator>
  );
}

function TabThreeStackScreen() {
  return (
    <TabThreeStack.Navigator screenOptions={NavOptions}>
      <TabThreeStack.Screen name="Tab Three" component={TabThreeScreen} />
    </TabThreeStack.Navigator>
  );
}

function TabFourStackScreen() {
  return (
    <TabFourStack.Navigator screenOptions={NavOptions}>
      <TabFourStack.Screen name="Tab Four" component={TabFourScreen} />
    </TabFourStack.Navigator>
  );
}

function AboutStackScreen() {
  return (
    <AboutStack.Navigator screenOptions={NavOptions}>
      <AboutStack.Screen name="About" component={AboutScreen} />
    </AboutStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{activeTintColor: Colors.greenDark, inactiveTintColor: Colors.textDefault, labelStyle: {fontSize: Typography.fontSizeXXS}}}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: eIcons = eIcons.tabOne;

            if (route.name === 'Tab One') {
              iconName = focused ? eIcons.tabOneFocused : eIcons.tabOne;
            } else if (route.name === 'Tab Two') {
              iconName = focused ? eIcons.tabTwoFocused : eIcons.tabTwo;
            } else if (route.name === 'Tab Three') {
              iconName = focused ? eIcons.tabThreeFocused : eIcons.tabThree;
            } else if (route.name === 'Tab Four') {
              iconName = focused ? eIcons.tabFourFocused : eIcons.tabFour;
            } else if (route.name === 'About') {
              iconName = focused ? eIcons.aboutFocused : eIcons.about;
            }

            // You can return any component that you like here!
            return (
              <Icon icon={iconName} iconSize={size} color={Colors.greenDark} />
            );
          },
        })}>
        <Tab.Screen name="Tab One" component={TabOneStackScreen} />
        <Tab.Screen name="Tab Two" component={TabTwoStackScreen} />
        <Tab.Screen name="Tab Three" component={TabThreeStackScreen} />
        <Tab.Screen name="Tab Four" component={TabFourStackScreen} />
        <Tab.Screen name="About" component={AboutStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
