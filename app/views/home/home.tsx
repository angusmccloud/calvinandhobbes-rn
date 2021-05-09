import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StripList } from 'containers';
import { GetStripDetails } from 'services';
import { iStrip, NavStackOneParamList } from 'models';
import { Styles } from 'styles';

type NavProps = StackScreenProps<NavStackOneParamList, 'Home'>;

const HomeScreen = ({ route, navigation }: NavProps): React.ReactElement => {
  const emptyStrips: iStrip[] = [];
  const [stripData, setStripData] = useState(emptyStrips);
  const [filteredStripData, setFilteredStripData] = useState(emptyStrips);
  const [searchText, setSearchText] = useState('');
  

  useEffect(() => {
    const baseData = GetStripDetails();
    setStripData(baseData);
    setFilteredStripData(baseData);
  }, []);

  const submitSearch = () => {
    if(searchText.length > 0) {
      const searchArray = searchText.toLocaleLowerCase().split(' ');
      console.log(searchArray);

      const filtered = stripData.filter((strip: iStrip) => {
        let matches = true;
        for(let i = 0; i < searchArray.length; i++) {
          if(!strip.description.toLowerCase().includes(searchArray[i].toLowerCase())) {
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

  const comicClickHandler = (clickedIndex: number) => {
    navigation.navigate('ComicDetails', {
      stripData: filteredStripData,
      clickedIndex: clickedIndex,
    });
  }

  console.log(new Date(2020, 3, 15));
  const dt: Date = '2020-04-15T04:00:00.000Z';
  console.log(dt);

  return (
    <View style={Styles.body}>
      <StripList stripData={filteredStripData} setSearchText={setSearchText} searchText={searchText} submitSearch={submitSearch} comicClickHandler={comicClickHandler} />
    </View>
  );
};

export default HomeScreen;
