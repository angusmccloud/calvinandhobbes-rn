import React from 'react';
import {View, ViewStyle} from 'react-native';
import {Colors, Styles} from 'styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {eIcons} from 'models';

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
  color: Colors.blueDark,
  iconSize: 50,
  outline: true,
};

const iconName = (name: eIcons) => {
  switch (name) {
    case eIcons.tabOne:
      return 'home-outline';
    case eIcons.tabOneFocused:
      return 'home';
    case eIcons.tabTwo:
      return 'search-outline';
    case eIcons.tabTwoFocused:
      return 'search';
    case eIcons.tabThree:
      return 'stats-chart-outline';
    case eIcons.tabThreeFocused:
      return 'stats-chart';
    case eIcons.tabFour:
      return 'star-outline';
    case eIcons.tabFourFocused:
      return 'star';
    case eIcons.about:
      return 'person-outline';
    case eIcons.aboutFocused:
      return 'person';
    default:
      return 'home';
  }
};

export default Icon;
