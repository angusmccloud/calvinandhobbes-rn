import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Share } from 'react-native';
import { Text, Icon } from 'components';
import FastImage from 'react-native-fast-image';
import { iStrip, eIcons, iAuthStatus } from 'models';
import { Styles, Typography, Colors } from 'styles';
import { AddFavorite, DeleteFavorite } from 'services';

interface ComicDetailProps {
  item: iStrip;
  dimensions: {
    width: number;
    height: number;
    orientation: string;
  };
  authStatus: iAuthStatus;
}

const ComicDetail = ({
  item,
  dimensions,
  authStatus,
}: ComicDetailProps): React.ReactElement => {
  const [favorited, setFavorited] = useState(false);
  const sharePress = async (item: iStrip) => {
    console.log('-- Share Press!! --');
    const content = {
      message: `Check out this Calvin and Hobbes from ${item.displayDate}!`,
      url: item.uri,
      title: `Calvin & Hobbes | ${item.displayDate}`,
    };
    const options = {
      dialogTitle: `Calvin & Hobbes | ${item.displayDate}`,
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

  let imgWidth =
    item.dimensions.width > dimensions.width * 0.9
      ? dimensions.width * 0.9
      : item.dimensions.width;

  let imgHeight =
    item.dimensions.height > dimensions.height * 0.7
      ? dimensions.height * 0.7
      : item.dimensions.height;

  if (imgWidth / item.dimensions.width < imgHeight / item.dimensions.height) {
    imgHeight = item.dimensions.height * (imgWidth / item.dimensions.width);
  }

  if (imgHeight / item.dimensions.height < imgWidth / item.dimensions.width) {
    imgWidth = item.dimensions.width * (imgHeight / item.dimensions.height);
  }

  const addRemoveFavorite = () => {
    if(authStatus.isAuthed && !authStatus.authPending) {
      if(favorited) {
        DeleteFavorite(item.id);
      } else {
        AddFavorite(item.id);
      }
      setFavorited(!favorited);
    } else {
      console.log("-- Need to Sign In --", authStatus);
    }
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
          width: imgWidth,
        }}>
        <TouchableWithoutFeedback onPress={() => addRemoveFavorite()}>
          <View>
            <Icon
              icon={favorited ? eIcons.favoritesFocused : eIcons.favorites}
              iconSize={Typography.fontSizeXL}
              color={Colors.calvinRed}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text size="L">{item.displayDate}</Text>
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

export default ComicDetail;
