import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Types */
import type { AppState } from '../store';
import type {
  StateType,
} from '../types/SpotifyPlayerSDKTypes';

const initialState: StateType = {
  isPaused: true,
};

// Slice
export const spotifyPlayerSDKSlice = createSlice({
  name: 'spotifyPlayerSDK',
  initialState,
  reducers: {
    setDeviceID: (state, action: PayloadAction<string>) => {
      state.deviceID = action.payload;
    },
    setPlaybackState: (state, action: PayloadAction<Spotify.PlaybackState>) => {
      state.playbackState = action.payload;
      state.isPaused = action.payload.paused;
      state.currentTrack = action.payload.track_window.current_track;
      state.playbackPosition = action.payload.position;
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<Spotify.Track>) => {
      state.currentTrack = action.payload;
    },
    setPlaybackPosition: (state, action: PayloadAction<number>) => {
      state.playbackPosition = action.payload;
    },
  },
});

// Actions
export const {
  setDeviceID,
  setPlaybackState,
  setIsPaused,
  setCurrentTrack,
  setPlaybackPosition,
} = spotifyPlayerSDKSlice.actions;

// Selectors
export const getIsPlayerReady = (state: AppState) =>
  !!state.spotifyPlayerSDK.deviceID;
export const getDeviceID = (state: AppState) =>
  state.spotifyPlayerSDK.deviceID;
export const getPlaybackState = (state: AppState) =>
  state.spotifyPlayerSDK.playbackState;
export const getIsPaused = (state: AppState) =>
  state.spotifyPlayerSDK.isPaused;
export const getCurrentTrack = (state: AppState) =>
  state.spotifyPlayerSDK.currentTrack;
export const getPlaybackPosition = (state: AppState) =>
  state.spotifyPlayerSDK.playbackPosition;

// Reducer
const spotifyPlayerSDKReducer = spotifyPlayerSDKSlice.reducer;

export default spotifyPlayerSDKReducer;
