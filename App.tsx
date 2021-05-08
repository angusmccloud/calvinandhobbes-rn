import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, FavoritesScreen, AboutScreen } from 'views';
import { Colors, Typography } from 'styles';
import { Icon } from 'components';
import { eIcons } from 'models';

const NavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.calvinRed,
    borderBottomWidth: 0,
    shadowOffset: { height: 0, width: 0 },
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontSize: Typography.fontSizeXL,
    fontWeight: Typography.fontWeightBold,
    fontFamily: 'Calvin and Hobbes'
  },
  
};

const HomeStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const AboutStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={NavOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator screenOptions={NavOptions}>
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
    </FavoritesStack.Navigator>
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
        tabBarOptions={{
          activeTintColor: Colors.calvinRed,
          inactiveTintColor: Colors.textDefault,
          labelStyle: { fontSize: Typography.fontSizeXXS },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: eIcons = eIcons.home;

            if (route.name === 'Home') {
              iconName = focused ? eIcons.homeFocused : eIcons.home;
            } else if (route.name === 'Favorites') {
              iconName = focused ? eIcons.favoritesFocused : eIcons.favorites;
            } else if (route.name === 'About') {
              iconName = focused ? eIcons.aboutFocused : eIcons.about;
            }

            // You can return any component that you like here!
            return (
              <Icon icon={iconName} iconSize={size} color={Colors.calvinRed} />
            );
          },
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
        <Tab.Screen name="About" component={AboutStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
