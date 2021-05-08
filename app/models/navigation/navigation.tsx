import { StackNavigationProp } from '@react-navigation/stack';

// Sample screen export that needs props: `Details: { itemId: number };`
export type NavStackOneParamList = {
  Home: undefined;
};

export type NavStackTwoParamList = {
  Favorites: undefined;
};

export type NavStackThreeParamList = {
  TabThree: undefined;
};

export type NavStackFourParamList = {
  TabFour: undefined;
};

export type NavStackAboutParamList = {
  About: undefined;
};

// This gets used as a type when a function needs the Navigation object passed to it
export type BasicNavProp = StackNavigationProp<NavStackOneParamList>;
