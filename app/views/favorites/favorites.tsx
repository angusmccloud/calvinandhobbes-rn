import React, {useState} from 'react';
import { SafeAreaView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { NavStackFavoritesParamList, iStrip } from 'models';
import { ActivityIndicator } from 'components';
import { StripList } from 'containers';
import { Styles } from 'styles';
import { GetFavorites, GetStripDetails } from  'services';

type NavProps = StackScreenProps<NavStackFavoritesParamList, 'Favorites'>;

const FavoritesScreen = ({ route, navigation }: NavProps): React.ReactElement => {
  const emptyStrips: iStrip[] = [];
  const emptyArray: any[] = [];
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

  const loadData = async () => {
    setDataLoading(true);
    setSearchText('');
    const stripsPromise = GetStripDetails();
    const favoritesPromise = GetFavorites();
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
      {dataLoading && (
        <ActivityIndicator size={40} />
      )}
      {!dataLoading && (
        <StripList stripData={filteredStripData} setSearchText={searchTextUpdate} favoritesArray={favoritesArray} searchText={searchText} submitSearch={submitSearch} comicClickHandler={comicClickHandler} showHearts={false} />
      )}
    </View>
  );
};

export default FavoritesScreen;
