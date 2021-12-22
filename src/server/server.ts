import express, {NextFunction, Request, Response } from 'express';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import cors from 'cors';
import 'dotenv/config';

/* Constants */
// import { authCallbackPath } from '../server/server';
// import { SPOTIFY_AUTH_CALLBACK_ROUTE } from '../constants/RouteConstants';

export const port = 8080;
export const authCallbackPath = '/auth-callback';

const allowedOrigins = ['http://localhost:3000', `http://localhost:${port}`];

// const corsOptions: cors.CorsOptions = {
//   // origin: allowedOrigins
//   origin: '*',
//   credentials: true,
//   allowedHeaders: ["Content-Type"],
// };

const app = express();

app.set('port', process.env.PORT || port);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

app.listen(port, () =>
  console.log(`Listening on port ${port}`));

const credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:' + port + authCallbackPath,
};

const spotifyApi = new SpotifyWebApi(credentials);

const authorizeURL = spotifyApi.createAuthorizeURL([
    'user-read-currently-playing',
],'');
// console.log("authorizeURL: ");
// console.log(authorizeURL);

app.get('/login',
  (req: Request, res: Response) => {
    res.redirect(authorizeURL);
  }
);

app.get(
  authCallbackPath,
  (req: Request, res: Response) => {
    const code = req.query['code'] as string;
    spotifyApi.authorizationCodeGrant(code).then((resp) => {
      const body = resp?.body;
      console.log('The token expires in ' + body['expires_in']);
      console.log('The access token is ' + body['access_token']);
      console.log('The refresh token is ' + body['refresh_token']);

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(body['access_token']);
      spotifyApi.setRefreshToken(body['refresh_token']);
      // window.location.href = '/'
      res.redirect('http://localhost:3000');
    });
  }
);

app.get(
  '/currently-playing',
  async (req: Request, res: Response) => {
    try {
      const resp = await spotifyApi.getMyCurrentPlayingTrack();
      const data = resp?.body;
      // console.log("got data:");
      // console.log(resp);
      // res.send(data.item?.name);
      res.send(data);
    } catch (err) {
      res.redirect('http://localhost:3000');
    }
  }
);
