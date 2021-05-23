import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { iStrip, eIcons } from 'models';
import { Styles } from 'styles';
import { Text, Icon } from 'components';

interface ListImageProps {
  item: iStrip,
  imageWidth: number,
  deviceWidth: number,
  numColumns: number,
  comicClickHandler: (initialIndex: number) => void,
  index: number,
  favoritesArray: any[];
  showHearts: boolean;
}

const ListImage = ({
  item,
  imageWidth,
  deviceWidth,
  numColumns,
  comicClickHandler,
  index,
  favoritesArray,
  showHearts
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
        {favoritesArray.includes(item.id) && showHearts && (
          <View style={{position: 'absolute', right: 3, top: 3}}>
            <Icon icon={eIcons.favoritesFocused} iconSize={20} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListImage;
