import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { UserInfo } from "../UserInfo";
import { Navigate } from "react-router-dom";
import postApi from "../Api/postApi";

export default function Login() {
  const [redirect, setRedirect] = useState(false);
  const { setUserData } = useContext(UserInfo);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function login(e) {
    e.preventDefault();
    try {
      const userData = await postApi.loginUser(user.username, user.password);
      setUserData(userData);
      setRedirect(true);
    } catch (error) {
      alert("Failed to login");
    }
  }
  

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Container className="justify-content-center mt-5 w-50">
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={login}>
              <FloatingLabel
                controlId="username"
                label="username"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  placeholder="username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="password"
                label="Password"
                className="mb-2"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <Button as="input" value="Login" type="submit" />
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
