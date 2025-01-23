import { useState, useEffect } from "react";
import axios from "axios";

// Material UI imports
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Custom components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Images
import curved0 from "assets/images/curved-images/curved0.jpg";

function DocSearchHeader() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (!admissionNo) {
      setErrorMessage("Please enter an admission number.");
      setStudentData(null);
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/download/${admissionNo}`, {
        headers: {
          "Authorization": "Basic " + btoa("admin:admin"),
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        setStudentData(response.data);
        setErrorMessage(""); // Clear error message if data is found
      } else {
        setErrorMessage("No student found with this admission number.");
        setStudentData(null); // Clear student data if no record is found
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      setErrorMessage("An error occurred while fetching the data. Please try again.");
      setStudentData(null); // Clear student data on error
    }
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={6}>
            <SoftTypography variant="h4" fontWeight="bold">
              DOWNLOAD RECEIPT
            </SoftTypography>
          </Grid>
          <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
            <SoftBox pr={6}>
              <TextField
                placeholder="Enter Admission Number"
                value={admissionNo}
                onChange={(e) => setAdmissionNo(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "20px" }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </SoftBox>
          </Grid>
        </Grid>

        {/* Display error message if present */}
        {errorMessage && (
          <SoftBox mt={4}>
            <SoftTypography variant="h6" color="error" textAlign="center">
              {errorMessage}
            </SoftTypography>
          </SoftBox>
        )}

        {/* Display table if student data exists */}
        {studentData && (
          <SoftBox mt={4}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Admission Number</b></TableCell>
                  <TableCell><b>Department</b></TableCell>
                  <TableCell><b>Version</b></TableCell>
                  <TableCell><b>Download</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{studentData.name}</TableCell>
                  <TableCell>{studentData.admission_no}</TableCell>
                  <TableCell>{studentData.department}</TableCell>
                  <TableCell>{studentData.version_count}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleDownload(studentData.admission_no)}>Download</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SoftBox>
        )}
      </Card>
    </SoftBox>
  );
}

export default DocSearchHeader;
