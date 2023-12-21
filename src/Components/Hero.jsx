import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

export default function Hero() {
  let postImage =
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    postTitle = "Some title",
    postDesc =
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae suscipit rerum deleniti esse, ut corporis.";

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col xs={8}>
            <Image src={postImage} alt={postTitle} fluid />
          </Col>
          <Col>
            <h5 xs={4}>{postTitle}</h5>
            <p>{postDesc}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
