import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import { listImage } from 'containers';
import { iStrip, BasicNavProp } from 'models';
import { calcDimensions, Typography, Colors } from 'styles';

interface StripListProps {
  stripData: iStrip[];
  navigation: BasicNavProp;
  searchText: string;
  setSearchText: (searchString: string) => void;
  submitSearch: () => void;
}

const StripList = ({
  stripData,
  navigation,
  searchText,
  setSearchText,
  submitSearch,
}: StripListProps): React.ReactElement => {
  const [dimensions, setDimensions] = useState(calcDimensions());

  Dimensions.addEventListener('change', () => {
    setDimensions(calcDimensions());
  });

  let numColumns = 3;
  let imageWidth = (dimensions.width * 0.93) / numColumns;
  if (dimensions.orientation === 'portrait') {
    numColumns = 2;
    imageWidth = (dimensions.width * 0.93) / numColumns;
  }

  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    const blankArray: React.ReactElement[] = [];
    columns.push(blankArray);
  }

  for (let i = 0; i < stripData.length; i++) {
    columns[i % numColumns].push(
      listImage(stripData[i], imageWidth, dimensions.width, numColumns),
    );
  }

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
          onEndEditing={() => submitSearch()}
        />
      </View>
      <FlatList
        data={stripData}
        renderItem={({ item }) =>
          listImage(item, imageWidth, dimensions.width, numColumns)
        }
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
        key={numColumns}
      />
    </>
  );
};

export default StripList;
