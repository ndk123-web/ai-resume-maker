import axios from "axios";

const getUserChatHistory = async ({ token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_AUTH_BACKEND_API}/api/v1/user/get-user-chat-history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Backend Response:", response);
    return response;
  } catch (err) {
    return {
      status: err.response?.status || 500,
      data: err.response?.data || {},
      message: err.message,
    };
  }
};

export { getUserChatHistory };
