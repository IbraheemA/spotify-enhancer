import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Types */
import type { AppState } from '../store';
import type {
  TrackType,
} from '../types/SpotifyAPITypes';

export type StateType = {
  tracks: Array<TrackType>,
};

const initialState: StateType = {
  tracks: [],
};

// Slice
export const listenLaterSlice = createSlice({
  name: 'listenLater',
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<TrackType>) => {
      state.tracks.push(action.payload);
    },
  },
});

// Actions
export const {
  addTrack,
} = listenLaterSlice.actions;

// Selectors
export const getListenLaterTracks = (state: AppState) =>
  state.listenLater.tracks;

// Reducer
const listenLaterReducer = listenLaterSlice.reducer;
export default listenLaterReducer;
