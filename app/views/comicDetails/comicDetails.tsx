import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { NavStackOneParamList } from 'models';
import { Text } from 'components';
import { Styles, calcDimensions } from 'styles';
import FastImage from 'react-native-fast-image';
import { iStrip } from 'models';
import { displayDate } from 'utils';

type NavProps = StackScreenProps<NavStackOneParamList, 'ComicDetails'>;

const ComicDetailsScreen = ({
  route,
  navigation,
}: NavProps): React.ReactElement => {
  const { stripData, clickedIndex } = route.params;
  const [dimensions, setDimensions] = useState(calcDimensions());

  Dimensions.addEventListener('change', () => {
    setDimensions(calcDimensions());
  });

  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <FlatList
          data={stripData}
          horizontal={true}
          initialNumToRender={5}
          initialScrollIndex={clickedIndex}
          snapToAlignment="center"
          pagingEnabled={true}
          keyExtractor={(item) => item.id.toString()}
          getItemLayout={(data, index) => ({
            length: dimensions.width,
            offset: dimensions.width * index,
            index,
          })}
          renderItem={({ item, index }) => (
            <View style={[Styles.centerAll, { width: dimensions.width }]}>
              <FastImage
                source={{ uri: item.uri }}
                style={{
                  width: item.dimensions.width > dimensions.width * .9 ? dimensions.width * .9 : item.dimensions.width,
                  height: item.dimensions.height > dimensions.height * .7 ? dimensions.height * .7 : item.dimensions.height,
                }}
                resizeMode="contain"
              />
              <Text>
                {displayDate(item.publishedDate)}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ComicDetailsScreen;
