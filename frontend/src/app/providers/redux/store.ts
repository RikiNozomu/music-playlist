import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import playerMusicSlice from "./slice";

export const store = configureStore({
    reducer: {
        playerMusic : playerMusicSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();