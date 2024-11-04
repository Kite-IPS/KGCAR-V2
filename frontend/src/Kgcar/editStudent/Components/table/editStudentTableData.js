// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { responsiveFontSizes } from "@mui/material";

// Get current date in the desired format
const getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString(); // You can customize the format if needed
};

// Define table data
const documentsTableData = {
  columns: [
    { name: "sno", align: "center" },
    { name: "document", align: "left" },
    { name: "date", align: "center" },
    { name: "original", align: "center" },
    { name: "photocopy", align: "center" },
    { name: "count", align: "center" },
  ],
  rows: Array.from({ length: 10 }, (_, index) => ({
    sno: (
      <SoftTypography variant="caption" color="text" fontWeight="large">
        {index + 1}
      </SoftTypography>
    ),
    document: (
      <SoftTypography variant="caption" color="text" fontWeight="large" sx={{ fontSize: '1rem',fontWeight: 'bold' }}>
        {`document${index + 1}`}
      </SoftTypography>
    ),
    date: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {getCurrentDate()}
      </SoftTypography>
    ),
    original: <Checkbox color="primary" sx={{ transform: "scale(2)" }}/>,
    photocopy: <Checkbox color="primary" sx={{ transform: "scale(2)" }}/>,
    count: <TextField type="number" variant="outlined" size="medium" />,
  })),
};

export default documentsTableData;
