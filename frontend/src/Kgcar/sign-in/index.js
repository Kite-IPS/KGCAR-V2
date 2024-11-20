import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link and useNavigate
import axios from "axios";

// @mui material components
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import KgcarCoverLayout from "./CoverLayout";

function KgcarSignIn() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!userId || !password) {
      setError("Both fields are required!");
      return;
    }

    try {
      // Send login data to the backend
      const response = await axios.post("http://127.0.0.1:8000/login", {
        userId,
        password,
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/newentry"); // Navigate to new entry page
        }, 1000);
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <KgcarCoverLayout
      title="Welcome back"
      description="Enter your User Id and password to Login"
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleLogin}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              User Id
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            placeholder="User id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit">
            Sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="https://smartside.in"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Contact Admin
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>

      {/* Snackbar for errors */}
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {/* Snackbar for success */}
      {success && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
            Login successful! Redirecting...
          </Alert>
        </Snackbar>
      )}
    </KgcarCoverLayout>
  );
}

export default KgcarSignIn;
