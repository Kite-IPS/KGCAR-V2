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
import SoftButton from "components/SoftButton";
import './index.css';
import { useNavigate } from "react-router-dom";

function DocSearchHeader() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [studentData, setStudentData] = useState([]); // Initialize as empty array
  const navigate = useNavigate();
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
    console.log("Search term:", searchTerm);
    if (searchTerm) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/student/${searchTerm}/`, {
          method: "GET",
          headers: {
            "Authorization": "Basic " + btoa("admin:admin"),
            "Content-Type": "application/json",
          },
        });
        if (response.data && (Array.isArray(response.data) || Object.keys(response.data).length > 0)) {
          setStudentData([response.data]); // Wrap response in an array if it's a single object
          setErrorMessage("");
        } else {
          throw new Error("No student found");
        }
      } catch (error) {
        setErrorMessage(error.message || "An error occurred");
        setStudentData([]);
        setOpenSnackbar(true); 
      }
    } else {
      setErrorMessage("Please enter an admission number");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage(""); // Clear error message when Snackbar is closed
  };

  const renderStudentTable = () => {
    if (Array.isArray(studentData) && studentData.length > 0) {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ mt: 3, py: 2, px: 3 }}>
              <SoftTypography variant="h6" fontWeight="bold">Student Details</SoftTypography>
              <table style={{ width: "100%", marginTop: "1rem" }}>
                <thead style={{color: "black" ,fontSize: "1rem"}}>
                  <tr>
                    <th align="center">Name</th>
                    <th align="center">Admission No</th>
                    <th align="center">Department</th>
                    <th align="center">Email</th>
                    <th align="center">Status</th>
                  </tr>
                </thead>
                <tbody style={{color: "#8392ab" ,fontSize: "0.9rem",}} className="mt-2">
                  {studentData.map((student) => (
                    <tr key={student.admission_no} style={{ marginTop: "30px" }}>
                      <td align="center">{student.name}</td>
                      <td align="center">{student.admission_no}</td>
                      <td align="center">{student.department}</td>
                      <td align="center">{student.email}</td>
                      <td align="center">
                        <SoftButton variant="text" color="info" onClick={()=>navigate(`/edit-student/${student.admission_no}/`)}>View</SoftButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Grid>
        </Grid>
      );
    } 
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light className="searchstudent-searchbox" />
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" position="relative" minHeight="18.75rem" width="100%">
        <Card sx={{ mt: -8, mx: 3, py: 2, px: 2 }} style={{ width: "100%" }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6}>
              <SoftTypography variant="h4" fontWeight="bold">SEARCH STUDENTS</SoftTypography>
            </Grid>
            <Grid item xs={"100%"} style={{ display: "flex", justifyContent: "flex-end", marginLeft: "20%" }}>
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
              <SoftButton onClick={handleSearch} variant="contained" color="info">
                Search
              </SoftButton>
            </Grid>
          </Grid>
        </Card>
      </SoftBox>

      {renderStudentTable()}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </SoftBox>
  );
}

export default DocSearchHeader;
