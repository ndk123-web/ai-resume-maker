import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PERSIST, REHYDRATE, PAUSE, FLUSH, PURGE } from "redux-persist";

import authReducer from "../slices/auth.slice.js";
import userReducer from "../slices/user.slice.js";
import loadingSlicer from "../slices/loading.slice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  loading: loadingSlicer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };
