import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import breakpoints from "assets/theme/base/breakpoints";
import curved0 from "assets/images/curved-images/curved0.jpg";

function DocHeader() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [studentData, setStudentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("error");

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
        {studentData ? (
          <Grid container spacing={3}>
            {Object.entries(studentData).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <SoftTypography variant="linear">{key.replace("_", " ").toUpperCase()}</SoftTypography>
                {isEditing ? (
                  <TextField
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    fullWidth
                  />
                ) : (
                  <SoftTypography>
                    {key === "quota" ? (value ? "Government Quota" : "Management Quota") : value}
                  </SoftTypography>
                )}
              </Grid>
              
            ))}
            <Grid container justifyContent="flex-end" sx={{ mt: 4 }}>
              <Button variant="contained" onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <SoftTypography variant="linear">Loading...</SoftTypography>
        )}
    
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

export default DocHeader;
