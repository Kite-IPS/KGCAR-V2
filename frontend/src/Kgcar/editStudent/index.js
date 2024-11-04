// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   Grid,
//   Typography,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Checkbox,
//   Button,
// } from "@mui/material";
// import { useParams } from "react-router-dom";

// function StudentDetailPage() {
//   const  admissionNo  = window.location.href.split("/").pop(); // Get the admission number from the URL
//   const [student, setStudent] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [submitAgreement, setSubmitAgreement] = useState(false);
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       setLoading(true); // Start loading
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/student/${admissionNo}/`, {
//           method: "GET",
//           headers: {
//             "Authorization": "Basic " + btoa("admin:admin"), // Replace with actual credentials
//             "Content-Type": "application/json",
//           },
//         });

//         // Log the full response for debugging
//         console.log("Response Status:", response.status);
//         console.log("Response Headers:", response.headers);

//         // Check if the response is okay
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("API Response Data:", data); // Log the response data
        
//         // Assuming the response has student and documents properties
//         if (data) {
//           setStudent(data); // Set student data
//         } else {
//           console.log("No student found in the response");
//           setStudent(null); // Explicitly set to null if no student data
//         }
        
//         setDocuments(data.documents || []); // Set documents or empty array
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//         setStudent(null); // Set to null on error
//       } finally {
//         setLoading(false); // End loading
//       }
//     };

//     fetchStudentData();
//   }, [admissionNo]); // Fetch data whenever the admissionNo changes

//   // Show loading state
//   if (loading) {
//     return <Typography align="center">Loading...</Typography>;
//   }

//   // Show message if student data is not available
//   if (!student) {
//     return <Typography align="center">No student data available.</Typography>;
//   }

//   const currentDate = new Date().toLocaleDateString();

//   const handleCheckboxChange = (index, field) => {
//     setDocuments((prevDocuments) =>
//       prevDocuments.map((doc, i) =>
//         i === index ? { ...doc, [field]: !doc[field] } : doc
//       )
//     );
//   };

//   const handleCountChange = (index, event) => {
//     const { value } = event.target;
//     setDocuments((prevDocuments) =>
//       prevDocuments.map((doc, i) => (i === index ? { ...doc, count: value } : doc))
//     );
//   };

//   return (
//     <Card sx={{ padding: 2, margin: "1rem auto", maxWidth: "1000px" }}>
//       <Typography variant="h6" mb={1}>Student Details</Typography>
//       <Grid container spacing={1}>
//         {Object.entries(student).map(([key, value]) => (
//           <Grid item xs={12} sm={6} key={key}>
//             <Typography variant="subtitle2" style={{ fontSize: "0.9rem" }}>
//               {key.replace(/([A-Z])/g, " $1")}
//             </Typography>
//             <TextField value={value} fullWidth disabled variant="outlined" size="small" />
//           </Grid>
//         ))}
//       </Grid>

//       <Typography variant="h6" mt={3} mb={1}>Document Details</Typography>
//       <TableContainer>
//         <Table sx={{ width: "100%", border: "1px solid #ddd" }}>
//           <TableHead>
//             <TableRow>
//               <TableCell align="center" style={{ fontWeight: "bold", width: "10%" }}>S.No</TableCell>
//               <TableCell align="center" style={{ fontWeight: "bold", width: "25%" }}>Document</TableCell>
//               <TableCell align="center" style={{ fontWeight: "bold", width: "15%" }}>Date</TableCell>
//               <TableCell align="center" style={{ fontWeight: "bold", width: "15%" }}>Original</TableCell>
//               <TableCell align="center" style={{ fontWeight: "bold", width: "15%" }}>Photocopy</TableCell>
//               <TableCell align="center" style={{ fontWeight: "bold", width: "20%" }}>Count</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {documents.map((doc, index) => (
//               <TableRow key={index} sx={{ borderBottom: "1px solid #ddd" }}>
//                 <TableCell align="center" style={{ padding: "4px" }}>{index + 1}</TableCell>
//                 <TableCell align="center" style={{ padding: "4px" }}>{doc.documentName || "Document Name"}</TableCell>
//                 <TableCell align="center" style={{ padding: "4px" }}>{currentDate}</TableCell>
//                 <TableCell align="center" style={{ padding: "4px" }}>
//                   <Checkbox
//                     size="small"
//                     checked={!!doc.original}
//                     onChange={() => handleCheckboxChange(index, "original")}
//                   />
//                 </TableCell>
//                 <TableCell align="center" style={{ padding: "4px" }}>
//                   <Checkbox
//                     size="small"
//                     checked={!!doc.photocopy}
//                     onChange={() => handleCheckboxChange(index, "photocopy")}
//                   />
//                 </TableCell>
//                 <TableCell align="center" style={{ padding: "4px" }}>
//                   <TextField
//                     type="number"
//                     value={doc.count || ""}
//                     onChange={(e) => handleCountChange(index, e)}
//                     inputProps={{ min: 0 }}
//                     variant="outlined"
//                     size="small"
//                     sx={{ width: "80px" }}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Grid container spacing={1} mt={2} alignItems="center">
//         <Grid item>
//           <Checkbox
//             checked={submitAgreement}
//             onChange={(e) => setSubmitAgreement(e.target.checked)}
//           />
//           <Typography variant="body2" display="inline">
//             I confirm that all information is correct.
//           </Typography>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={!submitAgreement}
//             onClick={() => console.log("Form submitted")}
//           >
//             Submit
//           </Button>
//         </Grid>
//       </Grid>
//     </Card>
//   );
// }

// export default StudentDetailPage;
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data

import NewEntryTableData from "Kgcar/NewEntry/Components/table/NewEntryTabledata";
import projectsTableData from "layouts/tables/data/projectsTableData";
import DocHeader from "./Components/Header";
import KgcarFooter from "Kgcar/Footer";

function DocTables() {
  const { columns, rows } = NewEntryTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DocHeader columns={columns} rows={rows}/>
      <SoftBox py={3}></SoftBox>

      {/* <Table columns={columns} rows={rows} /> */}
      {/* <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Authors table</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[2]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox> */}
      <KgcarFooter />
    </DashboardLayout>
  );
}

export default DocTables;
