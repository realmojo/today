import React from 'react';
import {StyleSheet, ScrollView, View, RefreshControl} from 'react-native';
import {Layout, Card, Text} from '@ui-kitten/components';
import {cardHeader, convertDescription} from '../../utils';
import {dataStore} from '../../stores/data';
import moment from 'moment';

const MonthLuck = ({items}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dataStore.setData();
    setRefreshing(false);
  }, []);
  return (
    <Layout level="2">
      <View style={styles.titleContainer}>
        <Text style={styles.cardDate}>{moment().format('YYYY년 MM월')}</Text>
        <Text category="h5">{items && items.title}</Text>
      </View>
      <ScrollView
        style={{marginTop: 10, marginBottom: 320}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {items &&
          items.content.map((item, index) => {
            if (item.desc) {
              return (
                <React.Fragment key={index}>
                  {cardHeader(item.name)}
                  <Card style={styles.card}>
                    <Text style={styles.cardDescription}>
                      {convertDescription(item.desc)}
                    </Text>
                  </Card>
                </React.Fragment>
              );
            }
          })}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  card: {
    marginBottom: 20,
  },
  cardDescription: {
    lineHeight: 24,
  },
  cardDate: {
    color: '#bbb',
    fontSize: 13,
  },
});

export {MonthLuck};
