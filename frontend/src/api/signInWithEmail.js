import axios from "axios";

const signInWithEmail = async (token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_AUTH_BACKEND_API}/api/v1/user/login-user`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    return {
      status: err.response?.status || 500,
      data: err.response?.data || {},
      message: err.message,
    };
  }
};

export {
    signInWithEmail
}