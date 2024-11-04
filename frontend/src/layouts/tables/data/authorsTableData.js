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
      { name: "status", align: "center" },
      { name: "employed", align: "center" },
      { name: "action", align: "center" },
    ],

    rows: [
      {
        Student: <Author name="Yogesh"/>,
        Admission_No: <Function job="12345" />,
        status: (
          <SoftBadge variant="gradient">CSE</SoftBadge>
        ),
        employed: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        action: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Finish
          </SoftTypography>
        ),
      },
      {
        Student: <Author name="Raja Rajan"/>,
        Admission_No: <Function job="12245" />,
        status: (
          <SoftBadge variant="gradient">CSE</SoftBadge>
        ),
        employed: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        action: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Finish
          </SoftTypography>
        ),
      },
      {
        Student: <Author name="Rajiv"/>,
        Admission_No: <Function job="122345" />,
        status: (
          <SoftBadge variant="gradient">CSE</SoftBadge>
        ),
        employed: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        action: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Finish
          </SoftTypography>
        ),
      },
      {
        Student: <Author name="Nishanth"/>,
        Admission_No: <Function job="123452" />,
        status: (
          <SoftBadge variant="gradient">CSE</SoftBadge>
        ),
        employed: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        action: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Finish
          </SoftTypography>
        ),
      },
      {
        Student: <Author name="Mitun"/>,
        Admission_No: <Function job="12245" />,
        status: (
          <SoftBadge variant="gradient">CSBS</SoftBadge>
        ),
        employed: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        action: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Finish
          </SoftTypography>
        ),
      },
      {
        Student: <Author name="Sivakanesh"/>,
        Admission_No: <Function job="1234523" />,
        status: (
          <SoftBadge variant="gradient">IT</SoftBadge>
        ),
        employed: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            3
          </SoftTypography>
        ),
        action: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
          >
            Finish
          </SoftTypography>
        ),
      },
      
    ],
  };

  export default authorsTableData;
