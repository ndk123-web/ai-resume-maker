import axios from "axios";

const getChatResponse = async ({ token , prompt }) => {
  try {
    const backendResponse = await axios.post(
      "http://localhost:8000/api/v1/resumes/create-resume",
      {
        resumePrompt: prompt,
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
