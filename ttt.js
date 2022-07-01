const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async () => {
  try {
    return await axios.get(
      'https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&qvt=0&query=%EC%A5%90%EB%9D%A0%20%EC%9A%B4%EC%84%B8',
    );
    // return await axios.get('https://www.yna.co.kr/sports/all');
  } catch (e) {
    console.log(e);
  }
};

const run = async () => {
  const d = await getHtml();
  // console.log(d);
  const $ = cheerio.load(d.data);
  const a = $('._cs_fortune_text');
  for (let i of a) {
    console.log($(i).text());
  }

  const b = $('._cs_fortune_list > dt');
  for (let i of b) {
    console.log($(i).text());
  }

  const c = $('._cs_fortune_list > dd');
  for (let i of c) {
    console.log($(i).text());
  }
  // console.log($('._cs_fortune_text').text());
  // console.log($.find('._cs_fortune_text').text());
};

run();
