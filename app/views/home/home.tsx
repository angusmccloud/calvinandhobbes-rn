import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { StackScreenProps } from '@react-navigation/stack';
import Masonry from 'react-native-masonry';
import { GetStripDetails } from 'services';
import { iStrip, NavStackOneParamList } from 'models';
import { Text } from 'components';
import { Styles, Colors } from 'styles';

const deviceWidth = Dimensions.get('window').width;

type NavProps = StackScreenProps<NavStackOneParamList, 'Home'>;

const HomeScreen = ({ route, navigation }: NavProps): React.ReactElement => {
  const emptyStrips: iStrip[] = [];
  const [stripData, setStripData] = useState(emptyStrips);

  useEffect(() => {
    setStripData(GetStripDetails());
  }, []);

  const renderImage = (item: iStrip) => {
    return (
      <View
        style={{
          width: deviceWidth / numColumns,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={Styles.comicWrapper}>
          <FastImage
            source={{ uri: item.uri }}
            style={{
              width: imageWidth,
              height:
                (imageWidth / item.dimensions.width) * item.dimensions.height,
            }}
            resizeMode="contain"
          />
        </View>
      </View>

    );
  }

  const numColumns = 3;
  const imageWidth = (deviceWidth * .93) / numColumns;

  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    const blankArray: React.ReactElement[] = [];
    columns.push(blankArray);
  }

  for (let i = 0; i < stripData.length; i++) {
    columns[i % numColumns].push(renderImage(stripData[i]));
  }


  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          {columns.map(column => <View>{column}</View>)} 
          {/* <View>{columns[0]}</View>
          <View>{columns[1]}</View>
          <View>{columns[2]}</View> */}
          {/* <View>{columns[3]}</View> */}
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;