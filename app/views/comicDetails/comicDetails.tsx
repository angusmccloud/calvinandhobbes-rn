import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Share,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import base64 from 'react-native-base64';
import { Text, Icon } from 'components';
import { Styles, calcDimensions, Typography, Colors } from 'styles';
import FastImage from 'react-native-fast-image';
import { iStrip, eIcons, NavStackOneParamList } from 'models';
import { displayDate } from 'utils';

type NavProps = StackScreenProps<NavStackOneParamList, 'ComicDetails'>;

const ComicDetailsScreen = ({
  route,
  navigation,
}: NavProps): React.ReactElement => {
  const { stripData, clickedIndex } = route.params;
  const [dimensions, setDimensions] = useState(calcDimensions());
  const [currentIndex, setCurrentIndex] = useState(clickedIndex);

  Dimensions.addEventListener('change', () => {
    setDimensions(calcDimensions());
  });

  const viewableItemsChangedHandler = useCallback(({ changed }) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  }, []);

  return (
    <View style={Styles.body}>
      <FlatList
        key={dimensions.orientation}
        data={stripData}
        horizontal={true}
        initialNumToRender={5}
        initialScrollIndex={currentIndex}
        snapToAlignment="center"
        pagingEnabled={true}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(data, index) => ({
          length: dimensions.width,
          offset: dimensions.width * index,
          index,
        })}
        onViewableItemsChanged={viewableItemsChangedHandler}
        renderItem={({ item, index }) => renderComicDetails(item, dimensions)}
      />
    </View>
  );
};

export default ComicDetailsScreen;

const renderComicDetails = (item: iStrip, dimensions) => {
  const sharePress = async (item: iStrip) => {
    console.log('-- Share Press!! --');
    const content = {
      message: `Check out this Calvin and Hobbes from ${displayDate(
        item.publishedDate,
      )}!`,
      url: item.uri,
      title: `Calvin & Hobbes | ${displayDate(item.publishedDate)}`,
    };
    const options = {
      dialogTitle: `Calvin & Hobbes | ${displayDate(item.publishedDate)}`,
      subject: 'Check out this Calvin and Hobbes',
    };

    try {
      const result = await Share.share(content, options);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with', result.activityType);
          // shared with activity type of result.activityType
        } else {
          console.log('shared');
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let imgWidth = item.dimensions.width > dimensions.width * 0.9
    ? dimensions.width * 0.9
    : item.dimensions.width;

  let imgHeight = item.dimensions.height > dimensions.height * 0.7
    ? dimensions.height * 0.7
    : item.dimensions.height;

  if((imgWidth / item.dimensions.width) < (imgHeight / item.dimensions.height)) {
    imgHeight = item.dimensions.height * (imgWidth / item.dimensions.width);
  }

  if((imgHeight / item.dimensions.height) < (imgWidth / item.dimensions.width)) {
    imgWidth = item.dimensions.width * (imgHeight / item.dimensions.height);
  }

  return (
    <View style={[Styles.centerAll, { width: dimensions.width }]}>
      <FastImage
        source={{ uri: item.uri }}
        style={{
          width: imgWidth,
          height: imgHeight,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: imgWidth
        }}>
        <Icon
          icon={eIcons.favorites}
          iconSize={Typography.fontSizeXL}
          color={Colors.calvinRed}
        />
        <Text size="L">{displayDate(item.publishedDate)}</Text>
        <TouchableWithoutFeedback onPress={() => sharePress(item)}>
          <View>
            <Icon
              icon={eIcons.share}
              iconSize={Typography.fontSizeXL}
              color={Colors.black}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
