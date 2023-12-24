// PrivateRoute.js
import React, {useState, useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserInfo } from "./UserInfoContext";
import postApi from "./Api/postApi";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useUserInfo();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await postApi.fetchUserProfile();
        setUserData(user)
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Show loading spinner or any loading indicator while fetching user data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render the component if the user is authenticated
  return userData ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
