import axios from 'axios';

import type { CurrentlyPlayingTrackInfoType } from '../types/SpotifyAPITypes';

export default async () : Promise<CurrentlyPlayingTrackInfoType> => {
  const { data } = await axios.get('currently-playing');
  return data;
};
