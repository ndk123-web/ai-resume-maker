import { store, persistor } from "./store/store.js";
import { login, logout } from "./slices/auth.slice.js";
import {
  setLoading,
  unsetloading,
  setGithubLoading,
  unsetGithubLoading,
  setGoogleLoading,
  unsetGoogleLoading,
  setPageLoading,
  unsetPageLoading,
  setChatLoading,
  unsetChatLoading,
  setEmailLoading,
  unsetEmailLoading,
} from "./slices/loading.slice";
import {
  setUserProfile,
  removeUserProfile,
  updateUserProfile,
} from "./slices/user.slice.js";
import {
  setCurrentSessionId,
  resetCurrentSessionId,
  updateCurrentSessionId,
} from "./slices/current_session_id.js";
import { fetchUserChatHistory } from "./thunks/fetch_current_user_chat_history.js";
import {
  setUserChatHistory,
  updateUserChatHistory,
  resetUserChatHistory,
} from "./slices/user_chat_history.slice.js";

export {
  store,
  persistor,
  login,
  logout,
  setCurrentSessionId,
  setUserChatHistory  ,
  updateUserChatHistory,
  resetUserChatHistory,
  resetCurrentSessionId,
  updateCurrentSessionId,
  fetchUserChatHistory,
  updateUserProfile,
  removeUserProfile,
  setUserProfile,
  setLoading,
  unsetloading,
  setGithubLoading,
  unsetGithubLoading,
  setGoogleLoading,
  unsetGoogleLoading,
  setPageLoading,
  unsetPageLoading,
  setChatLoading,
  unsetChatLoading,
  setEmailLoading,
  unsetEmailLoading,
};
