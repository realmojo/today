import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Layout, Divider, ListItem} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import {Admob} from '../components';
// import {removeData} from '../api';

export const Setting = observer(({navigation}) => {
  const doEdit = () => {
    navigation.push('edit');
  };

  // const doLogout = async () => {
  //   await removeData();
  // };
  return (
    <Layout level="2" style={{height: '100%'}}>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.logoWrap}>
            <Image
              style={styles.avatar}
              source={require('../assets/images/logo2.png')}
            />
            <Text category="h1" style={{color: 'white'}}>
              오늘의 운세
            </Text>
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
            title="제거"
            onPress={() => doLogout()}
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
    backgroundColor: '#1abc9c',
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
