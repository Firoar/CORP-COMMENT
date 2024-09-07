import axios from "axios";
import { ReviewData, SignInData, SignupData } from "./interfaces";

export const signupAxios = async (data: SignupData) => {
  try {
    const response = await axios.post("http://localhost:8000/sign-up", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Signup failed:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// http://localhost:8000/

export const signinAxios = async (data: SignInData) => {
  try {
    const response = await axios.post("http://localhost:8000/sign-in", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Signup failed:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const get_all_postAxios = async (token: string) => {
  const response = await axios.get("http://localhost:8000/feed/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const upload_postAxios = async (token: string, data: ReviewData) => {
  const response = await axios.post("http://localhost:8000/feed/upload", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const like_post = async (token: string, post_id: Number) => {
  const response = await axios.post(
    `http://localhost:8000/feed/upvote/${post_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const get_certain_companyAxios = async (
  token: string,
  company: string
) => {
  const response = await axios.get(`http://localhost:8000/feed/${company}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// const apiClient = axios.create({
//   baseURL: "http://localhost:8000/feed/",
// });

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
