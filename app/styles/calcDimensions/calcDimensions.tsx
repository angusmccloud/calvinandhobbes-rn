import { Dimensions } from 'react-native';

const calcDimensions = () => {
    const dim = Dimensions.get('screen');
    const width = dim.width;
    const height = dim.height;
    const orientation = width > height ? 'landscape' : 'portrait';
    return {
        width,
        height,
        orientation
    };
}

export default calcDimensions;