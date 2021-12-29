import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Types */
import type { AppState } from '../store';
import type {
  CurrentlyPlayingTrackInfoType, TrackType,
} from '../types/SpotifyAPITypes';
import { addTrack as addBlacklistTrack } from './blacklistSlice';
import { addTrack as addListenLaterTrack} from './listenLaterSlice';

export type StateType = {
  cachedTracks: {[id: string] : TrackType},
  currentlyPlayingTrackInfo?: CurrentlyPlayingTrackInfoType,
};

const initialState: StateType = {
  cachedTracks: {},
};

// Slice
export const spotifyAPISlice = createSlice({
  name: 'spotifyAPI',
  initialState,
  reducers: {
    setCurrentlyPlayingTrackInfo: (state, action: PayloadAction<CurrentlyPlayingTrackInfoType>) => {
      state.currentlyPlayingTrackInfo = action.payload;
    },
    addTrackToCache: (state, action: PayloadAction<TrackType>) => {
      state.cachedTracks[action.payload.id] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBlacklistTrack, (state, action) => {
      state.cachedTracks[action.payload.id] = action.payload;
    })
    builder.addCase(addListenLaterTrack, (state, action) => {
      state.cachedTracks[action.payload.id] = action.payload;
    })
  },
});

// Actions
export const {
  setCurrentlyPlayingTrackInfo,
  addTrackToCache,
} = spotifyAPISlice.actions;

// Selectors
export const getCurrentlyPlayingTrackInfo = (state: AppState) =>
  state.spotifyAPI.currentlyPlayingTrackInfo;
export const getCachedTracks = (state: AppState) =>
  state.spotifyAPI.cachedTracks;

// Reducer
const spotifyAPIReducer = spotifyAPISlice.reducer;

export default spotifyAPIReducer;
