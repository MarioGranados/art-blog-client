import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./ImageCard.css";
import { formatISO9075 } from "date-fns";
import { useContext } from "react";
import { UserInfo } from "../UserInfo";
import Button from "react-bootstrap/esm/Button";
import {Navigate} from 'react-router-dom'

export default function ImageCard({ post }) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  const { userData } = useContext(UserInfo);
  const [redirect, setRedirect] = useState(false);
  async function deletePost(e) {

    try {
      const response = await fetch(`${API_BASE_URL}/post/delete/${post._id}`, {
        method: "delete",
      });

      if (response.ok) {
        const result = await response.json();
          setRedirect(true); // You can handle the result as needed

        // Add logic here to handle the deletion result (e.g., remove the card from the UI)
      } else {
        console.error("Failed to delete post. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  if(redirect) {
    return <Navigate to={'/gallery'}/>
  }

  return (
    <>
      <Card style={{ width: "18rem", minHeight: "1rem", border: "none" }}>
        <Card.Img
          variant="top"
          src={`${API_BASE_URL}/${post.postImage}`}
        />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>

          <Button className="" href={`/post/${post._id}`}>
            View
          </Button>
          {userData.username === post.author.username ? (
            <>
              <Button variant='secondary' className="mx-1" href={`/edit/${post._id}`}>
              Edit
              </Button>
              <Button variant="danger" className="mx-1" onClick={deletePost}>
                Delete
              </Button>
            </>
          ) : (
            <></>
          )}
        </Card.Body>
        <Card.Footer>
          <time>{formatISO9075(new Date(post.createdAt))}</time>
          <div className="author">by {post.author.username}</div>
        </Card.Footer>
      </Card>
    </>
  );
}
