import { StackNavigationProp } from '@react-navigation/stack';
import { iStrip } from 'models';

// Sample screen export that needs props: `Details: { itemId: number };`
export type NavStackOneParamList = {
  Home: undefined;
  ComicDetails: {
    stripData: iStrip[];
    clickedIndex: number;
  };
};

export type NavStackTwoParamList = {
  Favorites: undefined;
  ComicDetails: {
    stripData: iStrip[];
    clickedIndex: number;
  };
};

export type NavStackAboutParamList = {
  About: undefined;
};

// This gets used as a type when a function needs the Navigation object passed to it
export type BasicNavProp = StackNavigationProp<NavStackOneParamList>;
