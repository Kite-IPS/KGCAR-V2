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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SoftButton from "components/SoftButton";
import './index.css';
import { useNavigate } from "react-router-dom";
import studentDataJSON from "../../../../Data/studentData.json"; // Import JSON

function DocSearchHeader() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [studentData, setStudentData] = useState([]); // Initialize as empty array
  const [filteredStudent, setFilteredStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load JSON data into state
    setStudentData(studentDataJSON.searchStudentData);
  }, []);

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

  const handleSearch = () => {
    console.log("Search term:", searchTerm);
    if (!searchTerm) {
      setErrorMessage("Please enter an admission number");
      setOpenSnackbar(true);
      return;
    }

    const student = studentData.find(
      (student) => student.admission_no === searchTerm
    );

    if (student) {
      setFilteredStudent(student);
      setErrorMessage("");
    } else {
      setErrorMessage("No student found");
      setFilteredStudent(null);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage(""); // Clear error message when Snackbar is closed
  };

  const renderStudentTable = () => {
    if (filteredStudent) {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ mt: 3, py: 2, px: 3 }}>
              <SoftTypography variant="h6" fontWeight="bold">
                Student Details
              </SoftTypography>
              <table style={{ width: "100%", marginTop: "1rem" }}>
                <thead style={{ color: "black", fontSize: "1rem" }}>
                  <tr>
                    <th align="center">Name</th>
                    <th align="center">Admission No</th>
                    <th align="center">Department</th>
                    <th align="center">Status</th>
                  </tr>
                </thead>
                <tbody
                  style={{ color: "#8392ab", fontSize: "0.9rem" }}
                  className="mt-2"
                >
                  <tr key={filteredStudent.admission_no}>
                    <td align="center">{filteredStudent.name}</td>
                    <td align="center">{filteredStudent.admission_no}</td>
                    <td align="center">{filteredStudent.department}</td>
                    <td align="center">
                      <SoftButton
                        variant="text"
                        color="info"
                        onClick={() =>
                          navigate(`/edit-student/${filteredStudent.admission_no}`)
                        }
                      >
                        View
                      </SoftButton>
                    </td>
                  </tr>
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
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        width="100%"
      >
        <Card
          sx={{ mt: -8, mx: 3, py: 2, px: 2 }}
          style={{ width: "100%" }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={6}>
              <SoftTypography variant="h4" fontWeight="bold">
                SEARCH STUDENTS
              </SoftTypography>
            </Grid>
            <Grid
              item
              xs={"100%"}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: "20%",
              }}
            >
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </SoftBox>
  );
}

export default DocSearchHeader;
