import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Text,
  Input,
  Layout,
  Button,
  Divider,
  ListItem,
} from '@ui-kitten/components';
import useStore from '../stores';
import {observer} from 'mobx-react';
import {Admob} from '../components';

export const Setting = observer(({navigation}) => {
  const doEdit = () => {
    navigation.push('edit');
  };
  return (
    <Layout level="2" style={{height: '100%'}}>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.logoWrap}>
            <Image
              style={styles.avatar}
              source={require('../assets/images/logo.png')}
            />
            <Text category="h1">오늘의 운세</Text>
          </View>
        </View>
        <Layout level="2">
          <ListItem
            style={styles.listItem}
            title="설정 변경"
            onPress={() => doEdit()}
          />
          <Divider />
          {/* <ListItem
            style={styles.listItem}
            title="피드백을 주세요"
            onPress={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.f5game.gomap',
              )
            }
          />
          <Divider /> */}
        </Layout>
      </View>
      <Admob />
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#36c5a9',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    borderRadius: 90,
    marginTop: 40,
    marginBottom: 20,
    width: 130,
    height: 130,
  },
  listItem: {
    paddingVertical: 20,
  },
  countWrap: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#ffb629',
    paddingVertical: 10,
  },
  countTitle: {
    textAlign: 'center',
  },
  countText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
