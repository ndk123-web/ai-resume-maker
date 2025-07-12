import axios from "axios";

const getChatResponse = async ({ token, prompt, sessionId }) => {
  try {
    const backendResponse = await axios.post(
      `${import.meta.env.VITE_AI_BACKEND_API}/api/v1/resumes/create-resume`,
      {
        resumePrompt: prompt,
        sessionId: sessionId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

export { getChatResponse };
