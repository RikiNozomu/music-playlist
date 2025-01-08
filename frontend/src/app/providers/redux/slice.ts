import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface PlayerMusicState {
  playNow: number;
  list: string[];
}

// Define the initial state using that type
const initialState: PlayerMusicState = {
  playNow: -1,
  list: [],
};

const playerMusicSlice = createSlice({
  name: "PlayerMusic",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addAndPlay: (state, action: PayloadAction<PlayerMusicState>) => {
      state = action.payload;
    },
    next: (state) => {
      state.playNow =
        state.playNow + 1 >= state.list.length ? 0 : state.playNow + 1;
    },
    previous: (state) => {
      state.playNow =
        state.playNow - 1 < 0 ? state.list.length - 1 : state.playNow - 1;
    },
  },
});

export const { addAndPlay, next, previous } = playerMusicSlice.actions;
export default playerMusicSlice.reducer;
