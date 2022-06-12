import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TodayLuck, TomorrowLuck, MonthLuck, Setting} from '../components';
const Tab = createMaterialTopTabNavigator();

export const BottomTab = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="todayLuck"
        screenOptions={{
          tabBarActiveTintColor: '#7b7b7b',
          tabBarInactiveTintColor: '#dedede',
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: {focused: true, color: '#aaa'},
          tabBarStyle: {backgroundColor: 'white'},
          tabBarPressColor: '#dedede',
        }}
        tabBarPosition="bottom">
        <Tab.Screen
          name="todayLuck"
          component={TodayLuck}
          options={{
            lazy: true,
            tabBarLabel: '오늘 운세',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="comma" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="tomorrowLuck"
          component={TomorrowLuck}
          options={{
            lazy: true,
            lazyPreloadDistance: 1,
            tabBarLabel: '내일 운세',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="ice-cream"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="monthLuck"
          component={MonthLuck}
          options={{
            lazy: true,
            lazyPreloadDistance: 1,
            tabBarLabel: '이달의 운세',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="heart" color={color} size={26} />
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
