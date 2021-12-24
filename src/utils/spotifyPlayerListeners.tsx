export const logStateChange = (state: Spotify.PlaybackState) => {
  const {
    position,
    duration,
    track_window: { current_track }
  } = state;
  console.log('Currently Playing', current_track);
  console.log('Position in Song', position);
  console.log('Duration of Song', duration);
};
