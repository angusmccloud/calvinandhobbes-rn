import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StripList } from 'containers';
import { GetStripDetails, GetFavorites } from 'services';
import { iStrip, NavStackSearchParamList, iAuthStatus } from 'models';
import { Styles } from 'styles';
import { checkAuthStatus } from 'utils';

type NavProps = StackScreenProps<NavStackSearchParamList, 'Search'>;

const SearchScreen = ({ route, navigation }: NavProps): React.ReactElement => {
  const emptyStrips: iStrip[] = [];
  const emptyArray: any[] = [];
  const emptyAuth: iAuthStatus = { isAuthed: false, authPending: true };
  const [authStatus, setAuthStatus] = useState(emptyAuth);
  const [stripData, setStripData] = useState(emptyStrips);
  const [filteredStripData, setFilteredStripData] = useState(emptyStrips);
  const [favoritesArray, setFavoritesArray] = useState(emptyArray);
  const [searchText, setSearchText] = useState('');
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const checkAuth = async () => {
    const auth = await checkAuthStatus();
    // console.log('-- Checked Auth --', auth);
    setAuthStatus(auth);
  };

  const loadData = async () => {
    setDataLoading(true);
    await checkAuth();
    const stripsPromise = GetStripDetails();
    const favoritesPromise = GetFavorites(authStatus);
    const allStrips = await stripsPromise;
    const favoritesList = await favoritesPromise;

    setStripData(allStrips);
    setFavoritesArray(favoritesList);
    setFilteredStripData(allStrips);
    setDataLoading(false);
  };

  const submitSearch = () => {
    if (searchText.length > 0) {
      const searchArray = searchText.toLocaleLowerCase().split(' ');
      console.log(searchArray);

      const filtered = stripData.filter((strip: iStrip) => {
        let matches = true;
        for (let i = 0; i < searchArray.length; i++) {
          if (
            !strip.description
              .toLowerCase()
              .includes(searchArray[i].toLowerCase())
          ) {
            matches = false;
            break;
          }
        }
        return matches;
      });
      setFilteredStripData(filtered);
    } else {
      setFilteredStripData(stripData);
    }
  };

  const comicClickHandler = (initialIndex: number) => {
    navigation.navigate('ComicDetails', {
      stripData: filteredStripData,
      initialIndex: initialIndex,
      favoritesArray: favoritesArray,
      jumpToLastRead: false,
    });
  };

  const searchTextUpdate = (text: string) => {
    setSearchText(text);
    if(text.length === 0) {
      setFilteredStripData(stripData);
    }
  }

  return (
    <View style={Styles.body}>
      <StripList
        stripData={filteredStripData}
        favoritesArray={favoritesArray}
        setSearchText={searchTextUpdate}
        searchText={searchText}
        submitSearch={submitSearch}
        comicClickHandler={comicClickHandler}
        showHearts={true}
        dataLoading={dataLoading}
      />
    </View>
  );
};

export default SearchScreen;
