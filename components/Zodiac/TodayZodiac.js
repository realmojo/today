import React from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {Layout, Text, Spinner} from '@ui-kitten/components';
import {Admob} from '../Admob';
import {dataStore} from '../../stores/data';
import moment from 'moment';

const TodayZodiac = ({items}) => {
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
            {moment().format('YYYY년 MM월 DD일')}
          </Text>
          <Text category="h5">{items && items.title} 오늘 운세</Text>
        </View>
        <Text style={{lineHeight: 24}}>{items && items.fortuneText}</Text>
        {items &&
          items.fortune.map((item, index) => (
            <React.Fragment key={index}>
              <Text category="h6" style={{color: '#555', marginTop: 10}}>
                {item.year}년 운세
              </Text>
              <Text style={{lineHeight: 24}}>{item.text}</Text>
            </React.Fragment>
          ))}
      </ScrollView>
      <Admob />
    </Layout>
  );
};

export {TodayZodiac};
