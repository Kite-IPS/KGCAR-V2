import React, { useEffect, useState } from "react";
import { Card, Button } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import KgcarFooter from "Kgcar/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DocSearchHeader from "./Components/Header";
import axios from "axios";
import './index.css';

function KgcarDownloadTables() {
  const [students, setStudents] = useState([]);

  // Fetch data from the server
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/download/",{
          method: "GET",
          headers: {
            "Authorization": "Basic " + btoa("admin:admin"),
            "Content-Type": "application/json",
          },
        });
        setStudents(response.data.locked_students);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };
    fetchStudents();
  }, []);

  // Handle the download button click
  const handleDownload = async (admissionNo) => {
    try {
      const response = await axios.post("http://your-backend-url/download", { admission_no: admissionNo });
      // Handle file download logic here
      console.log("File download response:", response.data);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <DashboardLayout>
      <DocSearchHeader />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Student Table</SoftTypography>
            </SoftBox>
            <SoftBox>
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead className="table-head-style">
                    <tr className="table-header-style">
                      <th className="heading-table">Student</th>
                      <th className="heading-table">Admission Number</th>
                      <th className="heading-table">Department</th>
                      <th className="heading-table">Version</th>
                      <th className="heading-table">Downloads</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index} className="table-top">
                        <td>
                          <div className="student-name text-align-center text-d">
                            {student.name}
                          </div>
                        </td>
                        <td>
                          <div className="adm-no text-align-center text-d">
                            {student.admission_no}
                          </div>
                        </td>
                        <td>
                          <div className="department text-align-center text-d">
                            {student.department}
                          </div>
                        </td>
                        <td>
                          <div className="version text-align-center text-d">
                            {student.version_count}
                          </div>
                        </td>
                        <td className="text-align-center">
                          <button
                            className="download-button"
                            onClick={() => handleDownload(student.admission_no)}
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <KgcarFooter />
    </DashboardLayout>
  );
}

export default KgcarDownloadTables;
