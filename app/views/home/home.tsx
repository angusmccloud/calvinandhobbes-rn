import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import * as Keychain from 'react-native-keychain';
import { Auth } from 'aws-amplify';
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

  useEffect(() => {
    const key = async (): Promise<void> => {
      try {
        const credentials = await Keychain.getInternetCredentials('auth');
        console.log('---- credentials ----', credentials);

        if (credentials) {
          const { username, password } = credentials;
          const user = await Auth.signIn(username, password);
          console.log('-- User already logged in, forward them!');
          const authedUserObject = {
            id: user.attributes.sub,
            fullName: user.attributes.name,
            signInTokens: {
              accessToken: user.signInUserSession.accessToken.jwtToken,
              refreshToken: user.signInUserSession.refreshToken.token,
              idToken: user.signInUserSession.idToken.jwtToken,
              accessTokenExp: user.signInUserSession.accessToken.payload.exp,
            },
          };
          console.log("--- userObject ---", authedUserObject);

          
          // const resetAction = StackNavigationOptions.reset({
          //   index: 0,
          //   actions: [StackNavigationOptions.navigate({ routeName: 'Home' })],
          // });
          // navigation.dispatch(resetAction);
          // navigation.navigate('Home');
        } else {
          console.log('-- No Existing Credentials --');
        }
      } catch (err) {
        console.log('error', err); // eslint-disable-line
      }
    }
    key()
  }, []) // eslint-disable-line

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authInProgress, setAuthInProgress] = useState(false);
  const [error, setError] = useState('');





  return (
    <View style={Styles.body}>
      <StripList stripData={filteredStripData} setSearchText={setSearchText} searchText={searchText} submitSearch={submitSearch} comicClickHandler={comicClickHandler} />
    </View>
  );
};

export default HomeScreen;
