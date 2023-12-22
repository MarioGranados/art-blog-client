import React from "react";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Gallery from "./Pages/Gallery";
import Upload from "./Pages/Upload";
import Post from "./Pages/Post";
import "bootstrap/dist/css/bootstrap.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Change here
import { UserInfoProvider } from "./UserInfo";
import EditPost from "./Pages/EditPost";
import NavigationBar from "./Components/NavigationBar";
import Footer from "./Components/Footer";
import NotFound from "./Pages/NotFound";
import SearchResults from "./Pages/SearchResults";
import Verification from "./Pages/Verification";

function App() {
  return (
    <>
      <UserInfoProvider>
        <Router basename={process.env.REACT_APP_PUBLIC_URL}> {/* Change here */}
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path='/verify' element={<Verification/>}/>
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </UserInfoProvider>
    </>
  );
}

export default App;
