import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Styles, calcDimensions } from 'styles';
import { NavStackOneParamList, iAuthStatus } from 'models';
import { ComicDetail } from 'containers';
import { checkAuthStatus } from 'utils';

type NavProps = StackScreenProps<NavStackOneParamList, 'ComicDetails'>;

const ComicDetailsScreen = ({
  route,
  navigation,
}: NavProps): React.ReactElement => {
  const { stripData, clickedIndex } = route.params;
  const [dimensions, setDimensions] = useState(calcDimensions());
  const [currentIndex, setCurrentIndex] = useState(clickedIndex);
  const emptyAuth: iAuthStatus = { isAuthed: false, authPending: false };
  const [authStatus, setAuthStatus] = useState(emptyAuth);

  useFocusEffect(
    React.useCallback(() => {
      checkAuth();
    }, []),
  );

  const checkAuth = async() => {
    const auth = await checkAuthStatus();
    console.log('-- Checked Auth --', auth);
    setAuthStatus(auth);
  }

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
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => ({
          length: dimensions.width,
          offset: dimensions.width * index,
          index,
        })}
        onViewableItemsChanged={viewableItemsChangedHandler}
        renderItem={({ item, index }) => <ComicDetail item={item} dimensions={dimensions} authStatus={authStatus} /> }
      />
    </View>
  );
};

export default ComicDetailsScreen;