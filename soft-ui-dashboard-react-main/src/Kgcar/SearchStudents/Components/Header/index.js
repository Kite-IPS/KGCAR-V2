import { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import breakpoints from "assets/theme/base/breakpoints";
import axios from "axios"; 
import Snackbar from "@mui/material/Snackbar"; 
import Alert from "@mui/material/Alert"; 
import SoftButton from "components/SoftButton"; // Ensure you have a button component

function DocSearchHeader({ setSearchResults }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.get(`YOUR_BACKEND_API_URL/students?admissionNo=${searchTerm}`);
        if (response.data.length === 0) {
          throw new Error("Student not found");
        }
        setSearchResults(response.data); // This should be the found student data
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
        setSearchResults([]);
        setOpenSnackbar(true);
      }
    } else {
      setErrorMessage("Please enter an admission number");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox display="flex" alignItems="center" position="relative" minHeight="18.75rem">
        <Card sx={{ mt: -8, mx: 3, py: 2, px: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6}>
              <SoftTypography variant="h4" fontWeight="bold">SEARCH STUDENTS</SoftTypography>
            </Grid>
            <Grid item xs={"100%"} style={{ display: "flex", justifyContent: "flex-end" }}>
              <SoftBox pr={6}>
                <TextField
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter admission no..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </SoftBox>
              <SoftButton onClick={handleSearch} variant="contained" color="light">
                Search
              </SoftButton>
            </Grid>
          </Grid>
        </Card>
      </SoftBox>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </SoftBox>
  );
}

// Add PropTypes for the component
DocSearchHeader.propTypes = {
  setSearchResults: PropTypes.func.isRequired, 
};

export default DocSearchHeader;
