import React, { useEffect, useState } from "react";
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton"; // Make sure to have a SoftButton component

function Table() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/"); // Replace with your backend API URL
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setStudents(data.slice(0, 7)); // Get last 7 students
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Render loading state
  if (loading) return <SoftTypography align="center">Loading...</SoftTypography>;

  // Render error state or no data
  if (error || students.length === 0) {
    return (
      <SoftBox textAlign="center" mt={5}>
        <SoftTypography>No student has been added</SoftTypography>
      </SoftBox>
    );
  }

  const columns = [
    { name: "student name", align: "left" },
    { name: "admission no", align: "center" },
    { name: "department", align: "center" },
    { name: "action", align: "center" },
  ];

  const renderColumns = columns.map(({ name, align }) => (
    <SoftBox
      key={name}
      component="th"
      pt={1.5}
      pb={1.25}
      pl={align === "left" ? 3 : 1}
      pr={align === "right" ? 1 : 3}
      textAlign={align}
      fontSize="0.875rem"
      fontWeight="bold"
      color="secondary"
      opacity={0.7}
    >
      {name.toUpperCase()}
    </SoftBox>
  ));

  const renderRows = students.map((student, key) => (
    <TableRow key={key}>
      <SoftBox component="td" p={1} textAlign="left">
        <SoftTypography variant="button" fontWeight="regular" color="secondary">
          {student.name} {/* Adjust according to your student object structure */}
        </SoftTypography>
      </SoftBox>
      <SoftBox component="td" p={1} textAlign="center">
        <SoftTypography variant="caption" color="secondary">
          {student.admissionNo} {/* Adjust accordingly */}
        </SoftTypography>
      </SoftBox>
      <SoftBox component="td" p={1} textAlign="center">
        <SoftTypography variant="caption" color="secondary">
          {student.department} {/* Adjust accordingly */}
        </SoftTypography>
      </SoftBox>
      <SoftBox component="td" p={1} textAlign="center">
        <SoftButton variant="text" color="primary" onClick={() => console.log(`Editing ${student.name}`)}>
          Edit
        </SoftButton>
      </SoftBox>
    </TableRow>
  ));

  return (
    <TableContainer>
      <MuiTable>
        <SoftBox component="thead">
          <TableRow>{renderColumns}</TableRow>
        </SoftBox>
        <TableBody>{renderRows}</TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
