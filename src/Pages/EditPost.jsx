import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import postApi from "../Api/postApi";

export default function EditPost() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [img, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/post/${id}`).then((res) =>
      res.json().then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setImage(data.postImage);
      })
    );
  }, [id, API_BASE_URL]);

  async function handleEditPost(e) {
    e.preventDefault();
    try {
      await postApi.editPosts(id, title, content, files, ['tags']);
      setRedirect(true);
    } catch (error) {
      alert("Failed to edit post");
    }
  }
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <Card.Img variant="top" src={`${API_BASE_URL}/${img}`} />
            <Form onSubmit={handleEditPost}>
              <FloatingLabel
                controlId="postTitle"
                label="Title"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="postTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </FloatingLabel>
              <Form.Group controlId="postImage" className="mb-3">
                <Form.Label>Save Changes</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={(e) => setFiles(e.target.files[0])}
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
