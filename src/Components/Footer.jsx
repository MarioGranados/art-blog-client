import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Container className="justify-content-center align-items-center d-flex py-5">
        <div className="d-flex flex-column align-items-center">
          <div className="mb-2">
            <Link className="mx-1" to="/">Home</Link>
            <Link className="mx-1" to="/about">About</Link>
            <Link className="mx-1" to="/gallery">Gallery</Link>
          </div>
          <div className="mb-2">Copyright &copy; 2023 The CloudyDeveloper</div>
        </div>
      </Container>
    </>
  );
}
