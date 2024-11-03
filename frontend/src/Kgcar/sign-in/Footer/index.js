// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function KgcarSigninFooter() {
  return (
    <SoftBox component="footer" py={6}>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <SoftTypography variant="body2" color="secondary">
            Designed and Developed by IPS TECH TEAM.
          </SoftTypography>
        </Grid>
    </SoftBox>
  );
}

export default KgcarSigninFooter;
