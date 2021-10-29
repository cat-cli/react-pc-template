import { dvaModel, BaseModel } from 'dva-model-enhance';
import type { StoreState } from 'umi';

export type GlobalState = {
  avatar: string;
  name: string;
  id_token: string;
  loading: boolean;
  selectKeys: string[];
  navList: {
    key: string;
    name: string;
    icon: JSX.Element;
    link: string;
  }[];
};

@dvaModel<GlobalState>({
  namespace: 'global',
  state: {
    avatar: '',
    name: '',
    id_token: '',
    loading: false,
    selectKeys: [],
    navList: [],
  },
})
class Index extends BaseModel<GlobalState, StoreState> {}
export default Index;
