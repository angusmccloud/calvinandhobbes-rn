import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { iDimensions } from 'models';

const calcDimensions = (): iDimensions => {
    const statusBarHeight = getStatusBarHeight(false);
    const dim = Dimensions.get('screen');
    const width = dim.width;
    const height = dim.height;
    const visibileHeight = height - statusBarHeight;
    const orientation = width > height ? 'landscape' : 'portrait';
    return {
        width,
        height,
        orientation,
        visibileHeight
    };
}

export default calcDimensions;