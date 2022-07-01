import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Luck, Zodiac, Star, Setting} from '../components';
const Tab = createMaterialTopTabNavigator();

export const BottomTab = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Luck"
        screenOptions={{
          tabBarActiveTintColor: '#7b7b7b',
          tabBarInactiveTintColor: '#dedede',
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: {focused: true, color: '#aaa'},
          tabBarStyle: {backgroundColor: 'white'},
          tabBarPressColor: '#dedede',
        }}
        tabBarPosition="bottom"
      >
        <Tab.Screen
          name="Luck"
          component={Luck}
          options={{
            lazy: true,
            tabBarLabel: '오늘 운세',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="comma" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Zodiac"
          component={Zodiac}
          options={{
            lazy: true,
            lazyPreloadDistance: 1,
            tabBarLabel: '띠별 운세',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="cow" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Star"
          component={Star}
          options={{
            lazy: true,
            lazyPreloadDistance: 1,
            tabBarLabel: '별자리 운세',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="star" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="setting"
          component={Setting}
          options={{
            lazy: true,
            lazyPreloadDistance: 1,
            tabBarLabel: '설정',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
