import { configureStore, current } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PERSIST, REHYDRATE, PAUSE, FLUSH, PURGE } from "redux-persist";

import authReducer from "../slices/auth.slice.js";
import userReducer from "../slices/user.slice.js";
import loadingSlicer from "../slices/loading.slice.js";
import userChatSliceReducer from "../slices/user_chat_history.slice.js";
import currentSessionSliceReducer from "../slices/current_session.slice.js";
import currentSessionIdSliceReducer from "../slices/current_session_id.js";
import userCurrentSessionChatsReducer from "../slices/user_current_session_chats.js";

// User Config Reducer
const userPersistConfig = {
  key: "user",
  version: 1,
  storage: storage,
};
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

// Current Session Id Config Reducer 
const currentSessionIdPersistConfig = {
  key: "currentSessionId",
  version: 1,
  storage: storage,
};
const currentSessionIdPersistedReducer = persistReducer(
  currentSessionIdPersistConfig,
  currentSessionIdSliceReducer
);

// User Chat Config Reducer
const userChatPersistConfig = {
  key: "current_session_chats",
  version: 1,
  storage: storage,
};
const userChatPersistedReducer = persistReducer(userChatPersistConfig, userCurrentSessionChatsReducer);

// Auth Config Reducer
const authPersistConfig = {
  key: "auth",
  version: 1,
  storage: storage,
};
const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

// Chat History Config Reducer
const chatHistoryPersistConfig = {
  key: "user_chat_history",
  version: 1,
  storage: storage,
};
const chatHistoryPersistedReducer = persistReducer(
  chatHistoryPersistConfig,
  userChatSliceReducer
);

// Root Reducer
const rootReducer = combineReducers({
  auth: authPersistedReducer,
  user: userPersistedReducer,
  loading: loadingSlicer,
  user_chat_history: chatHistoryPersistedReducer,
  current_session: currentSessionSliceReducer,
  current_session_id: currentSessionIdPersistedReducer,
  user_current_session_chats : userChatPersistedReducer
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
