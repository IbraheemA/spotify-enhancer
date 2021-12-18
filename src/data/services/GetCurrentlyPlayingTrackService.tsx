import axios from 'axios';
import type {
  GetCurrentlyPlayingTrackServiceType
} from '../types/SpotifyAPITypes';

export default async () : Promise<GetCurrentlyPlayingTrackServiceType> => {
  const { data } = await axios.get('/currently-playing');
  return data;
};
