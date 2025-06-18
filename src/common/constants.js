//Library import
import {Dimensions, Platform, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';


export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? (iPhoneX ? 44 : 22) : StatusBar.currentHeight;
export const screenHeight = Dimensions.get('window').height - STATUSBAR_HEIGHT;
export const screenWidth = Dimensions.get('window').width;
export const screenFullHeight = Dimensions.get('window').height;
export const isAndroid = Platform.OS === 'ios' ? false : true;

let iPhoneX = screenHeight === 812 ? true : false;


let sampleHeight = 896;
let sampleWidth = 414;

export const isTablet = () => {
  return DeviceInfo.isTablet();
};

//Get Width of Screen
export function getWidth(value) {
  return (value / sampleWidth) * screenWidth;
}

//Get Height of Screen
export function getHeight(value) {
  return (value / sampleHeight) * screenHeight;
}

const scale = size => (screenWidth / sampleWidth) * size;
export function moderateScale(size, factor = 0.5) {
  return size + (scale(size) - size) * factor;
}

export const iosReelHeight = screenFullHeight - getHeight(100);
export const androidReelHeight = screenFullHeight - getHeight(70);