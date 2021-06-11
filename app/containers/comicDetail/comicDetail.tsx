import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { useHeaderHeight } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ImageZoom from 'react-native-image-pan-zoom';
import FastImage from 'react-native-fast-image';
import { Text, Icon, ActivityIndicator } from 'components';
import { iStrip, eIcons, iAuthStatus, iDimensions } from 'models';
import { Typography, Colors } from 'styles';
import { AddFavorite, DeleteFavorite } from 'services';
import { checkAuthStatus } from 'utils';

interface ComicDetailProps {
  item: iStrip;
  dimensions: iDimensions;
  authStatus: iAuthStatus;
  favoritesArray: any[];
  setFavoritesArray: (newList: any[]) => void;
  setScrollable: (scrollable: boolean) => void;
}

const ComicDetail = ({
  item,
  dimensions,
  authStatus,
  favoritesArray,
  setFavoritesArray,
  setScrollable,
}: ComicDetailProps): React.ReactElement => {
  const [favorited, setFavorited] = useState(favoritesArray.includes(item.id));
  const [shareBase64Calculating, setShareBase64Calculating] = useState(false);

  const sharePress = async (item: iStrip) => {
    setShareBase64Calculating(true);
    console.log('-- Share Press!! --');

    const imageName = /[^/]*$/.exec(item.uri)[0];

    const path = `${RNFS.DocumentDirectoryPath}/${imageName}`;
    await RNFS.downloadFile({ fromUrl: item.uri, toFile: `file://${path}` })
      .promise.then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('-- ERROR in RNFS --', err);
        return err;
      });
    RNFS.readFile(`file://${path}`, 'base64').then((res) => {
      let shareOptionsUrl = {
        title: 'Calvin & Hobbes',
        message: `Check out this Calvin and Hobbes from ${item.displayDate}`,
        url: `data:image/jpeg;base64,${res}`, // use image/jpeg instead of image/jpg
        subject: 'Check out this Calvin and Hobbes',
        excludedActivityTypes: [
          'com.apple.UIKit.activity.SaveToCameraRoll',
          'com.apple.UIKit.activity.AssignToContact',
        ]
      };
      Share.open(shareOptionsUrl)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
      setShareBase64Calculating(false);
    });
  };

  const headerHeight = useHeaderHeight();
  const tabHeight = useBottomTabBarHeight();
  const useableHeight = dimensions.height - headerHeight - tabHeight;

  let imgWidth =
    item.dimensions.width > dimensions.width * 0.9
      ? dimensions.width * 0.9
      : item.dimensions.width;

  let imgHeight =
    item.dimensions.height > (useableHeight - Typography.fontSizeXL) * 0.95
      ? (useableHeight - Typography.fontSizeXL) * 0.95
      : item.dimensions.height;

  if (imgWidth / item.dimensions.width < imgHeight / item.dimensions.height) {
    imgHeight = item.dimensions.height * (imgWidth / item.dimensions.width);
  }

  if (imgHeight / item.dimensions.height < imgWidth / item.dimensions.width) {
    imgWidth = item.dimensions.width * (imgHeight / item.dimensions.height);
  }

  const addRemoveFavorite = async () => {
    if (authStatus.isAuthed && !authStatus.authPending) {
      processAddRemoveFavorite(authStatus);
    } else {
      const updatedAuth = await checkAuthStatus();
      if (updatedAuth.isAuthed && !updatedAuth.authPending) {
        // Weird check for "user signed in after page loaded"
        // Ugly solution, just need something here quickly
        // ...Sorry future connor
        processAddRemoveFavorite(updatedAuth);
      } else {
        Alert.alert(
          'Not Signing In',
          'You must sign in to track your favorites, which are then tracked across devices.',
          [
            {
              text: 'Ok',
              style: 'default',
            },
          ],
        );
        // console.log('-- Need to Sign In --', authStatus);
      }
    }
  };

  const processAddRemoveFavorite = (authStatus: iAuthStatus) => {
    const newFavorites: any[] = [];
    if (favorited) {
      DeleteFavorite(item.id, authStatus);
      for (let i = 0; i < favoritesArray.length; i++) {
        if (favoritesArray[i] !== item.id) {
          newFavorites.push(favoritesArray[i]);
        }
      }
    } else {
      AddFavorite(item.id, authStatus);
      for (let i = 0; i < favoritesArray.length; i++) {
        newFavorites.push(favoritesArray[i]);
      }
      newFavorites.push(item.id);
    }
    setFavorited(!favorited);
    setFavoritesArray(newFavorites);
  };

  return (
    <View style={{ width: dimensions.width }}>
      <ImageZoom
        enableSwipeDown={true}
        minScale={1}
        useNativeDriver={true}
        onMove={({ scale }) => {
          setScrollable(scale > 0.9 && scale < 1.1 ? true : false);
        }}
        cropWidth={dimensions.width}
        cropHeight={useableHeight}
        imageWidth={imgWidth}
        imageHeight={imgHeight + Typography.fontSizeXL}>
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
            paddingTop: 6,
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
          <Text size="M">{item.displayDate}</Text>
          {shareBase64Calculating && (
            <View>
              <ActivityIndicator size={Typography.fontSizeXL} />
            </View>
          )}
          {!shareBase64Calculating && (
            <TouchableWithoutFeedback onPress={() => sharePress(item)}>
              <View>
                <Icon
                  icon={eIcons.share}
                  iconSize={Typography.fontSizeXL}
                  color={Colors.calvinRed}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </ImageZoom>
    </View>
  );
};

export default ComicDetail;
