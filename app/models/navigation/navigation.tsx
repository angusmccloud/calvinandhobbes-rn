import { StackNavigationProp } from '@react-navigation/stack';
import { iStrip } from 'models';

export type NavStackHomeParamList = {
  Home: undefined;
  ComicDetails: {
    stripData: iStrip[];
    initialIndex: number;
    favoritesArray: any[];
    jumpToLastRead: boolean;
  };
};

export type NavStackSearchParamList = {
  Search: undefined;
  ComicDetails: {
    stripData: iStrip[];
    initialIndex: number;
    favoritesArray: any[];
    jumpToLastRead: boolean;
  };
};

export type NavStackFavoritesParamList = {
  Favorites: undefined;
  ComicDetails: {
    stripData: iStrip[];
    initialIndex: number;
    favoritesArray: any[];
    jumpToLastRead: boolean;
  };
};

export type NavStackAboutParamList = {
  About: undefined;
};

// This gets used as a type when a function needs the Navigation object passed to it
export type BasicNavProp = StackNavigationProp<NavStackSearchParamList>;
