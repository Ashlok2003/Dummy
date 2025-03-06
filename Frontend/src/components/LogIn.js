import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const [password, setPassword] = useState("");
  const [userid, setUserId] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userid || !password) {
      toast.error("Please fill in all fields", {
        icon: "❌",
        className: "custom-toast",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/demo/logIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid, password }),
      });
      const data = response.text();
      console.log("Data:", data);
      if (response.ok) {
        toast.success("Login successful", {
          icon: "✅",
          className: "custom-toast",
        });
        setTimeout(() => navigate("/courses"), 1500);
      } else {
        toast.error(data.message || "Login failed", {
          icon: "❌",
          className: "custom-toast",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.", {
        icon: "❌",
        className: "custom-toast",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`login-page ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? (
          <FaSun className="theme-icon" />
        ) : (
          <FaMoon className="theme-icon" />
        )}
      </div>
      <div className="login-container">
        <Card className="login-card">
          <CardHeader className="login-header">
            <div className="logo-wrapper">
              <span className="feature-icon">🎓</span>
              <h2>Learning Platform</h2>
            </div>
            <p className="tagline">Unlock Your Learning Journey</p>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit} className="login-form">
              <FormGroup className="input-group">
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <Input
                    type="text"
                    id="userid"
                    value={userid}
                    onChange={handleUserIdChange}
                    placeholder=" "
                    required
                  />
                  <Label for="userid" className="floating-label">
                    User ID
                  </Label>
                </div>
              </FormGroup>
              <FormGroup className="input-group">
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder=" "
                    required
                  />
                  <Label for="password" className="floating-label">
                    Password
                  </Label>
                  <span
                    className="toggle-icon"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </FormGroup>
              <div className="form-options">
                <FormGroup check className="checkbox-group">
                  <Input type="checkbox" id="remember" />
                  <Label for="remember" check>
                    Remember Me
                  </Label>
                </FormGroup>
                <a
                  href="#"
                  className="forgot-link"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </a>
              </div>
              <Button className="login-btn" disabled={isLoading}>
                {isLoading ? (
                  <span>
                    <span className="spinner"></span> Logging In...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
              {isLoading && <div className="progress-bar"></div>}
            </Form>
            <div className="signup-link">
              <p>
                New here?{" "}
                <a
                  href="#"
                  onClick={() => navigate("/signup")}
                  className="signup-text"
                >
                  Create an Account
                </a>
              </p>
            </div>
            <div className="secure-badge">🔒 Secure Login</div>
          </CardBody>
        </Card>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default LogIn;
