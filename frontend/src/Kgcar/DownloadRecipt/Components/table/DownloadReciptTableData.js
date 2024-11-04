  /* eslint-disable react/prop-types */
  // Soft UI Dashboard React components
  import SoftBox from "components/SoftBox";
  import SoftTypography from "components/SoftTypography";
  import SoftAvatar from "components/SoftAvatar";
  import SoftBadge from "components/SoftBadge";

  // Images
  import team2 from "assets/images/team-2.jpg";
  import team3 from "assets/images/team-3.jpg";
  import team4 from "assets/images/team-4.jpg";
import SoftButton from "components/SoftButton";

  function Author({ image, name, email }) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox mr={2}>
          <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
        </SoftBox>
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

  function Function({ job, org }) {
    return (
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="caption" fontWeight="medium" color="text">
          {job}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {org}
        </SoftTypography>
      </SoftBox>
    );
  }

  const authorsTableData = {
    columns: [
      { name: "Student", align: "left" },
      { name: "Admission_No", align: "left" },
      { name: "Department", align: "center" },
      { name: "Version", align: "center" },
      { name: "Download", align: "center" },
    ],

    rows: [
      {
        Student: <Author name="Yogesh"/>,
        Admission_No: <Function job="12345" />,
        Department: (
          <SoftBadge variant="gradient">CSE</SoftBadge>
        ),
        Version: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        Download: (
            <SoftButton variant="gradient" color="info">
            Download
        </SoftButton>
        ),
      },
      {
        Student: <Author name="Raja Rajan"/>,
        Admission_No: <Function job="12245" />,
        Department: (
          <SoftBadge variant="gradient">CSE</SoftBadge>
        ),
        Version: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        Download: (
            <SoftButton variant="gradient" color="info">
            Download
        </SoftButton>
        ),
      },
      {
        Student: <Author name="Rajiv"/>,
        Admission_No: <Function job="122345" />,
        Department: (
          <SoftBadge variant="gradient">CSE</SoftBadge>
        ),
        Version: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        Download: (
            <SoftButton variant="gradient" color="info">
            Download
        </SoftButton>
        ),
      },
      {
        Student: <Author name="Nishanth"/>,
        Admission_No: <Function job="123452" />,
        Department: (
          <SoftBadge variant="gradient">CSE</SoftBadge>
        ),
        Version: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        Download: (
            <SoftButton variant="gradient" color="info">
            Download
        </SoftButton>
        ),
      },
      {
        Student: <Author name="Mitun"/>,
        Admission_No: <Function job="12245" />,
        Department: (
          <SoftBadge variant="gradient">CSBS</SoftBadge>
        ),
        Version: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        Download: (
            <SoftButton variant="gradient" color="info">
            Download
        </SoftButton>
        ),
      },
      {
        Student: <Author name="Sivakanesh"/>,
        Admission_No: <Function job="1234523" />,
        Department: (
          <SoftBadge variant="gradient">IT</SoftBadge>
        ),
        Version: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        Download: (
        //   <SoftTypography
        //     component="a"
        //     href="#"
        //     variant="caption"
        //     color="secondary"
        //     fontWeight="medium"
        //   >
        //     Finish
        //   </SoftTypography>
            <SoftButton variant="gradient" color="info">
                Download
            </SoftButton>
        ),
      },
      
    ],
  };

  export default authorsTableData;
