import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navigate } from "react-router-dom";
import postApi from "../Api/postApi";

export default function Upload() {
  const [redirect, setRedirect] = useState(false);
  const [post, setPost] = useState({
    postTitle: "",
    postDesc: "",
    postTags: ["tag1", "tag2"],
  });
  const [file, setFile] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postApi.uploadPost(post.postTitle, post.postDesc, post.postTags, file);
      setRedirect(true);
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Container className="justify-content-center w-50 mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Upload you</Card.Title>

            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="postTitle"
                label="Title"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="postTitle"
                  value={post.postTitle}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="postDesc"
                label="PostDesc"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="postDesc"
                  value={post.postDesc}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <Form.Group controlId="postImage" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>
              <Button as="input" value="Upload" type="submit" />
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
