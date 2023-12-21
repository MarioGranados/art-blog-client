import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


export default function Banner() {
  return (
    <>
      <Container className="d-flex justify-content-center py-5">

        <Row className="align-items-center">
          <h1 className="text-center">Lorem, ipsum dolor.</h1>

          <div className="justify-content-between d-flex ">
            <div>Lorem, ipsum.</div>
            <div>Lorem, ipsum.</div>
            <div>Lorem, ipsum.</div>
          </div>
        </Row>
      </Container>
    </>
  );
}
