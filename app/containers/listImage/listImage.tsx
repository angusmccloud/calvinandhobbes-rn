import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { iStrip, BasicNavProp } from 'models';
import { Styles } from 'styles';

interface ListImageProps {
  item: iStrip,
  imageWidth: number,
  deviceWidth: number,
  numColumns: number,
  comicClickHandler: (clickedIndex: number) => void,
  index: number,
}

const ListImage = ({
  item,
  imageWidth,
  deviceWidth,
  numColumns,
  comicClickHandler,
  index,
}: ListImageProps): React.ReactElement => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: deviceWidth / numColumns,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => comicClickHandler(index)}
      key={item.id}>
      <View style={Styles.comicWrapper}>
        <FastImage
          source={{ uri: item.uri }}
          style={{
            width: imageWidth,
            height: imageWidth / 3,
          }}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ListImage;
