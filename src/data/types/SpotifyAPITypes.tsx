export type TrackType = {
  album: {
    album_type: string,
    // artists: [Array],
    artists: Array<any>;
    // available_markets: [Array],
    available_markets: Array<any>;
    // external_urls: [Object], TODO: VERIFY THIS
    external_urls: Array<string>;
    href: string;
    id: string;
    // images: [Array],
    images: Array<any>;
    name: string;
    // release_date: '2020-12-10', //TODO: SHOULD THIS BE DATE?
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  },
  // artists: [ [Object], [Object] ],
  // available_markets: [
  //   'AD', 'AE', 'AG', 'AL', 'AM', 'AO', 'AR', 'AT', 'AU', 'AZ',
  //   'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BN',
  //   'BO', 'BR', 'BS', 'BT', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CG',
  //   'CH', 'CI', 'CL', 'CM', 'CO', 'CR', 'CV', 'CY', 'CZ', 'DE',
  //   'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'FI',
  //   'FJ', 'FM', 'FR', 'GA', 'GB', 'GD', 'GE', 'GH', 'GM', 'GN',
  //   'GQ', 'GR', 'GT', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU',
  //   'ID', 'IE', 'IL', 'IN', 'IQ', 'IS', 'IT', 'JM', 'JO', 'JP',
  //   'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KZ', 'LA',
  //   'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY',
  //   ... 83 more items
  // ],
  // disc_number: 1,
  duration_ms: number;
  // explicit: true,
  // external_ids: { isrc: 'QMFME2085671' },
  // external_urls: {
  //   spotify: 'https://open.spotify.com/track/6UYbt0ZVXP5pnrhzk8z2d8'
  // },
  // href: 'https://api.spotify.com/v1/tracks/6UYbt0ZVXP5pnrhzk8z2d8',
  id: string;
  is_local: boolean;
  name: string;
  // popularity: 60,
  // preview_url: 'https://p.scdn.co/mp3-preview/682e21d6a5d3987ba160b22780be3a65a44ca8d8?cid=30d9745536744950a299f81ffede6111',
  // track_number: 5,
  // type: 'track',
  // uri: 'spotify:track:6UYbt0ZVXP5pnrhzk8z2d8'
};

export type CurrentlyPlayingTrackType = {
  timestamp: number;
  context: null;
  progress_ms: number;
  item: TrackType;
  // currently_playing_type: 'track',
  // actions: {
  //   disallows: {
  //     pausing: true,
  //     toggling_repeat_context: true,
  //     toggling_repeat_track: true,
  //     toggling_shuffle: true
  //   }
  // },
  // is_playing: false
};
