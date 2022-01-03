export type StateType = {
  deviceID?: string,
  playbackState?: Spotify.PlaybackState,
  isPaused: boolean,
  currentTrack?: Spotify.Track,
  playbackPosition?: number,
};
