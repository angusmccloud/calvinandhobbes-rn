import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'components';
import { eIcons } from 'models';
import { Colors, Typography } from 'styles';

const plusMinusButtonSection = (
  name: string,
  title: string,
  increaseDisabled: boolean,
  decreaseDisabled: boolean,
  currentValue: number,
  increaseValue: (category: string) => void,
  decreaseValue: (category: string) => void,
): React.ReactElement => {
  const decreaseHandler = () => {
    if (!decreaseDisabled) {
      decreaseValue(name);
    }
  };

  const increaseHandler = () => {
    if (!increaseDisabled) {
      increaseValue(name);
    }
  };

  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <Text size="S" bold>
          {title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          overflow: 'hidden',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: Colors.buttonPrimaryBackground,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 4,
            paddingRight: 4,
            backgroundColor: decreaseDisabled
              ? Colors.grayLight
              : Colors.buttonPrimaryBackground,
          }}
          onPress={() => decreaseHandler()}>
          <Icon
            icon={eIcons.minus}
            color={Colors.white}
            iconSize={Typography.fontSizeXL}
          />
        </TouchableOpacity>
        <View
          style={{
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white,
            padding: 10,
          }}>
          <Text size="S" bold>
            {currentValue}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 4,
            paddingRight: 4,
            backgroundColor: increaseDisabled
              ? Colors.grayLight
              : Colors.buttonPrimaryBackground,
          }}
          onPress={() => increaseHandler()}>
          <Icon
            icon={eIcons.plus}
            color={Colors.white}
            iconSize={Typography.fontSizeXL}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default plusMinusButtonSection;
