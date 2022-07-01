import React from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {Layout, Text, Spinner} from '@ui-kitten/components';
import {Admob} from '../Admob';
import {dataStore} from '../../stores/data';
import moment from 'moment';

const MonthStar = ({items}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dataStore.setData();
    setRefreshing(false);
  }, []);
  if (!items) {
    return (
      <Layout level="2" style={{padding: 20}}>
        <Spinner size="small" status="warning" />
      </Layout>
    );
  }
  return (
    <Layout level="2" style={{height: '100%', marginBottom: 20}}>
      <ScrollView
        style={{flex: 1, paddingHorizontal: 20, marginBottom: 120}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{marginVertical: 10}}>
          <Text style={{color: '#bbb', fontSize: 13}}>
            {moment().format('YYYY년 MM월')}
          </Text>
          <Text category="h5">{items && items.title} 이달 운세</Text>
        </View>
        <Text style={{lineHeight: 24}}>{items && items.fortuneText}</Text>
      </ScrollView>
      <Admob />
    </Layout>
  );
};

export {MonthStar};
