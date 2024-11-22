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
import PropTypes from "prop-types";
import './index.css';
import { useNavigate } from "react-router-dom";   
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
  const [documentData, setDocumentData] = useState([]);
  const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);
  const navigate = useNavigate();


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
      const response = await fetch(`http://127.0.0.1:8000/edit/${studentId}/`, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudentData(data.student_info);
        setDocumentData(data.documents);
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
    setIsCheckboxVisible(!isCheckboxVisible);
  };
  const handleCheckboxChange = (event) => {
    setStudentData((prevData) => ({
      ...prevData,
      lock: event.target.checked,
    }));
  };
  
  const handleInputChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const username = "admin";
    const password = "admin";
    const credentials = btoa(`${username}:${password}`);

    try {
      const studentId = window.location.pathname.split("/").pop();
      const payload = {
        student_info: studentData,
        documents: documentData,
      };
  
      const response = await fetch(`http://127.0.0.1:8000/edit/${studentId}/`, {
        method: "PUT",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        setMessage("Data saved successfully!");
        setMessageColor("success");
        navigate(`/search-students`);
        setIsEditing(false); // Exit edit mode after successful save
      } else {
        setMessage("Failed to save data.");
        setMessageColor("error");
      }
    } catch (error) {
      setMessage("Error saving data.");
      setMessageColor("error");
      console.error("Error submitting data:", error);
    }
  
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };
  
  const handleDocumentChange = (index, field, value) => {
    const updatedDocuments = [...documentData];
    updatedDocuments[index][field] = value;
    setDocumentData(updatedDocuments);
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
        <Grid container><Grid item xs={12} sm={6} md={3} >
          <SoftTypography variant="linear" className="heading">NAME</SoftTypography>
          {isEditing ? (
            <TextField name="name" value={studentData.name} onChange={handleInputChange} fullWidth />
          ) : (
            <SoftTypography fontSize="1rem">{studentData.name}</SoftTypography>
          )}
        </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">ADMISSION NO</SoftTypography>
            {isEditing ? (
              <TextField name="admission_no" value={studentData.admission_no} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography fontSize="1rem">{studentData.admission_no}</SoftTypography>
            )}
          </Grid>

          {/* Continue with each specific field in this manner */}
          {/* Department */}
          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading" >E-MAIL</SoftTypography>
            {isEditing ? (
              <TextField name="email" value={studentData.email} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography fontSize="1rem">{studentData.email}</SoftTypography>
            )}
          </Grid>

          {/* Version - Non-editable */}


          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">STUDENT NUMBER</SoftTypography>
            {isEditing ? (
              <TextField name="student_number" value={studentData.student_number} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography fontSize="1rem">{studentData.student_number}</SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">PARENT NUMBER</SoftTypography>
            {isEditing ? (
              <TextField name="parent_number" value={studentData.parent_number} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography fontSize="1rem">{studentData.parent_number}</SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">PARENT NAME</SoftTypography>
            {isEditing ? (
              <TextField name="parent_name" value={studentData.parent_name} onChange={handleInputChange} fullWidth />
            ) : (
              <SoftTypography fontSize="1rem">{studentData.parent_name}</SoftTypography>
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
                  <MenuItem key={option} value={option} fontSize="1rem">
                    {option}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <SoftTypography fontSize="1rem">{studentData.department}</SoftTypography>
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
              <SoftTypography fontSize="1rem">{studentData.quota ? "Management" : "Government"}</SoftTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <SoftTypography variant="linear" className="heading">VERSION</SoftTypography>
            <SoftTypography fontSize="1rem">{studentData.ver}</SoftTypography>
          </Grid>



          <SoftBox py={3} mt={7}>
            <div className="table-responsive">
              <table className="table align-items-center mb-0">
                <thead className="table-head-style">
                  <tr className="table-header-style">
                    <th className="heading-table">S.No</th>
                    <th className="heading-table">Documents</th>
                    <th className="heading-table">Original</th>
                    <th className="heading-table">Photocopy</th>
                    <th className="heading-table">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {documentData.map((document, index) => (
                    <tr className="table-top" key={index}>
                      {/* Serial number */}
                      <td>
                        <div className="text-align-center">{index + 1}</div>
                      </td>
                      {/* Document name */}
                      <td className="text-align-center">
                        <div className="document-name">{document.document_name}</div>
                      </td>
                      {/* Original checkbox */}
                      <td className="text-align-center">
                        {isEditing ? (
                          <input
                            type="checkbox"
                            name={`original-${index}`}
                            checked={document.original}
                            onChange={(e) => handleDocumentChange(index, "original", e.target.checked)}
                            style={{ width: "20px", height: "20px" }}
                          />
                        ) : (
                          <input
                            type="checkbox"
                            checked={document.original}
                            disabled
                            style={{ width: "20px", height: "20px" }}
                          />
                        )}
                      </td>
                      {/* Photocopy checkbox */}
                      <td className="text-align-center">
                        {isEditing ? (
                          <input
                            type="checkbox"
                            name={`photocopy-${index}`}
                            checked={document.photocopy}
                            onChange={(e) => handleDocumentChange(index, "photocopy", e.target.checked)}
                            style={{ width: "20px", height: "20px" }}
                          />
                        ) : (
                          <input
                            type="checkbox"
                            checked={document.photocopy}
                            disabled
                            style={{ width: "20px", height: "20px" }}
                          />
                        )}
                      </td>
                      {/* Count input */}
                      <td className="text-align-center">
                        {isEditing ? (
                          <input
                          type="number"
                          name={`count-${index}`}
                          min="0"
                          className="form-control"
                          value={document.count || (document.photocopy ? 1 : 0)} 
                          onChange={(e) => handleDocumentChange(index, "count", parseInt(e.target.value, 10) || 0)}
                          style={{ width: "80px", padding: "10px" }}
                        />
                        
                        ) : (
                          <div className="text-align-center">
                            {document.count === 0 ? (
                              document.photocopy ? (
                                1
                              ) : (
                                document.count
                              )
                            ) : (
                              document.count
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SoftBox>

          <Grid container justifyContent="flex-end" sx={{ mt: 4 }}>
            {isEditing ? (
              <>
                
                <div className="form-check">
                  <label htmlFor="lock-checkbox" className="form-check-label" style={{ marginRight: "20px" }}>
                    Lock changes
                  </label>
                  <input
                    type="checkbox"
                    id="lock-checkbox"
                    checked={studentData.lock}
                    onChange={handleCheckboxChange}
                    style={{margin: "0 20px 0 0", height: "15px", width: "15px"}}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ marginRight: 2 }}
                >
                  Save
                </Button>
              </>
            ) : (
              /* Edit Button */
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditClick}
              >
                Edit
              </Button>
            )}
          </Grid>

        </Grid>

        <Snackbar
          open={showMessage}
          onClose={() => setShowMessage(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={messageColor}>{message}</Alert>
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
