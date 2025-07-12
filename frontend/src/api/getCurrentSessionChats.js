import axios from "axios";

const getCurrentSessionChats = async ({ token, sessionId }) => {
  try {
    const backendResponse = await axios.post(
      `${import.meta.env.VITE_AUTH_BACKEND_API}/api/v1/user/get-current-session-chats`,
      {
        sessionId: sessionId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(
      "Backend Response in getCurrentSessionChats: ",
      backendResponse
    );
    return backendResponse;
  } catch (err) {
    return {
      status: err.response?.status || 500,
      data: err.response?.data || {},
      message: err.message,
    };
  }
};

export { getCurrentSessionChats };
