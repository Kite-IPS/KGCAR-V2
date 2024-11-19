// @mui/material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import './index.css';
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import KgcarFooter from "Kgcar/Footer";

// Custom Components
import DocSearchHeader from "./Components/Header";

function KgcarDownloadTables() {
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
                    <tr className="table-top">
                      <td>
                        <div className="student-name">Sample</div>
                      </td>
                      <td>
                        <div className="adm-no text-align-center">12341</div>
                      </td>
                      <td>
                        <div className="department text-align-center">aids</div>
                      </td>
                      <td>
                        <div className="version text-align-center">2</div>
                      </td>
                      <td className="text-align-center">
                        <button className="download-button">Download</button>
                      </td>
                    </tr>

                    <tr className="table-top">
                      <td>
                        <div className="student-name">Sample</div>
                      </td>
                      <td>
                        <div className="adm-no text-align-center">12341</div>
                      </td>
                      <td>
                        <div className="department text-align-center">aids</div>
                      </td>
                      <td>
                        <div className="version text-align-center">2</div>
                      </td>
                      <td className="text-align-center">
                        <button className="download-button">Download</button>
                      </td>
                    </tr>

                    <tr className="table-top">
                      <td>
                        <div className="student-name">Sample</div>
                      </td>
                      <td>
                        <div className="adm-no text-align-center">12341</div>
                      </td>
                      <td>
                        <div className="department text-align-center">aids</div>
                      </td>
                      <td>
                        <div className="version text-align-center">2</div>
                      </td>
                      <td className="text-align-center">
                        <button className="download-button">Download</button>
                      </td>
                    </tr>

                    <tr className="table-top">
                      <td>
                        <div className="student-name">Sample</div>
                      </td>
                      <td>
                        <div className="adm-no text-align-center">12341</div>
                      </td>
                      <td>
                        <div className="department text-align-center">aids</div>
                      </td>
                      <td>
                        <div className="version text-align-center">2</div>
                      </td>
                      <td className="text-align-center">
                        <button className="download-button">Download</button>
                      </td>
                    </tr>

                    <tr className="table-top">
                      <td>
                        <div className="student-name">Sample</div>
                      </td>
                      <td>
                        <div className="adm-no text-align-center">12341</div>
                      </td>
                      <td>
                        <div className="department text-align-center">aids</div>
                      </td>
                      <td>
                        <div className="version text-align-center">2</div>
                      </td>
                      <td className="text-align-center">
                        <button className="download-button">Download</button>
                      </td>
                    </tr>

                    <tr className="table-top">
                      <td>
                        <div className="student-name">Sample</div>
                      </td>
                      <td>
                        <div className="adm-no text-align-center">12341</div>
                      </td>
                      <td>
                        <div className="department text-align-center">aids</div>
                      </td>
                      <td>
                        <div className="version text-align-center">2</div>
                      </td>
                      <td className="text-align-center">
                        <button className="download-button">Download</button>
                      </td>
                    </tr>
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
