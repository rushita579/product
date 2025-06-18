import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

// Check App Platform
const checkPlatform = () => {
  if (Platform.OS === 'android') {
    return 'android';
  } else {
    return 'ios';
  }
};

// Device Type
const getDeviceType = () => {
  if (checkPlatform() === 'ios') {
    return 2;
  } else {
    return 1;
  }
};

// Set Async Storage Data
const setAsyncStorageData = async (key, value) => {
  const stringData = JSON.stringify(value);
  await AsyncStorage.setItem(key, stringData);
};

// get Async Storage Data

const getAsyncStorageData = async key => {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data);
};


const removeAsyncstorageData = async key => {
  const RemoveData = await AsyncStorage.removeItem(key);
}

// Debounce
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export {
  getAsyncStorageData,
  setAsyncStorageData,
  getDeviceType,
  checkPlatform,
  debounce,
  removeAsyncstorageData,
};
