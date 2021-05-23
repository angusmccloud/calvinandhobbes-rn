import AsyncStorage from '@react-native-async-storage/async-storage';

const getLastReadIndex = async (): Promise<number> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@lastReadIndex');
    if (jsonValue !== null) {
      const parsed = JSON.parse(jsonValue);
      return Number(parsed);
    }
    return 0;
  } catch (e) {
    console.log('-- Error fetching Last Read Index --', e);
    return 0;
  }
};

export default getLastReadIndex;
