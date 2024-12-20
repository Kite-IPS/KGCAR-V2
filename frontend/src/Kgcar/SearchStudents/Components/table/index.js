import React, { useEffect, useState } from "react";
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";

function Table() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/student-info/", {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa("admin:admin"), // Replace with actual credentials
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(data);
        setStudents(data.students.slice(-7)); // Get last 7 students from the `students` array
      } catch (err) {
        console.error("Error fetching students:", err); // Logs the error for debugging
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <SoftTypography align="center">Loading...</SoftTypography>;

  if (error || students.length === 0) {
    return (
      <SoftBox textAlign="center" mt={5}>
        <SoftTypography>No student has been added</SoftTypography>
      </SoftBox>
    );
  }

  const columns = [
    { name: "Student Name", align: "center" },
    { name: "Admission No", align: "center" },
    { name: "Department", align: "center" },
    { name: "Version", align: "center" },
    { name: "Action", align: "center" },
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
      color="dark"
      opacity={1}
    >
      {name.toUpperCase()}
    </SoftBox>
  ));

  const renderRows = students.map((student, key) => (
    <TableRow key={key}>
      <SoftBox component="td" p={1} textAlign="center">
        <SoftTypography variant="button" fontWeight="regular" color="secondary">
          {student.name}
        </SoftTypography>
      </SoftBox>
      <SoftBox component="td" p={1} textAlign="center">
        <SoftTypography variant="caption" color="secondary">
          {student.admission_no}
        </SoftTypography>
      </SoftBox>
      <SoftBox component="td" p={1} textAlign="center">
        <SoftTypography variant="caption" color="secondary">
          {student.department}
        </SoftTypography>
      </SoftBox>
      <SoftBox component="td" p={1} textAlign="center">
        <SoftTypography variant="caption" color="secondary">
          {student.ver}
        </SoftTypography>
      </SoftBox>
      <SoftBox component="td" p={1} textAlign="center">
        <SoftButton
          variant="text"
          color="info"
          onClick={() => navigate(`/edit-student/${student.admission_no}`)}
        >
          View
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
