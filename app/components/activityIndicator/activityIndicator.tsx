import React from 'react';
import {Colors} from 'styles';
import {WaveIndicator} from 'react-native-indicators';

interface ActivityIndicatorProps {
  size?: number;
  color?: string;
  visible?: boolean;
}

const ActivityIndicator = ({
  size,
  color,
  visible,
}: ActivityIndicatorProps): React.ReactElement => {
  return <>{visible && <WaveIndicator color={color} size={size} />}</>;
};

ActivityIndicator.defaultProps = {
  size: 40,
  color: Colors.blueDark,
  visible: true,
};

export default ActivityIndicator;
