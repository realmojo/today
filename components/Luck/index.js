import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Layout, Tab, TabView} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import {Admob} from '../Admob';
import {dataStore} from '../../stores/data';
import {TodayLuck} from './TodayLuck';
import {TomorrowLuck} from './TomorrowLuck';
import {MonthLuck} from './MonthLuck';

const Luck = observer(() => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Layout style={styles.container} level="2">
      <View style={styles.viewWrap}>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
        >
          <Tab title="오늘 운세" style={{height: 50}}>
            <TodayLuck items={dataStore.day} />
          </Tab>
          <Tab title="내일 운세">
            <TomorrowLuck items={dataStore.tomorrow} />
          </Tab>
          <Tab title="이달 운세">
            <MonthLuck items={dataStore.month} />
          </Tab>
        </TabView>
      </View>
      <Admob />
    </Layout>
  );
});

const styles = StyleSheet.create({
  titleContainer: {
    padding: 20,
  },
  container: {
    height: '100%',
  },
  viewWrap: {flex: 1},
  card: {
    marginBottom: 20,
  },
  cardDescription: {
    lineHeight: 24,
  },
  cardDate: {
    marginTop: 10,
    textAlign: 'right',
  },
});

export {Luck};
