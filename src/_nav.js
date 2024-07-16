// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import ShuffleIcon from "@mui/icons-material/Shuffle";
// import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
// import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
// import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import AltRouteIcon from "@mui/icons-material/AltRoute";
// import RouterIcon from "@mui/icons-material/Router";
// import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLink } from "@fortawesome/free-solid-svg-icons";
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
// import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
// import MobileFriendlyOutlinedIcon from "@mui/icons-material/MobileFriendlyOutlined";
// import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import SwipeRightOutlinedIcon from "@mui/icons-material/SwipeRightOutlined";
// import BoltIcon from "@mui/icons-material/Bolt";
// import BugReportIcon from "@mui/icons-material/BugReport";
// import NotificationsIcon from "@mui/icons-material/Notifications";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import DashboardIcon from "./assets/sidenav/dashboard.svg";
import cmsIcon from "./assets/sidenav/cms.svg";
import DashboardIconWhite from "./assets/sidenav/white/dashboard.svg";
import AccountIcon from "./assets/sidenav/accounts.svg";
import InstantIcon from "./assets/sidenav/instant.svg";
import BankIcon from "./assets/sidenav/bank.svg";
import ComplaintsIcon from "./assets/sidenav/complaints.svg";
import MessagesIcon from "./assets/sidenav/messages.svg";
import NotificationIcon from "./assets/sidenav/notifications.svg";
import OperatorsIcon from "./assets/sidenav/operators.svg";
import PlansIcon from "./assets/sidenav/plans.svg";
// import PrabhuIcon from "./assets/sidenav/prabhu_transfer.svg";
// import RoutesIcon from "./assets/sidenav/routes.svg";
import TransactionIcon from "./assets/sidenav/transactions.svg";
import UserIcon from "./assets/sidenav/user.svg";
import FlightIcon from "./assets/sidenav/flight_booking.svg";
import AepsIcon from "./assets/sidenav/aeps.svg";
import BbpsIcon from "./assets/sidenav/bbps.svg";
import CreditRequestIcon from "./assets/sidenav/credit_request.svg";
import ExpressIcon from "./assets/sidenav/express_transfer.svg";
import MoneyTransferIcon from "./assets/sidenav/money_transfer.svg";
// import NepalIcon from "./assets/sidenav/nepal_transfer.svg";
import RechargeIcon from "./assets/sidenav/recharge_bill.svg";
import ReportsIcon from "./assets/sidenav/reports.svg";
import SuperIcon from "./assets/sidenav/super_transfer.svg";
import UpiIcon from "./assets/sidenav/upi_transfer.svg";
// import employeesIcon from "./assets/sidenav/employee_icon.svg";
import AccountIconWhite from "./assets/sidenav/white/accounts.svg";
import BankIconWhite from "./assets/sidenav/white/bank.svg";
import ComplaintsIconWhite from "./assets/sidenav/white/complaints.svg";
import MessagesIconWhite from "./assets/sidenav/white/messages.svg";
import NotificationIconWhite from "./assets/sidenav/white/notifications.svg";
import OperatorsIconWhite from "./assets/sidenav/white/operators.svg";
import PlansIconWhite from "./assets/sidenav/white/plans.svg";
// import PrabhuIconWhite from "./assets/sidenav/white/prabhu_transfer.svg";
// import RoutesIconWhite from "./assets/sidenav/white/routes.svg";
import TransactionIconWhite from "./assets/sidenav/white/transactions.svg";
import UserIconWhite from "./assets/sidenav/white/user.svg";
import InstantIconWhite from "./assets/sidenav/white/instant.svg";
import cmsIconWhite from "./assets/sidenav/white/cms.svg";
// import employeesIconWhite from "./assets/sidenav/white/employee_icon_white.svg";
import trainIconWhite from "./assets/sidenav/white/train.svg";

import {
  account_ledgre,
  aepsIcon,
  bbIcon,
  cardIcon,
  creditReq,
  dashboard,
  dthIcon,
  elecIcon,
  etIcon,
  gasIcon,
  khataBook,
  mtIcon,
  myComplaints,
  myPurchase,
  ntIcon,
  stIcon,
  transactions,
  utIcon,
  Electricity,
  FASTag,
  Cylinder,
  Postpaid,
  Prepaid,
  Gas,
  BBPS,
  licIcon,
  waterIcon,
  landIcon,
  flightBooking,
  hotelBooking,
  busBooking,
  CMSIcon,
  irctcTravelImage,
} from "./iconsImports";

