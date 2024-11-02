/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================
* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton"; // Make sure to have a SoftButton component

// Assuming this is your table data file
import tableData from "Kgcar/SearchStudents/data/tableData"; // Update the path accordingly

function Table() {
  const { columns, rows } = tableData;

  const renderColumns = columns.map(({ name, align }, key) => {
    return (
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
        color="secondary"
        opacity={0.7}
      >
        {name.toUpperCase()}
      </SoftBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;
    const tableRow = columns.map(({ name, align }) => {
      let cellContent;
      if (name === "action") {
        cellContent = (
          <SoftButton
            variant="text"
            color="primary"
            onClick={() => console.log(`Editing ${row.student}`)} // Implement your edit logic
          >
            Edit
          </SoftButton>
        );
      } else {
        cellContent = (
          <SoftTypography
            variant="button"
            fontWeight="regular"
            color="secondary"
          >
            {row[name]}
          </SoftTypography>
        );
      }

      return (
        <SoftBox
          key={uuidv4()}
          component="td"
          p={1}
          textAlign={align}
        >
          {cellContent}
        </SoftBox>
      );
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <SoftBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </SoftBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows]
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
