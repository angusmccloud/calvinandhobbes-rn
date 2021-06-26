import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  SearchScreen,
  FavoritesScreen,
  AboutScreen,
  ComicDetailsScreen,
} from 'views';
import { Colors, Typography } from 'styles';
import { Icon } from 'components';
import { AuthModal } from 'containers';
import { eIcons } from 'models';
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const NavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.calvinRed,
    borderBottomWidth: 0,
    borderBottomColor: Colors.calvinRed,
    shadowOffset: { height: 0, width: 0 },
  },
  headerTitleContainerStyle: {
    alignItems: 'center'
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontSize: Typography.fontSizeXL,
    fontWeight: Typography.fontWeightBold,
    fontFamily: 'Calvin and Hobbes',
  },
};

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const AboutStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={NavOptions}>
      <HomeStack.Screen
        name="Home"
        component={ComicDetailsScreen}
        options={{
          headerBackTitleStyle: { fontFamily: 'Calvin and Hobbes' },
          headerRight: () => <AuthModal />,
          title: 'calvin and hobbes',
        }}
        initialParams={{ 
          stripData: [],
          initialIndex: 0,
          favoritesArray: [],
          jumpToLastRead: true
         }}
      />
    </HomeStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={NavOptions}>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerRight: () => <AuthModal /> }}
      />
      <SearchStack.Screen
        name="ComicDetails"
        component={ComicDetailsScreen}
        options={{
          headerBackTitleStyle: { fontFamily: 'Calvin and Hobbes' },
          headerRight: () => <AuthModal />,
          title: 'calvin and hobbes',
        }}
      />
    </SearchStack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator screenOptions={NavOptions}>
      <FavoritesStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerRight: () => <AuthModal /> }}
      />
      <FavoritesStack.Screen
        name="ComicDetails"
        component={ComicDetailsScreen}
        options={{
          headerBackTitleStyle: { fontFamily: 'Calvin and Hobbes' },
          headerRight: () => <AuthModal />,
          title: 'calvin and hobbes',
        }}
      />
    </FavoritesStack.Navigator>
  );
}

function AboutStackScreen() {
  return (
    <AboutStack.Navigator screenOptions={NavOptions}>
      <AboutStack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerRight: () => <AuthModal /> }}
      />
    </AboutStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
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
              } else if (route.name === 'Search') {
                iconName = focused ? eIcons.searchFocused : eIcons.search;
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
          <Tab.Screen name="Search" component={SearchStackScreen} />
          <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
          {/* <Tab.Screen name="About" component={AboutStackScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
