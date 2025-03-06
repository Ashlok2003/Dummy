import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/signup.css";
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
  FaIdCard,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !userid || !password) {
      toast.error("Please fill in all fields", {
        icon: "❌",
        className: "custom-toast",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/demo/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, userid, password }),
      });
      const data = await response.text();
      if (response.ok) {
        toast.success("Account created successfully", {
          icon: "✅",
          className: "custom-toast",
        });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(data.message || "Signup failed", {
          icon: "❌",
          className: "custom-toast",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        icon: "❌",
        className: "custom-toast",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`signup-page ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? (
          <FaSun className="theme-icon" />
        ) : (
          <FaMoon className="theme-icon" />
        )}
      </div>
      <div className="signup-container">
        <Card className="signup-card">
          <CardHeader className="signup-header">
            <div className="logo-wrapper">
              <span className="feature-icon">🎓</span>
              <h2>Learning Platform</h2>
            </div>
            <p className="tagline">Start Your Learning Adventure</p>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit} className="signup-form">
              <FormGroup className="input-group">
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder=" "
                    required
                  />
                  <Label for="username" className="floating-label">
                    Full Name
                  </Label>
                </div>
              </FormGroup>
              <FormGroup className="input-group">
                <div className="input-wrapper">
                  <FaIdCard className="input-icon" />
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
              <FormGroup check className="checkbox-group">
                <Input type="checkbox" id="terms" required />
                <Label for="terms" check>
                  I agree to the{" "}
                  <a href="#" className="terms-link">
                    Terms & Conditions
                  </a>
                </Label>
              </FormGroup>
              <Button className="signup-btn" disabled={isLoading}>
                {isLoading ? (
                  <span>
                    <span className="spinner"></span> Signing Up...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </Button>
              {isLoading && <div className="progress-bar"></div>}
            </Form>
            <div className="login-link">
              <p>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={() => navigate("/login")}
                  className="login-text"
                >
                  Login
                </a>
              </p>
            </div>
            <div className="secure-badge">🔒 Secure Signup</div>
          </CardBody>
        </Card>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SignUp;
