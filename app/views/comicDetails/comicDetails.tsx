import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, FlatList, Dimensions, TouchableWithoutFeedback, Share } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import base64 from 'react-native-base64'
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

  const sharePress = async (item: iStrip) => {
    console.log("-- Share Press!! --");
    const content = {
      message: `Check out this Calvin and Hobbes from ${displayDate(item.publishedDate)}!`,
      url: item.uri,
      title: `Calvin & Hobbes | ${displayDate(item.publishedDate)}`,
    };
    const options = {
      dialogTitle:`Calvin & Hobbes | ${displayDate(item.publishedDate)}`,
      subject: 'Check out this Calvin and Hobbes'
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
  }

const viewableItemsChangedHandler = useCallback(({ changed }) => {
    if(changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  }, []);

  return (
    <SafeAreaView>
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
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: item.dimensions.width > dimensions.width * .9 ? dimensions.width * .9 : item.dimensions.width,}}>
                <Icon icon={eIcons.favorites} iconSize={Typography.fontSizeXXL} color={Colors.calvinRed} />
                <Text size='L'>
                  {displayDate(item.publishedDate)}
                </Text>
                <TouchableWithoutFeedback onPress={() => sharePress(item)}>
                  <View>
                    <Icon icon={eIcons.share} iconSize={Typography.fontSizeXXL} color={Colors.black} />
                  </View> 
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ComicDetailsScreen;
