const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
// **
const editPosts = async (id, title, content, files, tags) => {
  const data = new FormData();
  data.set("id", id);
  data.set("title", title);
  data.set("content", content);
  data.set("tags", tags);

  if (files && files[0]) {
    data.append("file", files[0]);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/post/update`, {
      method: "PUT",
      body: data,
      credentials: "include",
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Post updated successfully:");
  } catch (error) {
    console.error("Error updating post:", error);
  }
};


//** */
async function fetchPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/post`, {credentials: 'include'});

    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
/** */
const loginUser = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: 'cors',
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Login failed");
  }
};

/** */
async function registerUser(username, email, password) {
  const res = await fetch(`${API_BASE_URL}/user/register`, {
    method: "post",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Include credentials to allow cookies
  });

  if (res.status === 200) {
    return true;
  } else {
    throw new Error("Failed to register");
  }
}

const fetchSearchedPosts = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/post/search/${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log();
    throw error;
  }
};

const uploadPost = async (title, content, tags, file) => {
  const data = new FormData();
  data.set("title", title);
  data.set("content", content);
  data.set("tags", tags);
  data.append("file", file);

  const response = await fetch(`${API_BASE_URL}/post/upload`, {
    method: "POST",
    body: data,
    credentials: "include",
  });

  if (response.ok) {
    return true;
  } else {
    throw new Error("Failed to upload post");
  }
};

const verifyUser = async (verificationCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/verification`, {
      method: "POST",
      body: JSON.stringify({ verificationCode }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: 'cors'
    });

    if (response.ok) {
      return true;
    } else {
      const data = await response.json();
      throw new Error(data.error || "Verification failed");
    }
  } catch (error) {
    console.error("Error during verification:", error);
    throw new Error("Verification failed");
  }
};

async function logoutUser() {
  try {
    // Perform the logout API request
    const response = await fetch(`${API_BASE_URL}/user/logout`, {
      credentials: "include",
      method: "post",
      mode: 'cors'
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Error("Logout failed");
    }

    // Return the result or necessary data if needed
    return { success: true };
  } catch (error) {
    // Handle errors and return the necessary data
    console.error("Logout error:", error);
    return { success: false, error: error.message };
  }
}


async function fetchUserProfile() {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: 'cors'
    });

    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("failed to fetch: ", error);
    throw error; // Propagate the error to the caller
  }
}


const postApi = {
  editPosts,
  fetchPosts,
  loginUser,
  registerUser,
  fetchSearchedPosts,
  uploadPost,
  verifyUser,
  logoutUser,
  fetchUserProfile,
};

export default postApi;
