/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function StudentName({ name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function AdmissionNo({ admissionNo }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {admissionNo}
      </SoftTypography>
    </SoftBox>
  );
}

const tableData = {
  columns: [
    { name: "student name", align: "left" },
    { name: "admission no", align: "left" },
    { name: "department", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      "student name": <StudentName name="John Michael" email="john@creative-tim.com" />,
      "admission no": <AdmissionNo admissionNo="12345" />,
      department: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Computer Science
        </SoftTypography>
      ),
      action: (
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
          }}
          onClick={() => console.log("Edit student with ID: 12345")}
        >
          Edit
        </button>
      ),
    },
    {
      "student name": <StudentName name="Alexa Liras" email="alexa@creative-tim.com" />,
      "admission no": <AdmissionNo admissionNo="67890" />,
      department: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Information Technology
        </SoftTypography>
      ),
      action: (
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
          }}
          onClick={() => console.log("Edit student with ID: 67890")}
        >
          Edit
        </button>
      ),
    },
    {
      "student name": <StudentName name="Laurent Perrier" email="laurent@creative-tim.com" />,
      "admission no": <AdmissionNo admissionNo="11223" />,
      department: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Mechanical Engineering
        </SoftTypography>
      ),
      action: (
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
          }}
          onClick={() => console.log("Edit student with ID: 11223")}
        >
          Edit
        </button>
      ),
    },
    // Add more rows as needed
  ],
};

export default tableData;
