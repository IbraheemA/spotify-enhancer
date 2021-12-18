import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

/* Reducers */
// import oidcReducer from './oidcSlice';

// configure your redux store
const store = configureStore({
  reducer: {
    // oidc: oidcReducer,
    // other reducers
  },
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
