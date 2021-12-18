import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';

/* Types */
import type { Profile, VerifyCallback } from 'passport-spotify';

export const port = 8080;
export const authCallbackPath = '/auth-callback'

passport.serializeUser((user: Express.User, done) => {
  console.log("Serializer: ", user)
  done(null, user);
});

passport.deserializeUser((obj: Express.User, done) => {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID ?? '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
      callbackURL: 'http://localhost:' + port + authCallbackPath,
    },
    (
      accessToken: string,
      refreshToken: string,
      expires_in: number,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);

const allowedOrigins = ['http://localhost:3000', `http://localhost:${port}`];

const corsOptions: cors.CorsOptions = {
  // origin: allowedOrigins
  origin: '*',
};

const app = express();
app.set('port', process.env.PORT || port);

app.use(cors(corsOptions));

// app.options('*', cors(corsOptions));

app.use(
  session({secret: 'keyboard cat', resave: true, saveUninitialized: true})
);

app.use(passport.initialize());
app.use(passport.session());

// First auth step (call Spotify auth endpoint, add scopes)
app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    // scope: ['user-read-email', 'user-read-private'],
  })
);
  
  // Second auth step (handle return from Spotify)
app.get(
  authCallbackPath,
  passport.authenticate('spotify', {failureRedirect: '/'}),
  (req: Request, res: Response) => {
    // console.log("success!")
    // console.log("client secret:");
    // console.log(process.env.SPOTIFY_CLIENT_SECRET);
    // console.dir(res);
    res.redirect('/');
  }
);

// app.use((req: Request, res: Response, next) => {
//   res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
// });
app.use(express.static(path.join(__dirname,'..', '..', 'build')));
app.use(express.static('public'));

const ensureAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // redirect to login
  res.redirect('/');
}

app.listen(port, () =>
  console.log(`Listening on port ${port}`));
