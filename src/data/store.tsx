import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

/* Reducers */
import spotifyAPIReducer from './reducers/spotifyAPISlice';
import spotifyPlayerSDKReducer from './reducers/spotifyPlayerSDKSlice';
import listenLaterReducer from './reducers/listenLaterSlice';
import blacklistReducer from './reducers/blacklistSlice';

// configure your redux store
const store = configureStore({
  reducer: {
    spotifyAPI: spotifyAPIReducer,
    spotifyPlayerSDK: spotifyPlayerSDKReducer,
    listenLater: listenLaterReducer,
    blacklist: blacklistReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
AppState,
unknown,
Action<string>
>;

export default store;