export const nav = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    icon2: DashboardIconWhite,
    to: "/admin/dashboard",
  },
  {
    title: "Recharge",
    icon: RechargeIcon,
    icon2: RechargeIcon,
    to: "/dashboard/transaction",
  },
  {
    title: "Money Transfer",
    icon: MoneyTransferIcon,
    icon2: MoneyTransferIcon,
    to: "/dashboard/transaction",
  },
  {
    title: "Express Transfer",
    icon: ExpressIcon,
    icon2: ExpressIcon,
    to: "/dashboard/transaction",
  },
  {
    title: "UPI Transfer",
    icon: UpiIcon,
    icon2: UpiIcon,
    to: "/dashboard/transaction",
  },
  {
    title: "AEPS",
    icon: AepsIcon,
    icon2: AepsIcon,
    to: "/dashboard/transaction",
  },
  {
    title: "Transaction",
    icon: InstantIcon,
    icon2: InstantIconWhite,
    to: "/dashboard/transaction",
  },
  {
    title: "Fund Request",
    icon: CreditRequestIcon,
    icon2: CreditRequestIcon,
    to: "/dashboard/transaction",
  },
  {
    title: "Contact Us",
    icon: InstantIcon,
    icon2: InstantIconWhite,
    to: "/dashboard/transaction",
  },
];
export const Admin_nav = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    icon2: DashboardIconWhite,
    to: "/admin/dashboard",
  },
  {
    title: "Users",
    icon: UserIcon,
    icon2: UserIconWhite,
    to: "/admin/users",
  },
  {
    title: "Transactions",
    icon: TransactionIcon,
    icon2: TransactionIconWhite,
    to: "/admin/transactions",
  },
  // {
  //   title: "Prabhu Transfer",
  //   icon: PrabhuIcon,
  //   icon2: PrabhuIconWhite,
  //   to: "/admin/prabhu",
  // },
  {
    title: "Fund Requests",
    icon: CreditRequestIcon,
    icon2: CreditRequestIcon,
    to: "/admin/cred-req",
  },
  {
    title: "Accounts",
    icon: AccountIcon,
    icon2: AccountIconWhite,
    to: "/admin/accounts",
  },
  {
    title: "Banks",
    icon: BankIcon,
    icon2: BankIconWhite,
    to: "/admin/banks",
  },
  {
    title: "Messages",
    icon: MessagesIcon,
    icon2: MessagesIconWhite,
    to: "/admin/messages",
  },
  {
    title: "Notifications",
    icon: NotificationIcon,
    icon2: NotificationIconWhite,
    to: "/admin/notification",
  },
  {
    title: "Operators",
    icon: OperatorsIcon,
    icon2: OperatorsIconWhite,
    to: "/admin/operators",
  },
  // {
  //   title: "Routes",
  //   icon: RoutesIcon,
  //   icon2: RoutesIconWhite,
  //   to: "/admin/routes",
  // },
  {
    title: "Plans",
    icon: PlansIcon,
    icon2: PlansIconWhite,
    to: "/admin/plans",
  },
  {
    title: "Complaint",
    icon: ComplaintsIcon,
    icon2: ComplaintsIconWhite,
    to: "/admin/complaints",
  },
  // {
  //   title: "Risk",
  //   icon: AccountIcon,
  //   icon2: AccountIconWhite,
  //   to: "/admin/risk",
  // },
  // {
  //   title: "Virtual Accounts",
  //   icon: AccountIcon,
  //   icon2: AccountIconWhite,
  //   to: "/admin/virtual-accounts",
  // },
  // {
  //   title: "Employees",
  //   icon: employeesIcon,
  //   icon2: employeesIconWhite,
  //   to: "/admin/employees",
  // },
];
export const Asm_nav = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    icon2: DashboardIconWhite,
    to: "/asm/dashboard",
  },
  {
    title: "Users",
    icon: UserIcon,
    icon2: UserIconWhite,
    to: "/asm/users",
  },
  {
    title: "Transactions",
    icon: TransactionIcon,
    icon2: TransactionIconWhite,
    to: "/asm/transactions",
  },
  {
    title: "Fund Requests",
    icon: CreditRequestIcon,
    icon2: CreditRequestIcon,
    to: "/asm/cred-req",
  },
];
export const Zsm_nav = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    icon2: DashboardIconWhite,
    to: "/zsm/dashboard",
  },
  {
    title: "Users",
    icon: UserIcon,
    icon2: UserIconWhite,
    to: "/zsm/users",
  },
  {
    title: "Transactions",
    icon: TransactionIcon,
    icon2: TransactionIconWhite,
    to: "/zsm/transactions",
  },
  {
    title: "Fund Requests",
    icon: CreditRequestIcon,
    icon2: CreditRequestIcon,
    to: "/zsm/cred-req",
  },
];
export const Api_nav = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    icon2: DashboardIconWhite,
    to: "/api-user/dashboard",
  },
  {
    title: "Transactions",
    icon: TransactionIcon,
    icon2: TransactionIconWhite,
    to: "/api-user/transactions",
  },
  {
    title: "Fund Requests",
    icon: CreditRequestIcon,
    icon2: CreditRequestIcon,
    to: "/api-user/cred-req",
  },
];

