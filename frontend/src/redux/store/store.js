import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PERSIST, REHYDRATE, PAUSE, FLUSH, PURGE } from "redux-persist";

import authReducer from "../slices/auth.slice.js";
import userReducer from "../slices/user.slice.js";
import loadingSlicer from "../slices/loading.slice.js";
import userChatSliceReducer from "../slices/user_chat_history.slice.js";
import currentSessionSliceReducer from "../slices/current_session.slice.js";
import { version } from "react";

// User Config Reducer
const userPersistConfig = {
  key : "user",
  version : 1,
  storage : storage
}
const userPersistedReducer = persistReducer(userPersistConfig,userReducer)

// Auth Config Reducer
const authPersistConfig = {
  key : "auth",
  version : 1,
  storage : storage
}
const authPersistedReducer = persistReducer(authPersistConfig,authReducer)

// Root Reducer
const rootReducer = combineReducers({
  auth: authPersistedReducer,
  user: userPersistedReducer,
  loading: loadingSlicer,
  user_chat_history: userChatSliceReducer,
  current_session: currentSessionSliceReducer,
});

const store = configureStore({
  reducer: rootReducer,

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
