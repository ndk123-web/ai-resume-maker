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

export {
  store,
  persistor,
  login,
  logout,
  setCurrentSessionId,
  resetCurrentSessionId,
  updateCurrentSessionId,
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
