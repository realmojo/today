import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Layout, Card, Text} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import {Admob} from './Admob';
import {luckStore} from '../stores/luck';
import {
  convertDate,
  cardHeader,
  convertKeyword,
  convertDescription,
} from '../utils';

const TomorrowLuck = observer(() => {
  return (
    <Layout style={styles.container} level="2">
      <View style={styles.viewWrap}>
        <ScrollView>
          <Text category="h5">
            {luckStore.tomorrow && luckStore.tomorrow.title}
          </Text>
          <Text style={styles.cardDate}>
            {luckStore.tomorrow && convertDate(luckStore.tomorrow.date, false)}
          </Text>
          <Card style={styles.card} header={() => cardHeader('오늘의 키워드')}>
            {luckStore.tomorrow &&
              convertKeyword(luckStore.tomorrow.content[0].keyword)}
          </Card>
          {luckStore.tomorrow &&
            luckStore.tomorrow.content.map((item, index) => {
              if (item.desc) {
                return (
                  <Card
                    key={index}
                    style={styles.card}
                    header={() => cardHeader(item.name)}>
                    <Text style={styles.cardDescription}>
                      {convertDescription(item.desc)}
                    </Text>
                  </Card>
                );
              }
            })}
        </ScrollView>
      </View>

      <Admob />
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  viewWrap: {flex: 1, padding: 20},
  card: {
    marginBottom: 20,
  },
  cardDescription: {
    lineHeight: 24,
  },
  cardDate: {
    marginVertical: 10,
    textAlign: 'right',
  },
  icon: {
    marginRight: 20,
  },
});

export {TomorrowLuck};
