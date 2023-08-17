import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, store} from "../app/store";

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
