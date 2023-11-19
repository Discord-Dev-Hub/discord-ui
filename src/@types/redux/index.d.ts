import { AppDispatch, RootState } from '@discord-ui/store/store';

import 'react-redux';

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}

  declare const useDispatch: () => AppDispatch;

  declare const useSelector: <TState = DefaultRootState, Selected = unknown>(
    selector: (state: TState) => Selected,
    equalityFn?: EqualityFn<Selected> | undefined,
  ) => Selected;

  export = { useDispatch, useSelector };
}
