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

export {
  store,
  persistor,
  login,
  logout,
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
