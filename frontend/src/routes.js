// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import DocTables from "Kgcar/NewEntry";
import DocSearchTables from "Kgcar/SearchStudents";
import KgcarSignIn from "Kgcar/sign-in";
import KgcarDownloadTables from "Kgcar/DownloadRecipt";
import KgcarFinalTables from "Kgcar/FinalReport";
import StudentDetailPage from "Kgcar/editStudent";


const routes = [
  { type: "title", title: "Entry Portral", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   route: "/dashboard",
  //   icon: <Office size="12px" />,
  //   component: <CarDashboard />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "New Entry",
    key: "new-entry",
    route: "/new-entry",
    icon: <Office size="12px" />,
    component: <DocTables />,
    noCollapse: true,
  },
  { type: "title", title: "Portral Operations", key: "account-pages" },
  {
    type: "collapse",
    name: "Search Students",
    key: "search-students",
    route: "/search-students",
    icon: <CustomerSupport size="12px" />,
    component: <DocSearchTables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Download Recipt",
    key: "download-recipt",
    route: "/download-recipt",
    icon: <Document size="12px" />,
    component: <KgcarDownloadTables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Final Report",
    key: "final-report",
    route: "/final-report",
    icon: <SpaceShip size="12px" />,
    component: <KgcarFinalTables />,
    noCollapse: true,
  },
  {
    name: "Login",
    key: "login",
    route: "/login",
    component: <KgcarSignIn />,
  },
  {
    name: "Edit Student",
    key: "editStudent",
    route: "/edit-student/:admisson_no",
    component: <StudentDetailPage />,
  }
];

export default routes;
