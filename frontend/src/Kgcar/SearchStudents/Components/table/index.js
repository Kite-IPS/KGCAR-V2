import React, { useEffect, useState } from "react";
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import searchStudentData from "../../../../Data/studentData.json";

function Table() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Extract student data from JSON and set the last 7 students
    if (Array.isArray(searchStudentData.searchStudentData)) {
      setStudents(searchStudentData.searchStudentData.slice(-7));
    } else {
      console.error("Invalid student data format");
    }
  }, []);

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
