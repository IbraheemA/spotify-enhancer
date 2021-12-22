import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Types */
import type { AppState } from '../store';
import type {
  CurrentlyPlayingTrackType,
  StateType,
} from '../types/SpotifyAPITypes';

const initialState: StateType = {};

// Slice
export const spotifyAPISlice = createSlice({
  name: 'spotifyAPI',
  initialState,
  reducers: {
    setCurrentlyPlayingTrack: (state, action: PayloadAction<CurrentlyPlayingTrackType>) => {
      state.currentlyPlayingTrack = action.payload;
    },
  },
});

// Actions
export const {
  setCurrentlyPlayingTrack,
} = spotifyAPISlice.actions;

// Selectors
export const getCurrentlyPlayingTrack = (state: AppState) =>
  state.spotifyAPI.currentlyPlayingTrack;

// Reducer
const spotifyAPIReducer = spotifyAPISlice.reducer;

export default spotifyAPIReducer;
