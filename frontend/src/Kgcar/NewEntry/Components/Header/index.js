import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import breakpoints from "assets/theme/base/breakpoints";
import curved0 from "assets/images/curved-images/curved0.jpg";

function DocHeader() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [inputFields, setInputFields] = useState({
    textField1: "", // stdname
    textField2: "", // admno
    textField3: "", // parentname
    textField4: "", // stdno
    textField5: "", // parentno
    textField6: "", // email
  });
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("error");

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

  const handleInputChange = (event) => {
    setInputFields({
      ...inputFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    // Reset input fields immediately on submit
    setInputFields({
      textField1: "",
      textField2: "",
      textField3: "",
      textField4: "",
      textField5: "",
      textField6: "",
    });
    setDropdown1("");
    setDropdown2("");
  
    const allFieldsFilled = Object.values(inputFields).every(field => field) && dropdown1 && dropdown2;
  
    if (!allFieldsFilled) {
      setMessage("Please fill all fields.");
      setMessageColor("error");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }
  
    const data = {
      name_std: inputFields.textField1,
      admno: inputFields.textField2,
      parent_name: inputFields.textField3,
      dept: dropdown1,
      student_number: inputFields.textField4,
      parent_number: inputFields.textField5,
      email: inputFields.textField6,
      quote: Number(dropdown2),
    };
    console.log(data);
    try {
      const response = await fetch("http://127.0.0.1:8000/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        setMessage("Student added successfully!"); // Success message
        setMessageColor("success");
      } else {
        setMessage("Student is not added."); // Error message
        setMessageColor("error");
      }
    } catch (error) {
      setMessage("Student is not added."); // Error message in case of network issues
      setMessageColor("error");
    }
  
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
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
        <Grid container spacing={3}>
          {/* First Row: 3 Text Fields + 1 Dropdown */}
          <Grid item xs={12} sm={6} md={3}>
            <SoftTypography variant="body2" sx={{ mb: 1 }}>Student Name</SoftTypography>
            <TextField
              name="textField1"
              variant="outlined"
              fullWidth
              value={inputFields.textField1}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SoftTypography variant="body2" sx={{ mb: 1 }}>Admission No</SoftTypography>
            <TextField
              name="textField2"
              variant="outlined"
              fullWidth
              value={inputFields.textField2}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SoftTypography variant="body2" sx={{ mb: 1 }}>Parent Name</SoftTypography>
            <TextField
              name="textField3"
              variant="outlined"
              fullWidth
              value={inputFields.textField3}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SoftTypography variant="body2" sx={{ mb: 1 }}>Department</SoftTypography>
            <Select
              value={dropdown1}
              onChange={(e) => setDropdown1(e.target.value)}
              displayEmpty
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>Select an option</MenuItem>
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="AIDS">AI & DS</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
              <MenuItem value="CSBS">CSBS</MenuItem>
              <MenuItem value="MECH">MECH</MenuItem>
              <MenuItem value="CYS">CYS</MenuItem>
              <MenuItem value="AIML">AI & ML</MenuItem>
              <MenuItem value="MBA">MBA</MenuItem>
            </Select>
          </Grid>

          {/* Second Row: 3 Text Fields + 1 Dropdown */}
          <Grid item xs={12} sm={6} md={3}>
            <SoftTypography variant="body2" sx={{ mb: 1 }}>Student No</SoftTypography>
            <TextField
              name="textField4"
              variant="outlined"
              fullWidth
              value={inputFields.textField4}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SoftTypography variant="body2" sx={{ mb: 1 }}>Parent No</SoftTypography>
            <TextField
              name="textField5"
              variant="outlined"
              fullWidth
              value={inputFields.textField5}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SoftTypography variant="body2" sx={{ mb: 1 }}>Email</SoftTypography>
            <TextField
              name="textField6"
              variant="outlined"
              fullWidth
              value={inputFields.textField6}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SoftTypography variant="body2" sx={{ mb: 1 }}>Quote</SoftTypography>
            <Select
              value={dropdown2}
              onChange={(e) => setDropdown2(e.target.value)}
              displayEmpty
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>Select an option</MenuItem>
              <MenuItem value="1">management Quote</MenuItem>
              <MenuItem value="0">Government Quote</MenuItem>
            </Select>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>

        {/* Success/Error Snackbar */}
        {/* Success/Error Snackbar */}
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

