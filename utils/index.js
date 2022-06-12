import React from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {Text} from '@ui-kitten/components';

export const cardHeader = name => {
  return (
    <View style={styles.cardPadding}>
      <Text category="h6">
        {name === '총운' ? (
          <MaterialCommunityIcons
            className="icon"
            name="comma"
            color="#0984e3"
            size={20}
          />
        ) : name === '애정운' ? (
          <MaterialCommunityIcons
            className="icon"
            name="heart"
            color="#d63031"
            size={20}
          />
        ) : name === '재물운' ? (
          <MaterialCommunityIcons
            className="icon"
            name="bitcoin"
            color="#F7931A"
            size={20}
          />
        ) : name === '직장운' ? (
          <MaterialCommunityIcons
            className="icon"
            name="office-building"
            color="#00b894"
            size={20}
          />
        ) : name === '학업.시험운' ? (
          <MaterialCommunityIcons
            className="icon"
            name="pencil-outline"
            color="#b2bec3"
            size={20}
          />
        ) : name === '오늘의 키워드' || name === '내일의 키워드' ? (
          <MaterialCommunityIcons
            className="icon"
            name="key-outline"
            color="#27ae60"
            size={20}
          />
        ) : (
          ''
        )}
        {name}
      </Text>
    </View>
  );
};

export const convertDescription = value => {
  const split = value.split('.');
  const filter = split.map(item => item.trim());

  const d = filter.join('.\n\n');
  return d;
};

export const convertKeyword = value => {
  try {
    const split = value.split('<b>');
    const word = split[1].split('</b>');
    return (
      <Text
        style={styles.textLink}
        onPress={() =>
          Linking.openURL(
            `https://search.naver.com/search.naver?query=${word[0]
              .replace('“', '')
              .replace('”', '')}`,
          )
        }>
        {word[0].replace('“', '').replace('”', '')}
      </Text>
    );
  } catch {
    return <Text>{value}</Text>;
  }
};

export const convertDate = (value, isTomorrow) => {
  const d = isTomorrow ? moment().add(1, 'days').day() : moment().day();
  const g = ['일', '월', '화', '수', '목', '금', '토'];
  return `${value} ${g[d]}요일`;
};

const styles = StyleSheet.create({
  cardPadding: {
    padding: 20,
  },
  textLink: {
    color: '#2c3e50',
    textDecorationLine: 'underline',
  },
});
