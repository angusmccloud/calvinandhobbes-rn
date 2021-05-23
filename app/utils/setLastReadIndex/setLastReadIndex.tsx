import AsyncStorage from '@react-native-async-storage/async-storage';

const setLastReadIndex = async (
  lastIndex: number,
): Promise<void> => {
  try {
    await AsyncStorage.setItem('@lastReadIndex', lastIndex.toString());
  } catch (e) {
    console.log('-- Error Saving Last Read Index --', e);
  }
};

export default setLastReadIndex;
