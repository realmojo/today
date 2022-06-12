import {observable, runInAction} from 'mobx';
import {getLuckData} from '../api';

const luckStore = observable({
  day: {},
  tomorrow: {},
  month: {},
  userData: {},
  async setData() {
    const data = await getLuckData();
    runInAction(() => {
      this.day = data.result.day;
      this.tomorrow = data.result.tomorrow;
      this.month = data.result.month;
      this.userData = data.result.userData;
    });
  },
});

export {luckStore};
