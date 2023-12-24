import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const postApi = {
  editPosts: async (id, title, content, files, tags) => {
    const data = new FormData();
    data.set("id", id);
    data.set("title", title);
    data.set("content", content);
    data.set("tags", tags);

    if (files && files[0]) {
      data.append("file", files[0]);
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/post/update`, data, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      console.log("Post updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  },

  fetchPosts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/post`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },

  loginUser: async (username, password) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true, // Include credentials to allow cookies
        }
      );

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  },

  registerUser: async (username, email, password) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/register`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true, // Include credentials to allow cookies
        }
      );

      return true;
    } catch (error) {
      console.error("Failed to register:", error);
      throw new Error("Failed to register");
    }
  },

  fetchSearchedPosts: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/search/${query}`);

      return response.data;
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      throw error;
    }
  },

  uploadPost: async (title, content, tags, file) => {
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    data.set("tags", tags);
    data.append("file", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/post/upload`, data, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      return true;
    } catch (error) {
      console.error("Failed to upload post:", error);
      throw new Error("Failed to upload post");
    }
  },

  verifyUser: async (verificationCode) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/verification`,
        {
          verificationCode,
        },
        {
          withCredentials: true, // Include credentials to allow cookies
        }
      );

      return true;
    } catch (error) {
      console.error("Verification failed:", error);
      throw new Error("Verification failed");
    }
  },

  logoutUser: async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/logout`,
        {},
        {
          withCredentials: true, // Include credentials to allow cookies
        }
      );

      return { success: true };
    } catch (error) {
      console.error("Logout failed:", error);
      return { success: false, error: error.message };
    }
  },

  fetchUserProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      return response.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  },
};

export default postApi;
