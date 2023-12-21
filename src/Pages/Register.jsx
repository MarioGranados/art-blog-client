import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Navigate } from "react-router-dom";
import postApi from "../Api/postApi";

export default function Register() {
  const [passValidate, setPassValidate] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function register(e) {
    e.preventDefault();
    try {
      if (user.password === passValidate) {
        await postApi.registerUser(user.username, user.email, user.password);
        setRedirect(true);
      } else {
        alert("Passwords don't match!");
      }
    } catch (error) {
      alert("Failed to register");
    }
  }

  if (redirect) {
    return <Navigate to={"/verify"} />;
  }

  return (
    <>
      <Form onSubmit={register}>
        <FloatingLabel controlId="username" label="username" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel controlId="Email" label="Email address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel controlId="Password" label="Password" className="mb-2">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          label="Confirm Password"
          className="mb-2"
        >
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="Confirm Password"
            value={passValidate}
            onChange={(e) => setPassValidate(e.target.value)}
          />
        </FloatingLabel>

        <Button as="input" type="submit" value="Register" />
      </Form>
    </>
  );
}
