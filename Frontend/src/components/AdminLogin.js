import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

const AdminLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleGenerateOtp = () => {
    if (!phoneNumber.match(/^\d{10}$/)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    setErrorMessage("");
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(generatedOtp);
    setIsOtpSent(true);

    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Your OTP", {
            body: `Your OTP is: ${generatedOtp}`,
          });
        }
      });
    }
  };

  const handleLogin = () => {
    if (otp === generatedOtp) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center mb-4">
            Admin Login
          </CardTitle>
          {isLoggedIn ? (
            <Alert color="success" className="text-center">
              Successfully logged in! Redirecting...
            </Alert>
          ) : (
            <Form>
              {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
              <FormGroup>
                <Label for="phoneNumber">Phone Number</Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter 10-digit phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormGroup>
              <Button
                color="primary"
                className="w-100 mb-3"
                onClick={handleGenerateOtp}
                disabled={isOtpSent}
              >
                {isOtpSent ? "OTP Sent" : "Generate OTP"}
              </Button>
              {isOtpSent && (
                <>
                  <FormGroup>
                    <Label for="otp">Enter OTP</Label>
                    <Input
                      type="text"
                      id="otp"
                      placeholder="Enter received OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </FormGroup>
                  <Button
                    color="success"
                    className="w-100"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </>
              )}
            </Form>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default AdminLogin;
