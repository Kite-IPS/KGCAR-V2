// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import DocHeader from "./Components/Header";
import KgcarFooter from "Kgcar/Footer";
import Table from "examples/Tables/Table";

function KgcarFinalTables() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <DocHeader />
      <SoftBox py={3}></SoftBox>
      <SoftBox py={3}>
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
                        <div className="status text-align-center">Finish</div>
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
                        <div className="status text-align-center">Finish</div>
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
                        <div className="status text-align-center">Finish</div>
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
                        <div className="status text-align-center">Finish</div>
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
                        <div className="status text-align-center">Finish</div>
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
                        <div className="status text-align-center">Finish</div>
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

export default KgcarFinalTables;
