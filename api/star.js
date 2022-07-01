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
    fortuneText: '',
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

const getStarData = async value => {
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

  return data;
};

export {getStarData};