export const Ad_nav = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    icon2: DashboardIconWhite,
    to: "/ad/dashboard",
  },
  {
    title: "Users",
    icon: UserIcon,
    icon2: UserIconWhite,
    to: "/ad/users",
  },
  {
    title: "Fund Requests",
    icon: CreditRequestIcon,
    icon2: CreditRequestIcon,
    to: "/ad/cred-req",
  },
  {
    title: "Transactions",
    icon: TransactionIcon,
    icon2: TransactionIconWhite,
    to: "/ad/transactions",
  },
  // {
  //   title: "My Sale",
  //   icon: TransactionIcon,
  //   icon2: TransactionIconWhite,
  //   to: "/ad/sale",
  // },
  // {
  //   title: "My Purchase",
  //   icon: TransactionIcon,
  //   icon2: TransactionIconWhite,
  //   to: "/ad/purchase",
  // },
  // {
  //   title: "My Ledger",
  //   icon: TransactionIcon,
  //   icon2: TransactionIconWhite,
  //   to: "/ad/ledger",
  // },
  // {
  //   title: "Khata Book",
  //   icon: AccountIcon,
  //   icon2: AccountIcon,
  //   to: "/ad/khata-book",
  // },
];

export const Md_nav = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    icon2: DashboardIconWhite,
    to: "/md/dashboard",
  },
  {
    title: "Users",
    icon: UserIcon,
    icon2: UserIconWhite,
    to: "/md/users",
  },
  {
    title: "Fund Requests",
    icon: CreditRequestIcon,
    icon2: CreditRequestIcon,
    to: "/md/cred-req",
  },
  {
    title: "Transactions",
    icon: TransactionIcon,
    icon2: TransactionIconWhite,
    to: "/md/transactions",
  },
  // {
  //   title: "Contact Us",
  //   icon: <SupportAgentIcon />,
  //   to: "/ad/cred-req",
  // },
];
// this is the nav for the old layout
export const customer_nav = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    icon2: DashboardIconWhite,
    to: "/customer/dashboard",
  },
  {
    title: "Recharge/Bill",
    icon: RechargeIcon,
    icon2: RechargeIcon,
    to: "/customer/recharge",
  },
  {
    title: "Travel",
    icon: FlightIcon,
    icon2: FlightIcon,
    to: "/customer/travel",
    // to: "/customer/travel-services",
  },
  {
    title: "IRCTC",
    icon: trainIconWhite,
    icon2: trainIconWhite,
    to: "https://www.irctc.co.in/nget/train-search",
  },
  {
    title: "BBPS",
    icon: BbpsIcon,
    icon2: BbpsIcon,
    to: "/customer/bbps",
  },
  {
    title: "CMS",
    icon: cmsIcon,
    icon2: cmsIconWhite,
    to: "/customer/cms",
  },
  {
    title: "Money Transfer",
    icon: MoneyTransferIcon,
    icon2: MoneyTransferIcon,
    to: "/customer/money-transfer",
  },
  // {
  //   title: "Express Transfer",
  //   icon: ExpressIcon,
  //   icon2: ExpressIcon,
  //   to: "/customer/express-transfer",
  // },
  // {
  //   title: "Super Transfer",
  //   icon: SuperIcon,
  //   icon2: SuperIcon,
  //   to: "/customer/super-transfer",
  // },
  {
    title: "Vendor Payments",
    icon: SuperIcon,
    icon2: SuperIcon,
    to: "/customer/vendor-payments",
  },
  // {
  //   title: "Settlements",
  //   icon: ExpressIcon,
  //   icon2: ExpressIcon,
  //   to: "/customer/settlements",
  // },
  // {
  //   title: "Nepal Transfer",
  //   icon: NepalIcon,
  //   icon2: NepalIcon,
  //   to: "/customer/nepal-transfer",
  // },
  {
    title: "UPI Transfer",
    icon: UpiIcon,
    icon2: UpiIcon,
    to: "/customer/upi-transfer",
  },
  {
    title: "AEPS",
    icon: AepsIcon,
    icon2: AepsIcon,
    to: "/customer/aeps",
  },
  {
    title: "Fund Request",
    icon: CreditRequestIcon,
    icon2: CreditRequestIcon,
    to: "/customer/cred-req",
  },
  {
    title: "Reports",
    icon: ReportsIcon,
    icon2: ReportsIcon,
    to: "/customer/transactions",
  },
  // {
  //   title: "Reports",
  //   icon: ReportsIcon,
  //   icon2: ReportsIcon,
  //   to: "#",
  //   submenus: [
  //     {
  //       title: "My Transactions",
  //       icon: TransactionIcon,
  //       icon2: TransactionIconWhite,
  //       to: "/customer/transactions",
  //     },
  //     {
  //       title: "Account Ledger",
  //       icon: AccountIcon,
  //       icon2: AccountIconWhite,
  //       to: "/customer/account-ledger",
  //     },
  //     {
  //       title: "My Complaints",
  //       icon: ComplaintsIcon,
  //       icon2: ComplaintsIconWhite,
  //       to: "/customer/complaints",
  //     },
  //     {
  //       title: "My Purchase",
  //       icon: TransactionIcon,
  //       icon2: TransactionIconWhite,
  //       to: "/customer/purchase",
  //     },
  //     {
  //       title: "Khata Book",
  //       icon: AccountIcon,
  //       icon2: AccountIcon,
  //       to: "/customer/khata-book",
  //     },
  //   ],
  // },
];

