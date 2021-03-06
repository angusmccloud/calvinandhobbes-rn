import React, { useState } from 'react';
import {
  View,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import { ListImage } from 'containers';
import { iStrip } from 'models'; 
import { calcDimensions, Typography, Colors } from 'styles';
import { ActivityIndicator } from 'components';

interface StripListProps {
  stripData: iStrip[];
  searchText: string;
  favoritesArray: any[];
  setSearchText: (searchString: string) => void;
  submitSearch: () => void;
  comicClickHandler: (initialIndex: number) => void;
  showHearts: boolean;
  dataLoading: boolean;
}

const StripList = ({
  stripData,
  searchText,
  favoritesArray,
  setSearchText,
  submitSearch,
  comicClickHandler,
  showHearts,
  dataLoading,
}: StripListProps): React.ReactElement => {
  const [dimensions, setDimensions] = useState(calcDimensions());

  Dimensions.addEventListener('change', () => {
    setDimensions(calcDimensions());
  });

  const numColumns = Math.max(Math.floor(dimensions.width / 300), 1);
  const imageWidth = (dimensions.width * 0.93) / numColumns;

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.calvinRed,
          width: '100%',
          paddingBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          autoCapitalize="sentences"
          clearButtonMode="always"
          maxLength={50}
          returnKeyType="search"
          placeholder="Search for a Strip"
          value={searchText}
          placeholderTextColor={Colors.grayMedium}
          style={{
            fontSize: Typography.fontSizeM,
            fontWeight: Typography.fontWeightRegular,
            fontFamily: Typography.fontFamilyRegular,
            padding: 10,
            borderColor: Colors.borderColor,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: Colors.white,
            minWidth: '50%',
          }}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={() => submitSearch()}
        />
      </View>
      {dataLoading && (
        <ActivityIndicator size={40} />
      )}
      {!dataLoading && (
        <FlatList
          data={stripData}
          renderItem={({ item, index }) =>
              <ListImage item={item} imageWidth={imageWidth} deviceWidth={dimensions.width} numColumns={numColumns} comicClickHandler={comicClickHandler} index={index} favoritesArray={favoritesArray} showHearts={showHearts} />
          }
          keyExtractor={item => item.id}
          numColumns={numColumns}
          key={numColumns}
        />
      )}
    </>
  );
};

export default StripList;
