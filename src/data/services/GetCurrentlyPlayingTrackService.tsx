import axios from 'axios';

import type { CurrentlyPlayingTrackType } from '../types/SpotifyAPITypes';

export default async () : Promise<CurrentlyPlayingTrackType> => {
  const { data } = await axios.get('currently-playing');
  return data;
};
