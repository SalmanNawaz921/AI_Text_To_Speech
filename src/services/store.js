import { configureStore } from "@reduxjs/toolkit";
import { audioApi } from "./audio";
export const store = configureStore({
  reducer: {
    // add reducers here
    [audioApi.reducerPath]: audioApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(audioApi.middleware),
});
