import AsyncStorage from '@react-native-async-storage/async-storage';

const setData = async ({gender, birth, solarCal, time}) => {
  try {
    await AsyncStorage.setItem('gender', gender.toString());
    await AsyncStorage.setItem('birth', birth.toString());
    await AsyncStorage.setItem('solarCal', solarCal.toString());
    await AsyncStorage.setItem('time', time.toString());
  } catch (e) {
    console.log(e);
  }
};

const getAllData = async () => {
  const gender = await AsyncStorage.getItem('gender');
  const birth = await AsyncStorage.getItem('birth');
  const solarCal = await AsyncStorage.getItem('solarCal');
  const time = await AsyncStorage.getItem('time');
  return {
    gender,
    birth,
    solarCal,
    time,
  };
};

const getGenderData = async () => {
  const data = await AsyncStorage.getItem('gender');
  return data;
};
const getBirthData = async () => {
  const data = await AsyncStorage.getItem('birth');
  return data;
};
const getSolarCalData = async () => {
  const data = await AsyncStorage.getItem('solarCal');
  return data;
};
const getTimeData = async () => {
  const data = await AsyncStorage.getItem('time');
  return data;
};

export {
  setData,
  getAllData,
  getGenderData,
  getBirthData,
  getSolarCalData,
  getTimeData,
};
