import axios from 'axios';
import {
  getGenderData,
  getBirthData,
  getSolarCalData,
  getTimeData,
} from './login';

const url =
  'https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver?_callback=window.__jindo2_callback._fortune_my_0';
const getLuckData = async () => {
  const gender = await getGenderData();
  const birth = await getBirthData();
  const solarCal = await getSolarCalData();
  const time = await getTimeData();
  const items = await axios.get(
    `${url}&gender=${gender}&birth=${birth}&solarCal=${solarCal}&time=${time}`,
  );
  if (items.data) {
    const result = items.data
      .replace('window.__jindo2_callback._fortune_my_0(', '')
      .replace(');', '')
      .replace(/resultMSG/gi, '"resultMSG"')
      .replace(/result: {/gi, '"result": {')
      .replace(/day/gi, '"day"')
      .replace(/title/gi, '"title"')
      .replace(/date/gi, '"date"')
      .replace(/content/gi, '"content"')
      .replace(/tomorrow/gi, '"tomorrow"')
      .replace(/month/gi, '"month"')
      .replace(/userData/gi, '"userData"')
      .replace(/year/gi, '"year"')
      .replace(/constellation/gi, '"constellation"');

    return JSON.parse(result);
  }
  return {result: ''};
};

export {getLuckData};