// ******************************************************************
// #############################################
// these are the navs for the new layout
// #############################################
// ******************************************************************
export const reports = [
  {
    title: "Dashboard",
    icon: dashboard,
    to: "/customer/dashboard",
  },
  {
    title: "My Transactions",
    icon: transactions,
    to: "/customer/transactions",
  },
  {
    title: "Account Ledger",
    icon: account_ledgre,
    to: "/customer/account-ledger",
  },
  {
    title: "Fund Request",
    icon: creditReq,
    to: "/customer/cred-req",
  },
  {
    title: "My Complaints",
    icon: myComplaints,
    to: "/customer/complaints",
  },
  {
    title: "My Purchase",
    icon: myPurchase,
    to: "/customer/purchase",
  },
  {
    title: "Khata Book",
    icon: khataBook,
    to: "/customer/khata-book",
  },
];

export const banking = [
  {
    title: "Money Transfer",
    icon: mtIcon,
    to: "/customer/money-transfer",
  },
  // {
  //   title: "Settlements",
  //   icon: stIcon,
  //   to: "/customer/settlements",
  // },
  {
    title: "Express Transfer",
    icon: etIcon,
    to: "/customer/express-transfer",
  },
  {
    title: "Super Transfer",
    icon: stIcon,
    to: "/customer/super-transfer",
  },
  {
    title: "AEPS",
    icon: aepsIcon,
    to: "/customer/aeps",
  },
  // {
  //   title: "Nepal Transfer",
  //   icon: ntIcon,
  //   to: "/customer/nepal-transfer",
  // },
  {
    title: "CMS",
    icon: CMSIcon,
    to: "/customer/cms",
  },
  {
    title: "UPI Transfer",
    icon: utIcon,
    to: "/customer/upi-transfer",
  },
];

