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
import Table from "Kgcar/NewEntry/Components/table";
import KgcarFooter from "Kgcar/Footer";

function DocTables() {
  const { columns, rows } = NewEntryTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
    <DocHeader columns={columns} rows={rows} /> {/* Pass columns and rows as props */}
    <KgcarFooter />
  </DashboardLayout>
  );
}

export default DocTables;
