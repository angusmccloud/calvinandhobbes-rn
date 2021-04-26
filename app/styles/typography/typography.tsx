import {PixelRatio, TextStyle} from 'react-native';

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
export const fontSizeXXS = scaleFont(12);
export const fontSizeXS = scaleFont(14);
export const fontSizeS = scaleFont(16);
export const fontSizeM = scaleFont(18);
export const fontSizeL = scaleFont(22);
export const fontSizeXL = scaleFont(26);
export const fontSizeXXL = scaleFont(36);

// FONT STYLE
export const fontRegular: TextStyle = {
  fontFamily: fontFamilyRegular,
  fontWeight: fontWeightRegular,
};

export const fontBold: TextStyle = {
  fontFamily: fontFamilyBold,
  fontWeight: fontWeightBold,
};
