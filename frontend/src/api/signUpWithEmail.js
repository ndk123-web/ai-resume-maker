import axios from "axios";

const signUpWithEmail = async (token) => {
  try {
    const response = await axios.post(
      "http://192.168.0.103:3000/api/v1/user/register-user",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    console.log("Error from backend:", err?.response?.data); // 👈 log error
    return {
      status: err.response?.status || 500,
      data: err.response?.data || {},
      message: err.message,
    };
  }
};
export { signUpWithEmail};
