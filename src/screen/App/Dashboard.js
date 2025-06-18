//Library import
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Local import
import GSafeAreaView from '@components/common/GSafeAreaView';
import {TabRoute} from '@navigation/NavigationRoutes';
import {TabNav} from '@navigation/NavigationKeys';
import GText from '@components/common/GText';
import {styles} from '@style/index';
import {Cartblack, Cartgreenmenu, HomeBlack, Homegreen, Menublack, Menugreen, Profileblack, Profilegreen, Saveblack, Savegreen} from '@assets/svg';

export default function Dashboard() {
  const Tab = createBottomTabNavigator();

  return (
    <GSafeAreaView>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name={TabNav.Home}
          component={TabRoute.Homescreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>{focused ? <Homegreen /> : <HomeBlack />}</View>
            ),
          }}
        />
        <Tab.Screen
          name={TabNav.Menu}
          component={TabRoute.Menuscreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>{focused ? <Menugreen /> : <Menublack />}</View>
            ),
          }}
        />
        <Tab.Screen
          name={TabNav.Cart}
          component={TabRoute.Cartscreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>{focused ? <Cartgreenmenu /> : <Cartblack />}</View>
            ),
          }}
        />
        <Tab.Screen
          name={TabNav.Save}
          component={TabRoute.Savescreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>{focused ? <Savegreen/> : <Saveblack/>}</View>
            ),
          }}
        />
        <Tab.Screen
          name={TabNav.Profile}
          component={TabRoute.Profilescreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>{focused ? <Profilegreen /> : <Profileblack />}</View>
            ),
          }}
        />
      </Tab.Navigator>
    </GSafeAreaView>
  );
}

const localStyle = StyleSheet.create({});
