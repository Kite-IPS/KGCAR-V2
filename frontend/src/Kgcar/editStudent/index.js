import React, { useState } from "react";
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

function StudentDetailPage() {
  const [student] = useState({
    name: "John Doe",
    admissionNo: "12345",
    department: "Computer Science",
    parentName: "Jane Doe",
    studentNo: "S001",
    parentNo: "P001",
    email: "john.doe@example.com",
    quote: "Sample quote",
  });

  const [documents, setDocuments] = useState([
    { sNo: 1, name: "Document 1" },
    { sNo: 2, name: "Document 2" },
    { sNo: 3, name: "Document 3" },
    { sNo: 4, name: "Document 4" },
    { sNo: 5, name: "Document 5" },
    { sNo: 6, name: "Document 6" },
    { sNo: 7, name: "Document 7" },
    { sNo: 8, name: "Document 8" },
    { sNo: 9, name: "Document 9" },
    { sNo: 10, name: "Document 10" },
  ]);

  const currentDate = new Date().toLocaleDateString();
  const [submitAgreement, setSubmitAgreement] = useState(false);

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
          <TableHead sx={{padding:0 ,width:"100%"}}>
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
                <TableCell align="center" style={{ padding: "4px" }}>{doc.sNo}</TableCell>
                <TableCell align="center" style={{ padding: "4px" }}>{doc.name}</TableCell>
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
