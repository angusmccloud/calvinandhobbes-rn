import { PixelRatio, TextStyle } from 'react-native';
import { Dimensions } from 'react-native';

const dim = Dimensions.get('screen');
const width = dim.width;
const height = dim.height;
const tablet = Math.max(height, width) > 900 ? true : false;

const scaleFont = (size: number): number => {
  return size * PixelRatio.getFontScale();
};

// FONT FAMILY
export const fontFamilyRegular = 'Avenir';
export const fontFamilyBold = 'Avenir-Heavy';

// FONT WEIGHT
export const fontWeightRegular = '400';
export const fontWeightBold = '700';

// FONT SIZE
export const fontSizeXXS = scaleFont(tablet ? 12: 10);
export const fontSizeXS = scaleFont(tablet ? 14 : 12);
export const fontSizeS = scaleFont(tablet ? 16 : 14);
export const fontSizeM = scaleFont(tablet ? 18 : 16);
export const fontSizeL = scaleFont(tablet ? 22 : 20);
export const fontSizeXL = scaleFont(tablet ? 26 : 24);
export const fontSizeXXL = scaleFont(tablet ? 36: 28);

// FONT STYLE
export const fontRegular: TextStyle = {
  fontFamily: fontFamilyRegular,
  fontWeight: fontWeightRegular,
};

export const fontBold: TextStyle = {
  fontFamily: fontFamilyBold,
  fontWeight: fontWeightBold,
};
