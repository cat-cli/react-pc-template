import { useSelector as reactReduxUseSelector, shallowEqual } from 'dva';
import type { StoreState } from 'umi';

export type Selector<TState, TSelected> = {
  (state: TState): TSelected;
};

const useSelector = <TState extends StoreState, TSelected>(
  selector: Selector<TState, TSelected>,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) => {
  return reactReduxUseSelector<TState, TSelected>(selector, equalityFn || shallowEqual);
};

export default useSelector;
