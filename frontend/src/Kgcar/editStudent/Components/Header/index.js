import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import { Select, MenuItem } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import breakpoints from "assets/theme/base/breakpoints";
import curved0 from "assets/images/curved-images/curved0.jpg";
import Table from "Kgcar/NewEntry/Components/table";
import PropTypes from "prop-types";
import './index.css';


function DocHeader({ columns, rows }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [studentData, setStudentData] = useState({
    name: "",
    admission_no: "",
    department: "",
    parent_name: "",
    student_number: "",
    parent_number: "",
    email: "",
    quota: "",
    version: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("error");

  const departmentOptions = ["CSE", "AIDS", "ECE", "CSBS", "IT", "MECH", "CYS", "AIML", "MBA"];
  useEffect(() => {
    const handleTabsOrientation = () => {
      setTabsOrientation(window.innerWidth < breakpoints.values.sm ? "vertical" : "horizontal");
    };
    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, []);

  useEffect(() => {
    const studentId = window.location.pathname.split("/").pop();
    fetchStudentData(studentId);
  }, []);

  const fetchStudentData = async (studentId) => {
    const username = "admin";
    const password = "admin";
    const credentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch(`http://127.0.0.1:8000/student/${studentId}`, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudentData(data);
        setMessage("Data loaded successfully!");
        setMessageColor("success");
      } else {
        setMessage("Failed to load data.");
        setMessageColor("error");
      }
    } catch (error) {
      setMessage("Error loading data.");
      setMessageColor("error");
      console.error("Error fetching student data:", error);
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <SoftBox position="relative" >
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
        minHeight="50rem"
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container>
          {/* Manually render each field */}
          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">NAME</SoftTypography>
            {isEditing ? (
              <TextField name="name" value={studentData.name} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography>{studentData.name}</SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">ADMISSION NO</SoftTypography>
            {isEditing ? (
              <TextField name="admission_no" value={studentData.admission_no} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography>{studentData.admission_no}</SoftTypography>
            )}
          </Grid>

          {/* Continue with each specific field in this manner */}
          {/* Department */}
          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear"className="heading" >E-MAIL</SoftTypography>
            {isEditing ? (
              <TextField name="email" value={studentData.email} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography>{studentData.email}</SoftTypography>
            )}
          </Grid>

          {/* Version - Non-editable */}
          

          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">STUDENT NUMBER</SoftTypography>
            {isEditing ? (
              <TextField name="student_number" value={studentData.student_number} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography>{studentData.student_number}</SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">PARENT NUMBER</SoftTypography>
            {isEditing ? (
              <TextField name="parent_number" value={studentData.parent_number} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography>{studentData.parent_number}</SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">PARENT NAME</SoftTypography>
            {isEditing ? (
              <TextField name="parent_name" value={studentData.parent_name} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography>{studentData.parent_name}</SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">DEPARTMENT</SoftTypography>
            {isEditing ? (
              <Select
                name="department"
                value={studentData.department}
                onChange={handleInputChange}
                fullWidth
              >
                {departmentOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <SoftTypography>{studentData.department}</SoftTypography>
            )}
          </Grid>


          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">QUOTA</SoftTypography>
            {isEditing ? (
              <Select
                name="quota"
                value={studentData.quota ? 0 : 1} // Sets default as per backend values (0 for Management, 1 for Government)
                onChange={(e) =>
                  handleInputChange({
                    target: { name: "quota", value: e.target.value === 0 }
                  })
                }
                fullWidth
              >
                <MenuItem value={0}>Management</MenuItem>
                <MenuItem value={1}>Government</MenuItem>
              </Select>
            ) : (
              <SoftTypography>{studentData.quota ? "Management" : "Government"}</SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">VERSION</SoftTypography>
            <SoftTypography>{studentData.ver}</SoftTypography>
          </Grid>

          
          <SoftBox py={3} mt={7}>
            <Table columns={columns} rows={rows} />
          </SoftBox>

          <Grid container justifyContent="flex-end" sx={{ mt: 4 }}>
            <Button variant="contained" onClick={handleEditClick}>
              {isEditing ? "Save" : "Edit"}
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          open={showMessage}
          onClose={() => setShowMessage(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3000}
        >
          <Alert
            severity={messageColor === "error" ? "error" : "success"}
            sx={{
              backgroundColor: messageColor === "error" ? "#d32f2f" : "#388e3c",
              color: "#fff",
              fontWeight: "bold",
              boxShadow: 3,
              borderRadius: 2,
              padding: "0.75rem 1.5rem",
              "& .MuiAlert-icon": {
                fontSize: "1.5rem",
                color: "#fff",
              },
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Card>
    </SoftBox>
  );
}

DocHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default DocHeader;
