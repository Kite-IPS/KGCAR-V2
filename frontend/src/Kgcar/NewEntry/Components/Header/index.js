import { useState } from "react";
import {
  Card, Grid, TextField, Select, MenuItem, Button,
  Snackbar, Alert, TableContainer, Table, TableBody,
  TableRow, TableCell, TableHead, Checkbox
} from "@mui/material";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import curved0 from "assets/images/curved-images/curved5.jpg";
import documentData from '../../../../Data/DocumentData.json';

function DocHeader() {
  const [inputFields, setInputFields] = useState({
    textField1: "", textField2: "", textField3: "",
    textField4: "", textField5: "", textField6: ""
  });
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("error");
  const [showTable, setShowTable] = useState(false); // Controls table visibility
  const [tableData, setTableData] = useState([]);


  const setResetfields = () => {
    setInputFields({
      textField1: "", textField2: "", textField3: "",
      textField4: "", textField5: "", textField6: ""
    });
    setDropdown1("");
    setDropdown2("");
  }
  const handleInputChange = (event) => {
    setInputFields({ ...inputFields, [event.target.name]: event.target.value });
  };

  const handleTableChange = (index, field, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = value;
    setTableData(updatedTableData);
  };

  const handleSubmit = async () => {
    // Check if all fields are filled
    if (!Object.values(inputFields).every(field => field) || !dropdown1 || !dropdown2) {
      setMessage("Please fill in all required fields.");
      setMessageColor("error");
      setShowMessage(true);
      return;
    }

    // Prepare the data from the input fields and dropdowns
    setResetfields();

    setMessage("Data collected successfully.");
    setMessageColor("success");
    setShowMessage(true);
  };

  const fetchDocumentNames = async () => {
    try {
      // const response = await fetch("http://127.0.0.1:8000/get-document/", {
      //     headers: {
      //         "Authorization": "Basic " + btoa("admin:admin"),
      //         "Content-Type": "application/json",
      //     },
      // });
      console.log(documentData);


      // Map only the names from the response to the table data
      const updatedTableData = documentData.documentData.map((doc) => ({
        sNo: doc.sNo,
        document: doc.document,  // Extract just the name from each document object
        date: new Date().toISOString().split("T")[0],
        original: false,
        photocopy: false,
        count: ""
      }));
      setTableData(updatedTableData);
      setShowTable(true);

    } catch (error) {
      setMessage("Error fetching document names");
      setMessageColor("error");
      setShowMessage(true);
      console.error("Error:", error);
    }
  };

  const handleButtonClick = () => {
    if (showTable) {
      handleSubmit(); // Submit data if the table is already shown
    } else {
      fetchDocumentNames(); // Fetch document names if the table is hidden
    }
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox display="flex" alignItems="center" minHeight="18.75rem" borderRadius="xl" sx={{
        backgroundImage: `url(${curved0})`, backgroundSize: "cover",
        backgroundPosition: "50%", overflow: "hidden"
      }} />
      <Card minHeight="50rem" sx={{ mt: -8, mx: 3, py: 2, px: 2 }}>
        <Grid container spacing={3}>
          {/* Input Fields and Dropdowns */}
          {["Student Name", "Admission No", "Parent Name", "Student No", "Parent No", "Email"].map((label, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <SoftTypography variant="body2">{label}</SoftTypography>
              <TextField name={`textField${index + 1}`} variant="outlined" fullWidth
                value={inputFields[`textField${index + 1}`]} onChange={handleInputChange} />
            </Grid>
          ))}
          {["Department", "Quota"].map((label, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <SoftTypography variant="body2">{label}</SoftTypography>
              <Select value={index === 0 ? dropdown1 : dropdown2}
                onChange={e => index === 0 ? setDropdown1(e.target.value) : setDropdown2(e.target.value)}
                displayEmpty variant="outlined" fullWidth>
                <MenuItem value="" disabled>Select an option</MenuItem>
                {index === 0
                  ? ["CSE", "AIDS", "IT", "ECE", "CSBS", "MECH", "CYS", "AIML", "MBA"].map((opt, i) => (
                    <MenuItem value={opt} key={i}>{opt}</MenuItem>
                  ))
                  : ["Management Quota", "Government Quota"].map((opt, i) => (
                    <MenuItem value={opt} key={i}>{opt}</MenuItem>
                  ))}
              </Select>
            </Grid>
          ))}

          {/* Document Table */}
          {showTable && (
            <Grid item xs={12}>
              <SoftBox py={3}>
                <TableContainer sx={{ width: "100%" }}>
                  <Table>
                    <TableHead class="newentry-table-head">
                      <TableRow>
                        <TableCell align="center">S.No</TableCell>
                        <TableCell align="center">Document</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Original</TableCell>
                        <TableCell align="center">Photocopy</TableCell>
                        <TableCell align="center">Count</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{row.sNo}</TableCell>
                          <TableCell align="center">{row.document}</TableCell>
                          <TableCell align="center">{row.date}</TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={row.original}
                              sx={{ transform: "scale(2)" }}
                              onChange={(e) => handleTableChange(index, 'original', e.target.checked ? true : false)}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              sx={{ transform: "scale(2)" }}
                              checked={row.photocopy}
                              onChange={(e) => handleTableChange(index, 'photocopy', e.target.checked) ? true : false}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {row.photocopy ? (
                              <TextField
                                type="number"
                                value={row.count || 1}
                                onChange={(e) => handleTableChange(index, 'count', e.target.value)}
                              />

                            ) : (
                              <div style={{ border: "1px solid #ccc", margin: "auto", borderRadius: "4px", textAlign: "center", height: "40px", width: "200px" }}>
                                {row.count}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </SoftBox>
            </Grid>
          )}

          {/* Toggle Button */}
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="contained" fullWidth onClick={handleButtonClick}>
              {showTable ? "Submit" : "Get Document"}
            </Button>
          </Grid>
        </Grid>

        {/* Snackbar for Success/Error Messages */}
        <Snackbar open={showMessage} onClose={() => setShowMessage(false)} autoHideDuration={3000}>
          <Alert severity={messageColor === "error" ? "error" : "success"}>{message}</Alert>
        </Snackbar>
      </Card>
    </SoftBox>
  );
}

export default DocHeader;
