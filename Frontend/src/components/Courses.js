import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./css/course.css";

// Sample data based on the playlist URL
const sampleCourses = [
  {
    coursename: "JavaScript Basics",
    courseauthor: "Net Ninja",
    url: "https://www.youtube.com/watch?v=hdI2bqOjy3c&list=PLu0W_9lII9aiS4rUVp2jXwIvCruo27sG6",
  },
  {
    coursename: "Advanced JavaScript Techniques",
    courseauthor: "Net Ninja",
    url: "https://www.youtube.com/watch?v=PuOVqS17M8Q&list=PLu0W_9lII9aiS4rUVp2jXwIvCruo27sG6",
  },
  {
    coursename: "JavaScript DOM Manipulation",
    courseauthor: "Net Ninja",
    url: "https://www.youtube.com/watch?v=5fb2a8pVYbE&list=PLu0W_9lII9aiS4rUVp2jXwIvCruo27sG6",
  },
  {
    coursename: "JavaScript ES6 Features",
    courseauthor: "Net Ninja",
    url: "https://www.youtube.com/watch?v=NCwa_zvGAYU&list=PLu0W_9lII9aiS4rUVp2jXwIvCruo27sG6",
  },
];

const Course = () => {
  const navigate = useNavigate();

  const extractVideoId = (url) => {
    const videoId = url.split("v=")[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition);
      }
      return videoId;
    }
    return null;
  };

  return (
    <div className="course-page">
      <header className="course-header">
        <Container>
          <Row className="align-items-center">
            <Col>
              <h1 className="course-title">Free Online Courses</h1>
              <p className="course-subtitle">
                Explore a curated collection of free courses from YouTube
              </p>
            </Col>
            <Col className="text-end">
              <Button
                color="secondary"
                outline
                onClick={() => navigate("/")}
                className="back-btn"
              >
                Back to Home
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      <Container className="course-container">
        <Row className="g-4">
          {sampleCourses.map((video, index) => (
            <Col md="6" lg="4" key={index}>
              <Card className="course-card">
                <div className="video-wrapper">
                  <iframe
                    title={`Video ${video.coursename}`}
                    src={`https://www.youtube.com/embed/${extractVideoId(video.url)}`}
                    allowFullScreen
                    className="video-iframe"
                  ></iframe>
                </div>
                <CardBody>
                  <CardTitle tag="h5" className="course-name">
                    {video.coursename}
                  </CardTitle>
                  <CardSubtitle tag="h6" className="course-author">
                    By: {video.courseauthor}
                  </CardSubtitle>
                  <CardText className="course-description">
                    Learn from this free course available on YouTube.
                  </CardText>
                  <Button
                    color="danger"
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    View on YouTube
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Course;
