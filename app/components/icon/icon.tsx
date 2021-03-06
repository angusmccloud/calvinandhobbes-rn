import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Colors, Styles } from 'styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { eIcons } from 'models';

export interface IconProps {
  icon: eIcons;
  iconSize?: number;
  containerStyle?: ViewStyle;
  color?: string;
}

const Icon = ({
  icon,
  iconSize,
  containerStyle,
  color,
}: IconProps): React.ReactElement => (
  <View
    style={[
      {
        ...containerStyle,
        overflow: 'hidden',
      },
      Styles.centerAll,
    ]}>
    <Ionicons name={iconName(icon)} size={iconSize} color={color} />
  </View>
);

Icon.defaultProps = {
  color: Colors.calvinRed,
  iconSize: 50,
  outline: true,
};

const iconName = (name: eIcons) => {
  switch (name) {
    case eIcons.home:
      return 'home-outline';
    case eIcons.homeFocused:
      return 'home';
    case eIcons.search:
      return 'search-outline';
    case eIcons.searchFocused:
      return 'search';
    case eIcons.favorites:
      return 'heart-outline';
    case eIcons.favoritesFocused:
      return 'heart';
    case eIcons.about:
      return 'person-outline';
    case eIcons.aboutFocused:
      return 'person';
    case eIcons.share:
      return 'share-outline';
    case eIcons.user:
      return 'person-circle-outline';
    case eIcons.calendar:
      return 'calendar-outline';
    default:
      return 'home';
  }
};

export default Icon;
