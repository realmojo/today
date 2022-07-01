import axios from 'axios';
import cheerio from 'cheerio';

const getData = async value => {
  try {
    return await axios.get(
      `https://search.naver.com/search.naver?query=${encodeURI(value)}`,
    );
  } catch (e) {
    console.log(e);
  }
};

const emptyObject = () => {
  return {
    title: '',
    fortuneText: '',
    fortune: [
      {year: 0, text: ''},
      {year: 0, text: ''},
      {year: 0, text: ''},
      {year: 0, text: ''},
      {year: 0, text: ''},
    ],
  };
};

const convertFortuneTotalText = (data, key, arr, $) => {
  let count = 0;
  for (const item of arr) {
    switch (count) {
      case 0:
        data.today[key] = $(item).text();
        break;
      case 1:
        data.tomorrow[key] = $(item).text();
        break;
      case 2:
        data.week[key] = $(item).text();
        break;
      case 3:
        data.month[key] = $(item).text();
        break;
    }
    count++;
  }
  return data;
};

const convertYear = (data, firstYear) => {
  const year = Number(firstYear.replace(/[^0-9]/g, ''));
  for (let i = 0; i < 5; i++) {
    data.today.fortune[i].year = year + i * 12;
    data.tomorrow.fortune[i].year = year + i * 12;
    data.week.fortune[i].year = year + i * 12;
  }
};

const convertText = (data, arr, $) => {
  let i = 0;
  for (const item of arr) {
    if (i >= 0 && i < 5) {
      data.today.fortune[i % 5].text = $(item).text();
    } else if (i >= 5 && i < 10) {
      data.tomorrow.fortune[i % 5].text = $(item).text();
    } else if (i >= 10 && i < 15) {
      data.week.fortune[i % 5].text = $(item).text();
    }
    i++;
  }
};

const getZodiacData = async value => {
  const d = await getData(value);
  const $ = cheerio.load(d.data);

  const data = {
    today: emptyObject(),
    tomorrow: emptyObject(),
    week: emptyObject(),
    month: emptyObject(),
  };

  data.today.title = value;
  data.tomorrow.title = value;
  data.week.title = value;
  data.month.title = value;

  const fortuneText = $('._cs_fortune_text');
  convertFortuneTotalText(data, 'fortuneText', fortuneText, $);

  const firstFortuneListYear = $('._cs_fortune_list > dt')[0];
  convertYear(data, $(firstFortuneListYear).text());

  const firstFortuneListText = $('._cs_fortune_list > dd');
  convertText(data, firstFortuneListText, $);

  return data;
};

export {getZodiacData};
