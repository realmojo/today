import React, {useState, useRef} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import {
  Text,
  Radio,
  Input,
  Button,
  Layout,
  Select,
  IndexPath,
  SelectItem,
  RadioGroup,
} from '@ui-kitten/components';
import {setData} from '../api/login';
import {loginStore} from '../stores/login';
import {dataStore} from '../stores/data';

const solarCals = ['양력', '음력'];

const times = [
  '子(자) 23:30 ~ 01:29',
  '丑(축) 01:30 ~ 03:29',
  '寅(인) 03:30 ~ 05:29',
  '卯(묘) 05:30 ~ 07:29',
  '辰(진) 07:30 ~ 09:29',
  '巳(사) 09:30 ~ 11:29',
  '午(오) 11:30 ~ 13:29',
  '未(미) 13:30 ~ 15:29',
  '申(신) 15:30 ~ 17:29',
  '酉(유) 17:30 ~ 19:29',
  '戌(술) 19:30 ~ 21:29',
  '亥(해) 21:30 ~ 23:29',
];

export const Login = () => {
  const inputRef = useRef();
  const [gender, setGender] = useState('m'); // m, f
  const [birth, setBirth] = useState(''); // 19940128
  const [solarCal, setSolarCal] = useState('solar'); // solar, lunarGeneral
  const [viewSolarCal, setViewSolarCal] = useState(0);
  const [time, setTime] = useState(0); // 0 ~ 11
  const [selectedGender, setSelectedGender] = useState(0); // male: 'm', female: 'f'
  const [selectedCalendar, setSelectedCalendar] = useState(new IndexPath(0)); // male: 'm', female: 'f'
  const [selectedTime, setSelectedTime] = useState(new IndexPath(0)); // male: 'm', female: 'f'

  const doSelectedGender = value => {
    setSelectedGender(value);
    if (value === 1) {
      setGender('f');
    } else {
      setGender('m');
    }
  };

  const doSelectedCalendar = index => {
    if (index.row === 0) {
      setSolarCal('solar');
    } else if (index.row === 1) {
      setSolarCal('lunarGeneral');
    }
    setViewSolarCal(index.row);
    setSelectedCalendar(index);
  };

  const doSelectedTime = index => {
    setTime(index.row);
    setSelectedTime(index);
  };

  const doLogin = async () => {
    if (birth === '') {
      inputRef.current.focus();
    }
    if (birth.length !== 8) {
      ToastAndroid.show('8자리로 입력해주세요', ToastAndroid.SHORT);
      inputRef.current.focus();
    }
    if (gender && birth && birth.length === 8 && solarCal && time !== '') {
      await setData({gender, birth, solarCal, time});
      await dataStore.setData();
      loginStore.setIslogin(true);
    }
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.buttonWrap}>
        <Text style={styles.title} category="h1">
          오늘의 운세
        </Text>
        <View style={styles.inputWrap}>
          <View style={styles.divider}>
            <Text style={styles.text}>성별을 선택해 주세요.</Text>
            <RadioGroup
              style={styles.radioGroupWrap}
              selectedIndex={selectedGender}
              onChange={index => doSelectedGender(index)}
            >
              <Radio status="info">남자</Radio>
              <Radio status="info">여자</Radio>
            </RadioGroup>
          </View>
          <View style={styles.divider}>
            <Text style={styles.text}>생년월일 8자리를 입력해 주세요.</Text>
            <Input
              style={styles.input}
              ref={inputRef}
              size="medium"
              placeholder="19940128"
              value={birth}
              keyboardType="numeric"
              onChangeText={setBirth}
            />
          </View>
          <View style={styles.divider}>
            <Text style={styles.text}>양/음력을 선택해 주세요.</Text>
            <Select
              selectedIndex={selectedCalendar}
              placeholder="선택해 주세요"
              value={solarCals[viewSolarCal]}
              onSelect={index => doSelectedCalendar(index)}
            >
              <SelectItem title="양력" />
              <SelectItem title="음력" />
            </Select>
          </View>
          <View style={styles.divider}>
            <Text style={styles.text}>태어난 시간을 선택해주세요.</Text>
            <Select
              placeholder="선택해 주세요"
              selectedIndex={selectedTime}
              value={times[time]}
              onSelect={index => doSelectedTime(index)}
            >
              {times.map((item, index) => (
                <SelectItem key={index} title={item} />
              ))}
            </Select>
          </View>
          <Button
            style={styles.button}
            loading
            size="large"
            status="info"
            onPress={() => doLogin()}
          >
            시작하기
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#3ed4be',
  },
  description: {
    marginTop: 20,
    fontSize: 12,
    color: '#97690f',
    width: 200,
    textAlign: 'center',
  },
  radioGroupWrap: {
    flexDirection: 'row',
  },
  divider: {
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    marginTop: -40,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 4,
    fontSize: 13,
  },
  buttonWrap: {
    flex: 1,
    marginTop: 20,
    width: 240,
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
  },
});
