import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";

import { UserInfo } from "../UserInfo";
import postApi from "../Api/postApi";

function NavigationBar() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { setUserData, userData } = useContext(UserInfo);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile on component mount
    fetchUserProfile();
  }, []);

  function fetchUserProfile() {
    const requestOptions = { credentials: "include" };

    return fetch(`${API_BASE_URL}/user/profile`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((userData) => setUserData(userData))
      .catch((error) => {
        console.error("failed to fetch: ", error);
      });
  }

  async function handleLogout() {
    try {
      const result = await postApi.logoutUser();
      // Check if the logout was successful
      if (result.success) {
        // Clear user data and navigate to the login page
        setUserData("");
        navigate("/login");
      } else {
        // Handle the error
        console.error("Logout failed:", result.error);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error during logout:", error);
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/search/" + searchInput);
  };

  const expand = "md";

  return (
    <>
      <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="/">Mercy Art Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            {/* ... (unchanged) */}
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
