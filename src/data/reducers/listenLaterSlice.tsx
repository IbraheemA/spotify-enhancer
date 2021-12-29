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
export const listenLaterSlice = createSlice({
  name: 'listenLater',
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<TrackType>) => {
      if (!state.tracks.includes(action.payload.id)){
        state.tracks.push(action.payload.id);
      }
    },
    removeTrack: (state, action: PayloadAction<TrackType>) => {
      const index = state.tracks.indexOf(action.payload.id);
      if (index !== -1) {
        state.tracks.splice(index, 1);
      }
    },
  },
});

// Actions
export const {
  addTrack,
  removeTrack,
} = listenLaterSlice.actions;

// Selectors
export const getListenLaterTracks = (state: AppState) =>
  state.listenLater.tracks;

// Reducer
const listenLaterReducer = listenLaterSlice.reducer;
export default listenLaterReducer;
