import {observable, runInAction} from 'mobx';
import {getLuckData, getZodiacData, getStarData} from '../api';

const dataStore = observable({
  day: {},
  tomorrow: {},
  month: {},
  zodiacDay: null,
  zodiacTomorrow: null,
  zodiacWeek: null,
  zodiacMonth: null,
  starDay: null,
  starTomorrow: null,
  starWeek: null,
  starMonth: null,
  userData: {},
  async setData() {
    const data = await getLuckData();
    runInAction(() => {
      this.day = data.result.day;
      this.tomorrow = data.result.tomorrow;
      this.month = data.result.month;
      this.userData = data.result.userData;
    });
    setTimeout(async () => {
      const zodiacData = await getZodiacData(data.result.userData.year);
      runInAction(() => {
        this.zodiacDay = zodiacData.today;
        this.zodiacTomorrow = zodiacData.tomorrow;
        this.zodiacWeek = zodiacData.week;
        this.zodiacMonth = zodiacData.month;
      });
    }, 1);
    setTimeout(async () => {
      const starData = await getStarData(data.result.userData.constellation);
      runInAction(() => {
        this.starDay = starData.today;
        this.starTomorrow = starData.tomorrow;
        this.starWeek = starData.week;
        this.starMonth = starData.month;
      });
    }, 1);
  },
});

export {dataStore};
