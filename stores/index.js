import {loginStore} from './login';
import {luckStore} from './luck';

const useStore = () => {
  return {loginStore, luckStore};
};

export default useStore;
