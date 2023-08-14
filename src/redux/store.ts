import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const createStore = () => {
  return configureStore({
    reducer: {
      //   dex: dexReducer,
      //   earn: earnReducer,
      //   wallet: walletReducer,
      //   lp: lpStakingReducer,
      //   toast: toastReducer,
    },
  });
};
export let store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
