import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Gallery from "./Pages/Gallery";
import Upload from "./Pages/Upload";
import Post from "./Pages/Post";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import { useUserInfo } from "./UserInfoContext";
import EditPost from "./Pages/EditPost";
import NavigationBar from "./Components/NavigationBar";
import Footer from "./Components/Footer";
import NotFound from "./Pages/NotFound";
import SearchResults from "./Pages/SearchResults";
import Verification from "./Pages/Verification";
import postApi from "./Api/postApi";
import { useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import React, { Fragment } from "react";

function App() {
  const { setUserData } = useUserInfo();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Call your function to get the user profile
        const userProfile = await postApi.fetchUserProfile();

        // Update the user information in the context
        setUserData(userProfile);
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching user profile:", error);
      }
    };

    // Call the function to fetch the user profile when the app is mounted
    fetchUserProfile();
  }, [setUserData]);
  return (
    <>
      <NavigationBar />
      <Routes>
        <Fragment>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />

        <Route exact path="/profile" element={<PrivateRoute />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>

        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/upload" element={<PrivateRoute />}>
          <Route exact path="/upload" element={<Upload />} />
        </Route>
        <Route path="/post/:id" element={<Post />} />
        <Route path="/register" element={<Register />} />

        <Route exact path="/edit/:id" element={<EditPost />}>
          <Route exact path="/edit/:id" element={<PrivateRoute />} />
        </Route>

        <Route exact path="/search/:query" element={<SearchResults />} />
        <Route exact path="/verify" element={<PrivateRoute />}>
          <Route exact path="/verify" element={<Verification />} />
        </Route>
        {/* 404 Route */}
        <Route exact path="*" element={<NotFound />} />
        </Fragment>
        
      </Routes>
      <Footer />
    </>
  );
}
export default App;
