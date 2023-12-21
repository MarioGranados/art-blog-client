import React, { useEffect, useState } from "react";
import ImageCard from "../Components/ImageCard";
import Row from "react-bootstrap/esm/Row";
import postApi from "../Api/postApi";


export default function Gallery() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await postApi.fetchPosts();
        await setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Row className="justify-content-evenly">
        {posts &&
          posts.map((post, index) => (
            <ImageCard key={index} post={post}></ImageCard>
          ))}
      </Row>
    </>
  );
}
