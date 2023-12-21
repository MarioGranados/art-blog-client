import React, { useEffect, useState } from "react";
import ImageCard from "../Components/ImageCard";
import Row from "react-bootstrap/esm/Row";
import { useParams } from "react-router-dom";
import postApi from "../Api/postApi";

export default function SearchResults() {
  const [posts, setPosts] = useState("");
  const { query } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await postApi.fetchSearchedPosts(query);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching searched posts:", error);
      }
    };

    fetchData();
  }, [query]);


  return (
    <>
    <h2 className="text-center">Search Results : {query}</h2>
      <Row className="justify-content-evenly">
        {posts &&
          posts.map((post, index) => (
            <ImageCard key={index} post={post}></ImageCard>
          ))}
      </Row>
    </>
  );
}
