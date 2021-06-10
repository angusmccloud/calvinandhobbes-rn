import React, {useState} from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { NavStackFavoritesParamList, iStrip } from 'models';
import { Text } from 'components';
import { StripList } from 'containers';
import { Styles } from 'styles';
import { GetFavorites, GetStripDetails } from  'services';
import { iAuthStatus } from 'models';
import { checkAuthStatus } from 'utils';

type NavProps = StackScreenProps<NavStackFavoritesParamList, 'Favorites'>;

const FavoritesScreen = ({ route, navigation }: NavProps): React.ReactElement => {
  const emptyStrips: iStrip[] = [];
  const emptyArray: any[] = [];
  const emptyAuth: iAuthStatus = { isAuthed: false, authPending: true };
  const [authStatus, setAuthStatus] = useState(emptyAuth);
  const [dataLoading, setDataLoading] = useState(true);
  const [stripData, setStripData] = useState(emptyStrips);
  const [filteredStripData, setFilteredStripData] = useState(emptyStrips);
  const [favoritesArray, setFavoritesArray] = useState(emptyArray);
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  const checkAuth = async () => {
    const auth = await checkAuthStatus();
    // console.log('-- Checked Auth --', auth);
    setAuthStatus(auth);
  };

  const loadData = async () => {
    await checkAuth();
    setDataLoading(true);
    setSearchText('');
    const stripsPromise = GetStripDetails();
    const favoritesPromise = GetFavorites(authStatus);
    const allStrips = await stripsPromise;
    const favoritesList = await favoritesPromise;

    setStripData(allStrips);
    setFavoritesArray(favoritesList)
    const filtered = allStrips.filter((strip: iStrip) => {
      return favoritesList.includes(strip.id);
    });
    setFilteredStripData(filtered);
    setDataLoading(false);
  }

  const submitSearch = () => {
    if(searchText.length > 0) {
      const searchArray = searchText.toLocaleLowerCase().split(' ');
      console.log(searchArray);

      const filtered = stripData.filter((strip: iStrip) => {
        let matches = favoritesArray.includes(strip.id);
        if(matches) {
          for(let i = 0; i < searchArray.length; i++) {
            if(!strip.description.toLowerCase().includes(searchArray[i].toLowerCase())) {
              matches = false;
              break;
            }
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
  }

  const searchTextUpdate = (text: string) => {
    setSearchText(text);
    if(text.length === 0) {
      const filtered = stripData.filter((strip: iStrip) => {
        return favoritesArray.includes(strip.id);
      });
      setFilteredStripData(filtered);
    }
  }

  return (
    <View style={Styles.body}>
      <StripList stripData={filteredStripData} setSearchText={searchTextUpdate} favoritesArray={favoritesArray} searchText={searchText} submitSearch={submitSearch} comicClickHandler={comicClickHandler} showHearts={false} dataLoading={dataLoading} />
      {!dataLoading && (!authStatus.isAuthed || authStatus.authPending) && (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text size='L'>
            You must sign in to favorite comics.
          </Text>
        </View>
      )}
      {!dataLoading && authStatus.isAuthed && !authStatus.authPending && filteredStripData.length === 0 && (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text size='L'>
            {searchText === '' ? 
              'You haven\'t favorited any comics yet! Press the Heart on any comic to track it here.'
            : 'No favorited comics match those search terms'
            }
          </Text>
        </View>
      )}
    </View>
  );
};

export default FavoritesScreen;
