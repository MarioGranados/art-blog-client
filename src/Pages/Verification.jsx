import React, { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { Navigate } from "react-router-dom";
import postApi from "../Api/postApi";

export default function Verification() {
  const [code, setCode] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function handleVerification(e) {
    e.preventDefault();

    try {
      await postApi.verifyUser(code);
      await postApi.logoutUser()
      setRedirect(true);
    } catch (error) {
      alert(error.message || "Verification failed");
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Container className="justify-content-center align-items-center d-flex">
        <Card style={{ width: "24em" }}>
          <Card.Title className="text-center">
            Enter Your Verification Code:
          </Card.Title>
          <Card.Body>
            <Form onSubmit={handleVerification}>
              <FloatingLabel
                controlId="verify"
                label="6 - Digit Code"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Verification Code"
                  name="Verification Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </FloatingLabel>
              <Button type="submit" value="submit">
                Verify
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <a href="http://">Send a new Verification Code</a>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
}