export const bbpsServices = [
  {
    title: "Electricity",
    icon: <FormatBoldIcon />,
    to: "/customer/bbps",
    isModal: true,
  },
  {
    title: "Gas Cylinder",
    icon: <FormatBoldIcon />,
    to: "/customer/bbps",
    isModal: true,
  },
  {
    title: "Mobile Postpaid",
    icon: <FormatBoldIcon />,
    to: "/customer/bbps",
    isModal: true,
  },
  {
    title: "Mobile Prepaid",
    icon: <FormatBoldIcon />,
    to: "/customer/bbps",
    isModal: true,
  },
  {
    title: "FASTag",
    icon: <FormatBoldIcon />,
    to: "/customer/bbps",
    isModal: true,
  },
  {
    title: "Piped Gas",
    icon: <FormatBoldIcon />,
    to: "/customer/bbps",
    isModal: true,
  },
  {
    title: "BBPS",
    icon: <FormatBoldIcon />,
    to: "/customer/bbps",
  },
];
export const ourServices = [
  {
    title: "Mobile Recharge",
    icon: Prepaid,
    to: "",
    isModal: true,
  },
  {
    title: "DTH Recharge",
    icon: dthIcon,
    to: "",
    isModal: true,
  },
  {
    title: "Electricity with commission",
    icon: elecIcon,
    to: "",
    isModal: true,
  },
  {
    title: "LIC Premium",
    icon: licIcon,
    to: "",
    isModal: true,
  },
  {
    title: "Credit Card Bill",
    icon: cardIcon,
    to: "",
    isModal: true,
  },
  {
    title: "Gas Bill",
    icon: gasIcon,
    to: "",
    isModal: true,
  },
  {
    title: "Broadband Bill",
    icon: bbIcon,
    to: "",
    isModal: true,
  },
  {
    title: "Water Bill",
    icon: waterIcon,
    to: "",
    isModal: true,
  },
  {
    title: "Landline Bill",
    icon: landIcon,
    to: "",
    isModal: true,
  },
  // {
  //   title: "Recharges",
  //   icon: Prepaid,
  //   to: "/customer/recharge",
  // },
];

export const travelServices = [
  {
    title: "Flight Booking",
    icon: flightBooking,
    to: "/customer/travel",
  },
  {
    title: "IRCTC Booking",
    icon: irctcTravelImage,
    to: "https://www.irctc.co.in/nget/train-search",
    target: "_blank",
  },
  {
    title: "Hotel Booking",
    icon: hotelBooking,
    to: "/customer/travel",
  },
  {
    title: "Bus Booking",
    icon: busBooking,
    to: "/customer/travel",
  },
];

export const getNavImg = (title) => {
  let image;
  switch (title) {
    case "Electricity":
      image = Electricity;
      break;
    case "FASTag":
      image = FASTag;
      break;
    case "BBPS":
      image = BBPS;
      break;
    case "Gas Cylinder":
      image = Cylinder;
      break;
    case "Mobile Postpaid":
      image = Postpaid;
      break;
    case "Mobile Prepaid":
      image = Prepaid;
      break;
    case "Piped Gas":
      image = Gas;
      break;

    default:
      image = BBPS;
  }
  return image;
};

// export const customer_nav_super = [
//   {
//     title: "Dashboard",
//     icon: <HomeOutlinedIcon />,
//     to: "/customer/dashboard",
//   },
//   {
//     title: "Recharge/Bill",
//     icon: <RechargeIconutlinedIcon />,
//     to: "/customer/RechargeIcon",
//   },
//   {
//     title: "BBPS",
//     icon: <FormatBoldIcon />,
//     to: "/customer/bbps",
//   },
//   {
//     title: "Money Transfer",
//     icon: <SwapHorizIcon />,
//     to: "/customer/money-transfer",
//   },
//   {
//     title: "Express Transfer",
//     icon: <SwipeRightOutlinedIcon />,
//     to: "/customer/express-transfer",
//   },
//   {
//     title: "Super Transfer",
//     icon: <BoltIcon />,
//     to: "/customer/super-transfer",
//   },
//   {
//     title: "UPI Transfer",
//     // icon: <SyncAltOutlinedIcon />,
//     icon: <QrCodeScannerIcon />,
//     to: "/customer/upi-transfer",
//   },
//   {
//     title: "AEPS",
//     icon: <TouchAppOutlinedIcon />,
//     to: "/customer/aeps",
//   },
//   {
//     title: "My Transactions",
//     icon: <ShuffleIcon />,
//     to: "/customer/transactions",
//   },
//   {
//     title: "Credit Request",
//     icon: <CurrencyRupeeOutlinedIcon />,
//     to: "/customer/cred-req",
//   },
//   {
//     title: "My Complaints",
//     icon: <SupportAgentIcon />,
//     to: "/customer/complaints",
//   },
//   {
//     title: "My Purchase",
//     icon: <FontAwesomeIcon icon={faLink} style={{ fontSize: "18px" }} />,
//     to: "/customer/purchase",
//   },
//   {
//     title: "Khata Book",
//     icon: <MenuBookOutlinedIcon />,
//     to: "/customer/khata-book",
//   },
// ];
export const account_nav = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    icon2: DashboardIconWhite,
    to: "/account/dashboard",
  },
];

//acc login
//user
//bank
//account
//txn
