import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";

import { useUserInfo } from "../UserInfoContext";
import postApi from "../Api/postApi";

function NavigationBar() {
  const { setUserData, userData } = useUserInfo();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    // Fetch user profile on component mount
    postApi
      .fetchUserProfile()
      .then((userData) => {
        if (isMounted) {
          setUserData(userData);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user profile:", error);
      });

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogout() {
    try {
      const result = await postApi.logoutUser();
      // Check if the logout was successful
      if (result.success) {
        // Clear user data and navigate to the login page
        setUserData(null);
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
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                MyArtStuff
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Form className="d-flex flex-grow-1">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                  />
                  <Button
                    variant="outline-success"
                    onClick={handleSearchSubmit}
                  >
                    Search
                  </Button>
                </Form>
                {userData && userData.username && (
                  <>
                    <NavDropdown
                      title="Profile"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="/profile/edit">
                        Edit Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/profile/analytics">
                        Analytics
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Button onClick={handleLogout}>Log Out</Button>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/upload">Upload</Nav.Link>
                  </>
                )}

                {(!userData || !userData.username) && (
                  <Nav.Link href="/login">Login</Nav.Link>
                )}

                <Nav.Link href="/gallery">Gallery</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
