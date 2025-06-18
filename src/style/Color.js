const LightColor = {
  light: 'light',
  backgroundColor: '#FFFFFF',
  textColor: '#212121',
  textRevertColor: '#FFFFFF',
  btnColor3: '#EEEEEE',
  dark3: '#FFEDF0',
  iconColor: '#9E9E9E',
  bColor: '#EEEEEE',
  imagebg:'rgba(64,170,84,0.1)',
  btnColor1: '#1F222A',
  inputcolor:'#8B8B97',
  inputbg:'#F7F7F7',  
  inputBg: '#1F222A',
  inputborder:'#E1E1E1',
  borderColor:'#ECECEC'
};

const DarkColor = {
  dark: 'dark',
  backgroundColor: '#181A20',
  textColor: '#16162E',
  textRevertColor: '#212121',
  btnColor3: '#1F222A',
  dark3: '#35383F',
  iconColor: '#616161',
  bColor: '#35383F',
  imagebg:'rgba(64,170,84,0.1)',
  btnColor1: '#1F222A',
  inputcolor:'#8B8B97',
  inputbg:'#F0F0F0',
  inputborder:'#E1E1E1',
  borderColor:'#ECECEC'

};

// Common colors
export const commonColor = {
  white: '#F7F7F7',
  black: '#000000',
  grayScale1: '#F5F5F5',
  grayScale3: '#E0E0E0',
  grayScale4: '#BDBDBD',
  grayScale5: '#9E9E9E',
  grayScale7: '#616161',
  placeHolderColor: '#000F',
   borderColor:'#ECECEC',
  tranparent: '#00000000',
  darkBg: '#181A20',
  green:'#40AA54',
  lightGray: '#7575751F',
  orange: '#DD4B39',
  blue: '#7210FF',
  gray: '#35383F99',
  yellow: '#FFD300',
  darkColor: '#1F222A',
   textColor: '#16162E',
  inputback:'#FFFFFF',
   
};

export const colors = {
  light: {
    ...LightColor,
    ...commonColor,
  },

  dark: {
    ...DarkColor,
    ...commonColor,
  },
};
