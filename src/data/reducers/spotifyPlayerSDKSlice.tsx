import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Types */
import type { AppState } from '../store';
import type {
  StateType,
} from '../types/SpotifyPlayerSDKTypes';

const initialState: StateType = {};

// Slice
export const spotifyPlayerSDKSlice = createSlice({
  name: 'spotifyPlayerSDK',
  initialState,
  reducers: {
    setInstance: (state, action: PayloadAction<Spotify.Player>) => {
      state.instance = action.payload;
    },
    setDeviceID: (state, action: PayloadAction<string>) => {
      state.deviceID = action.payload;
    },
    setPlaybackState: (state, action: PayloadAction<Spotify.PlaybackState>) => {
      state.playbackState = action.payload;
    },
  },
});

// Actions
export const {
  setInstance,
  setDeviceID,
  setPlaybackState,
} = spotifyPlayerSDKSlice.actions;

// Selectors
export const getPlayerInstance = (state: AppState) =>
  state.spotifyPlayerSDK.instance;
export const getIsPlayerReady = (state: AppState) =>
  !!state.spotifyPlayerSDK.deviceID;
export const getDeviceID = (state: AppState) =>
  state.spotifyPlayerSDK.deviceID;
export const getPlaybackState = (state: AppState) =>
  state.spotifyPlayerSDK.playbackState;

// Reducer
const spotifyPlayerSDKReducer = spotifyPlayerSDKSlice.reducer;

export default spotifyPlayerSDKReducer;
