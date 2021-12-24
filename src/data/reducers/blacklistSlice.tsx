import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Types */
import type { AppState } from '../store';
import type {
  TrackType,
} from '../types/SpotifyAPITypes';

export type StateType = {
  tracks: Array<string>,
};

const initialState: StateType = {
  tracks: [],
};

// Slice
export const blacklistSlice = createSlice({
  name: 'blacklist',
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<TrackType>) => {
      if (!state.tracks.includes(action.payload.id)){
        state.tracks.push(action.payload.id);
      }
    },
  },
});

// Actions
export const {
  addTrack,
} = blacklistSlice.actions;

// Selectors
export const getBlacklistTracks = (state: AppState) =>
  state.blacklist.tracks;

// Reducer
const blacklistReducer = blacklistSlice.reducer;
export default blacklistReducer;
