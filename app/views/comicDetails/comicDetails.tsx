import React, { useState, useCallback } from 'react';
import { View, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Styles, calcDimensions, Colors, Typography } from 'styles';
import { NavStackSearchParamList, iAuthStatus, eIcons } from 'models';
import { ComicDetail, CalendarModal } from 'containers';
import { checkAuthStatus, getLastReadIndex, setLastReadIndex } from 'utils';
import { GetStripDetails, GetFavorites } from 'services';
import { ActivityIndicator, Icon } from 'components';

type NavProps = StackScreenProps<NavStackSearchParamList, 'ComicDetails'>;

const ComicDetailsScreen = ({
  route,
  navigation,
}: NavProps): React.ReactElement => {
  const { jumpToLastRead } = route.params;
  const [dataLoading, setDataLoading] = useState(jumpToLastRead);
  const [dimensions, setDimensions] = useState(calcDimensions());
  const [currentIndex, setCurrentIndex] = useState(route.params.initialIndex);
  const emptyAuth: iAuthStatus = { isAuthed: false, authPending: false };
  const [authStatus, setAuthStatus] = useState(emptyAuth);
  const [stripData, setStripData] = useState(route.params.stripData);
  const [favoritesArray, setFavoritesArray] = useState(
    route.params.favoritesArray,
  );
  const [scrollable, setScrollable] = useState(true);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [jumpTime, setJumpTime] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      checkAuth();
      loadData();
    }, []),
  );

  const loadData = async () => {
    // Only runs when you're on the Home Screen
    if (jumpToLastRead) {
      setDataLoading(true);
      const stripsPromise = GetStripDetails();
      const favoritesPromise = GetFavorites();
      const allStrips = await stripsPromise;
      const favoritesList = await favoritesPromise;

      loadLastIndex();
      setStripData(allStrips);
      setFavoritesArray(favoritesList);
      setDataLoading(false);
    }
  };

  React.useLayoutEffect(() => {
    if(jumpToLastRead) {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableWithoutFeedback onPress={() => setShowCalendarModal(true)}>
            <View style={{ paddingLeft: 10}}>
              <Icon icon={eIcons.calendar} color={Colors.white} iconSize={Typography.fontSizeXXL} />
            </View>
          </TouchableWithoutFeedback>
        ),
      });
    }
  }, [navigation]);

  const loadLastIndex = async () => {
    const last = await getLastReadIndex();
    setCurrentIndex(last);
  };

  const checkAuth = async () => {
    const auth = await checkAuthStatus();
    // console.log('-- Checked Auth --', auth);
    setAuthStatus(auth);
  };

  Dimensions.addEventListener('change', () => {
    setDimensions(calcDimensions());
  });

  const viewableItemsChangedHandler = useCallback(({ changed }) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
      setLastReadIndex(changed[0].index);
    }
  }, []);

  let calendarCurrentDate = new Date();
  let calendarMinDate = new Date();
  let calendarMaxDate = new Date();
  if(!dataLoading) {
    calendarCurrentDate = new Date(stripData[currentIndex].publishedDate.year, stripData[currentIndex].publishedDate.month -1, stripData[currentIndex].publishedDate.day);
    calendarMinDate = new Date(stripData[0].publishedDate.year, stripData[0].publishedDate.month -1, stripData[0].publishedDate.day);
    calendarMaxDate = new Date(stripData[stripData.length - 1].publishedDate.year, stripData[stripData.length - 1].publishedDate.month -1, stripData[stripData.length - 1].publishedDate.day);
  }
  
  const setSeclectedDate = (dt: Date) => {
    const checkYear = dt.getFullYear();
    const checkMonth = dt.getMonth();
    const checkDay = dt.getDate();
    console.log('Selected Date', dt, checkYear, checkMonth, checkDay);
    for(let i = 0; i < stripData.length; i++) {
      if(stripData[i].publishedDate.year === checkYear && stripData[i].publishedDate.month -1 === checkMonth && stripData[i].publishedDate.day === checkDay) {
        setCurrentIndex(i);
        setLastReadIndex(i);
        setJumpTime(new Date().getTime());
        console.log('Jumping to', i);
        break;
      }
    }
  }

  return (
    <View style={Styles.body}>      
      {dataLoading && <ActivityIndicator size={40} />}
      {!dataLoading && (
        <>
          <CalendarModal showModal={showCalendarModal} setShowModal={setShowCalendarModal} currentDate={calendarCurrentDate} minDate={calendarMinDate} maxDate={calendarMaxDate} setSelectedDate={setSeclectedDate} />
          <FlatList
            key={`${dimensions.orientation}-${jumpTime.toString()}`}
            scrollEnabled={scrollable}
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
            renderItem={({ item, index }) => (
              <ComicDetail
                item={item}
                dimensions={dimensions}
                authStatus={authStatus}
                favoritesArray={favoritesArray}
                setFavoritesArray={setFavoritesArray}
                setScrollable={setScrollable}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

export default ComicDetailsScreen;
