import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Layout, Tab, TabView} from '@ui-kitten/components';
import {observer} from 'mobx-react';
import {Admob} from '../Admob';
import {dataStore} from '../../stores/data';
import {TodayZodiac} from './TodayZodiac';
import {TomorrowZodiac} from './TomorrowZodiac';
import {WeekZodiac} from './WeekZodiac';
import {MonthZodiac} from './MonthZodiac';

const Zodiac = observer(() => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Layout style={styles.container} level="2">
      <View style={styles.viewWrap}>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
        >
          <Tab title="오늘 운세" style={{height: 50}}>
            <TodayZodiac items={dataStore.zodiacDay} />
          </Tab>
          <Tab title="내일 운세">
            <TomorrowZodiac items={dataStore.zodiacTomorrow} />
          </Tab>
          <Tab title="금주 운세">
            <WeekZodiac items={dataStore.zodiacWeek} />
          </Tab>
          <Tab title="이달 운세">
            <MonthZodiac items={dataStore.zodiacMonth} />
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

export {Zodiac};
