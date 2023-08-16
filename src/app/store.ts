// Copyright (c) Fewcha. All rights reserved.

import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import toastReducer from "../components/toast/toastReducer";

const createStore = () => {
  return configureStore({
    reducer: {
      toast: toastReducer,
    },
  });
};

export let store = createStore();

export const refreshStore = () => {
  store = createStore();
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type StoreType = typeof store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
