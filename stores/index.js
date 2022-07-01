import {loginStore} from './login';
import {dataStore} from './data';

const useStore = () => {
  return {loginStore, dataStore};
};

export default useStore;
