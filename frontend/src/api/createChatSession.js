import axios from "axios";

const createNewChatSession = async (sessionId, idToken) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_AI_BACKEND_API}/api/v1/user/create-chat-session`,
      {
        sessionId: sessionId,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return {
      status: err.response?.status || 500,
      data: err.response?.data || {},
      message: err.message,
    };
  }
};

export { createNewChatSession };
