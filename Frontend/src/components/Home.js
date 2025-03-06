import React from "react";
import "./css/CustomJumbotron.css";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardText,
  Button,
  CardBody,
  CardHeader,
} from "reactstrap";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Unlock Your Potential with Free Courses</h1>
          <p className="hero-subtitle">
            Explore a curated collection of free YouTube courses, designed for
            students and lifelong learners.
          </p>
          <div className="hero-buttons">
            <Button
              color="primary"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
            <Button
              color="outline-light"
              size="lg"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="hero-decor">
          <span className="circle"></span>
          <span className="circle small"></span>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <Card className="feature-card">
            <CardBody>
              <div className="feature-icon">📚</div>
              <CardTitle tag="h5">Free Access</CardTitle>
              <CardText>
                Enjoy a wide range of courses at no cost, sourced from YouTube.
              </CardText>
            </CardBody>
          </Card>
          <Card className="feature-card">
            <CardBody>
              <div className="feature-icon">🎓</div>
              <CardTitle tag="h5">Student-Friendly</CardTitle>
              <CardText>
                Curated content tailored to support academic and personal
                growth.
              </CardText>
            </CardBody>
          </Card>
          <Card className="feature-card">
            <CardBody>
              <div className="feature-icon">🌐</div>
              <CardTitle tag="h5">All-in-One Platform</CardTitle>
              <CardText>
                Access all your learning resources in one convenient place.
              </CardText>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Login Options Section */}
      <section className="login-section">
        <h2 className="section-title">Join the Platform</h2>
        <div className="login-grid">
          <Card className="login-card" color="primary" inverse>
            <CardHeader>Admin Login</CardHeader>
            <CardBody>
              <CardTitle tag="h5">Manage Courses</CardTitle>
              <CardText>Add, update, or remove courses with ease.</CardText>
            </CardBody>
            <div className="card-footer">
              <Button color="secondary" onClick={() => navigate("/adminlogin")}>
                Login Here
              </Button>
            </div>
          </Card>
          <Card className="login-card" color="secondary" inverse>
            <CardHeader>User Login</CardHeader>
            <CardBody>
              <CardTitle tag="h5">Explore Courses</CardTitle>
              <CardText>
                Login to browse and learn from our collection.
              </CardText>
            </CardBody>
            <div className="card-footer">
              <Button color="primary" onClick={() => navigate("/login")}>
                Login Here
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Free Courses App. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> |{" "}
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
