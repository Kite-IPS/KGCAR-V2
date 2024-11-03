import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom"; // Import useParams

function StudentDetailPage() {
  const [student, setStudent] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [submitAgreement, setSubmitAgreement] = useState(false);
  const admissionNo = window.location.href.split('/').pop();
  console.log("admissionNo", admissionNo); // Output: 33442


  console.log("admissionNo", admissionNo);
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/student/${admissionNo}/`, {
          method: "GET",
          headers: {
            "Authorization": "Basic " + btoa("admin:admin"), // Replace with actual credentials
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        console.log(data);
        setStudent(data.student); // Assuming the response structure has a 'student' object
        setDocuments(data.documents); // Assuming there is a 'documents' array in the response
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [admissionNo]); // Fetch data whenever the admissionNo changes

  if (!student) {
    return <Typography align="center">Loading...</Typography>; // Show loading until data is fetched
  }

  const currentDate = new Date().toLocaleDateString();

  const handleCheckboxChange = (index, field) => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc, i) =>
        i === index ? { ...doc, [field]: !doc[field] } : doc
      )
    );
  };

  const handleCountChange = (index, event) => {
    const { value } = event.target;
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc, i) => (i === index ? { ...doc, count: value } : doc))
    );
  };

  return (
    <Card sx={{ padding: 2, margin: "1rem auto", maxWidth: "1000px" }}>
      {/* Student Information */}
      <Typography variant="h6" mb={1}>Student Details</Typography>
      <Grid container spacing={1}>
        {Object.entries(student).map(([key, value]) => (
          <Grid item xs={12} sm={6} key={key}>
            <Typography variant="subtitle2" style={{ fontSize: "0.9rem" }}>{key.replace(/([A-Z])/g, " $1")}</Typography>
            <TextField value={value} fullWidth disabled variant="outlined" size="small" />
          </Grid>
        ))}
      </Grid>

      {/* Document Table */}
      <Typography variant="h6" mt={3} mb={1}>Document Details</Typography>
      <TableContainer>
        <Table sx={{ width: "100%", border: "1px solid #ddd" }}>
          <TableHead sx={{ padding: 0, width: "100%" }}>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold", width: "10%" }}>S.No</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold", width: "25%" }}>Document</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold", width: "15%" }}>Date</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold", width: "15%" }}>Original</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold", width: "15%" }}>Photocopy</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold", width: "20%" }}>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={doc.sNo} sx={{ borderBottom: "1px solid #ddd" }}>
                <TableCell align="center" style={{ padding: "4px" }}>1</TableCell>
                <TableCell align="center" style={{ padding: "4px" }}>document</TableCell>
                <TableCell align="center" style={{ padding: "4px" }}>{currentDate}</TableCell>
                <TableCell align="center" style={{ padding: "4px" }}>
                  <Checkbox
                    size="small"
                    checked={!!doc.original}
                    onChange={() => handleCheckboxChange(index, "original")}
                  />
                </TableCell>
                <TableCell align="center" style={{ padding: "4px" }}>
                  <Checkbox
                    size="small"
                    checked={!!doc.photocopy}
                    onChange={() => handleCheckboxChange(index, "photocopy")}
                  />
                </TableCell>
                <TableCell align="center" style={{ padding: "4px" }}>
                  <TextField
                    type="number"
                    value={doc.count || ""}
                    onChange={(e) => handleCountChange(index, e)}
                    inputProps={{ min: 0 }}
                    variant="outlined"
                    size="small"
                    sx={{ width: "80px" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Submit Section */}
      <Grid container spacing={1} mt={2} alignItems="center">
        <Grid item>
          <Checkbox
            checked={submitAgreement}
            onChange={(e) => setSubmitAgreement(e.target.checked)}
          />
          <Typography variant="body2" display="inline">
            I confirm that all information is correct.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={!submitAgreement}
            onClick={() => console.log("Form submitted")}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default StudentDetailPage;
