import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { UserInfo } from "../UserInfo";
import Button from "react-bootstrap/esm/Button";

function Post() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

  const { id } = useParams();
  const [postData, setPostData] = useState("");
  const { userData } = useContext(UserInfo);
  const [postUserInfo, setPostUserInfo] = useState("");
  useEffect(() => {
    fetch(`${API_BASE_URL}/post/${id}`).then((res) =>
      res.json().then((data) => {
        setPostData(data);
        setPostUserInfo(data.author.username);
      })
    );
  }, []);

  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={8}>
            <Image
              src={`${API_BASE_URL}/${postData.postImage}`}
              fluid
              style={{ width: "100%", height: "100%" }}
            />
            ;
          </Col>
          <Col>
            <Card style={{border: 'none'}}>
              <Card.Body>
                <Card.Title>Title: {postData.title} </Card.Title>
                Description: {postData.content}
              </Card.Body>
              {userData.username == postUserInfo ? (
                <Button variant='secondary' href={`/edit/${id}`}>Edit</Button>
              ) : (
                <></>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default Post;
