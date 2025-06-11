import { store, persistor } from "./store/store.js";
import { login, logout } from "./slices/auth.slice.js";
import { updateUserProfile } from "./slices/user.slice.js";
import { setLoading, unsetloading } from "./slices/loading.slice";

export {
  store,
  persistor,
  login,
  logout,
  updateUserProfile,
  setLoading,
  unsetloading,
};
