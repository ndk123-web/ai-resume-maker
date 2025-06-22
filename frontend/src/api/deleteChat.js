import axios from "axios";

const deleteChat = async ({ sessionId, idToken }) => {
  try {
    const backendResponse = await axios.delete(
      "http://192.168.0.103:3000/api/v1/user/delete-chat",
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        params: {
          sessionId: sessionId,
        },
      }
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

export { deleteChat };
