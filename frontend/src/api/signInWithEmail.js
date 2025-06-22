import axios from "axios";

const signInWithEmail = async (token) => {
  try {
    const response = await axios.post(
      "http://192.168.0.103:3000/api/v1/user/login-user",
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