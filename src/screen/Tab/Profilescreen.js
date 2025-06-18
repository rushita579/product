//Librey import
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

//Local import
import {moderateScale} from '@common/constants';
import {colors} from '@style/Color';
import GText from '@components/common/GText';
import {styles} from '@style/index';
import {
  Delivery,
  DeliveryTruck,
  Gift,
  Logout,
  Notificaion,
  Payment,
  Profile,
  Right_arrow,
  Setting,
} from '@assets/svg';
import {StackNav} from '@navigation/NavigationKeys';
import {removeAsyncstorageData} from '@utils/helpers';
import {logoutuser} from '@redux/slice/userSlice';
import { useNavigation } from '@react-navigation/native';

export default function Profilescreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.theme);
  const user = useSelector(state => state.user.user);

  const localStyle = getLocalStyle(theme);
  
  const onpressLogout = async () => {
    await removeAsyncstorageData('userCredentials');
    dispatch(logoutuser());
    navigation.replace(StackNav.Login);
  };
  const onpressProfile = () => {
      navigation.navigate(StackNav.ProfileDetail);
  };

  return (
    <View>
      <View>
        <ImageBackground
          source={require('@assets/image/profile_background.png')}
          style={localStyle.profile_bg}>
          <View>
            <GText
              style={localStyle.profile_text}
              type={'b18'}
              align={'center'}>
              Profile
            </GText>
          </View>
          <View style={localStyle.user_profilebox}>
            <View>
              <Image
                source={require('@assets/image/user.png')}
                style={localStyle.profile_user}
              />
            </View>
            <View style={[styles.ml10, styles.justifyCenter]}>
              <GText color={colors[theme].white} type={'b18'}>
                {user.name}
              </GText>
              <GText color={colors[theme].white} type={'r14'}>
                ID: {user.id}
              </GText>
            </View>
          </View>
          <View>
            <View style={localStyle.profile_item}>
              <Headerbutton title={`My All \nOrder`} icon={<DeliveryTruck />} />
              <Headerbutton title={`Offer & \nPromos`} icon={<Gift />} />
              <Headerbutton title={`Delivery \n Address`} icon={<Delivery />} />
            </View>
          </View>
        </ImageBackground>
      </View>
      <View>
        <View style={localStyle.contact_box}>
          <TouchableOpacity  onPress={onpressProfile}>
            <Contactinformation
              icon={<Profile />}
              title={' My Profile'}
              Right_icon={<Right_arrow />}
            />
          </TouchableOpacity>
          <Contactinformation
            icon={<Notificaion />}
            title={' Notificaion'}
            Right_icon={<Right_arrow />}
          />
          <Contactinformation
            icon={<Setting />}
            title={' Setting'}
            Right_icon={<Right_arrow />}
          />
          <Contactinformation
            icon={<Payment />}
            title={'Payment'}
            Right_icon={<Right_arrow />}
          />
          <TouchableOpacity onPress={onpressLogout}>
            <Contactinformation
              icon={<Logout />}
              title={' Logout'}
              Right_icon={<Right_arrow />}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Headerbutton = ({title, icon}) => {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  return (
    <View>
      {icon && icon}
      <GText type={'m12'} align={'center'} style={styles.mt10}>
        {title}
      </GText>
    </View>
  );
};

const Contactinformation = ({icon, title, Right_icon}) => {
  const theme = useSelector(state => state.theme.theme);
  const localStyle = getLocalStyle(theme);

  return (
    <View style={localStyle.contact_item}>
      <View style={localStyle.contect_icontext}>
        {icon && icon}
        <GText style={localStyle.contact_text} type={'m16'}>
          {title}
        </GText>
      </View>
      <View style={localStyle.Right_arrow}>{Right_icon && Right_icon}</View>
    </View>
  );
};

const getLocalStyle = theme =>
  StyleSheet.create({
    profile_bg: {
      width: moderateScale(415),
      height: moderateScale(300),
    },
    profile_item: {
      ...styles.flexRow,
      ...styles.justifyEvenly,
      ...styles.itemsCenter,
      ...styles.container,
      backgroundColor: colors[theme].white,
      width: moderateScale(355),
      height: moderateScale(130),
      gap: moderateScale(25),
      borderRadius: moderateScale(15),
      top: moderateScale(120),
      position: 'absolute',
    },
    profileitem_text: {
      color: colors[theme].textColor,
    },
    profile_user: {
      width: moderateScale(90),
      height: moderateScale(90),
    },
    user_profilebox: {
      ...styles.flexRow,
      top: moderateScale(80),
      left: moderateScale(40),
    },
    profile_text: {
      color: colors[theme].white,
      top: moderateScale(50),
    },
    contact_item: {
      ...styles.flexRow,
      ...styles.justifyBetween,
      height: moderateScale(45),
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].borderColor,
      ...styles.mb10,
    },
    contact_box: {
      ...styles.mt100,
      ...styles.p20,
      ...styles.container,
      backgroundColor: colors[theme].white,
      borderRadius: moderateScale(15),
    },
    contect_icontext: {
      ...styles.flexRow,
    },
    contact_text: {
      color: colors[theme].textColor,
      ...styles.ml30,
    },
  });
