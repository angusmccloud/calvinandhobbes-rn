import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { iStrip } from 'models';
import { Styles } from 'styles';

const listImage = (
  item: iStrip,
  imageWidth: number,
  deviceWidth: number,
  numColumns: number,
) => {
  return (
    <View
      style={{
        width: deviceWidth / numColumns,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      key={item.id}>
      <View style={Styles.comicWrapper}>
        <FastImage
          source={{ uri: item.uri }}
          style={{
            width: imageWidth,
            height: imageWidth / 3
          }}
          resizeMode='cover'
        />
      </View>
    </View>
  );
};

export default listImage;
