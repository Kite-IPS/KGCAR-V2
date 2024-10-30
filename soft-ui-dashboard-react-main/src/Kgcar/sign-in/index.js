import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
// import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import KgcarCoverLayout from "./CoverLayout";

function KgcarSignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <KgcarCoverLayout
      title="Welcome back"
      description="Enter your User Id and password to Login"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              User Id
            </SoftTypography>
          </SoftBox>
          <SoftInput type="text" placeholder="User id" />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth>
            sign in
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
    </KgcarCoverLayout>
  );
}

export default KgcarSignIn;
