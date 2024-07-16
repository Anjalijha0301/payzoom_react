import React, { useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Grid,
  Typography,
  // FormGroup,
  // FormControlLabel,
  // Switch,
} from "@mui/material";
import ApiEndpoints from "../network/ApiEndPoints";
import { dateDifference, datemonthYear } from "../utils/DateUtils";
import { CustomStyles } from "../component/CustomStyle";
import BlockUnBlockModal from "../modals/BlockUnBlockModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { get } from "../network/ApiController";
import { apiErrorToast } from "../utils/ToastUtil";
import CachedIcon from "@mui/icons-material/Cached";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MoneyTransferModal from "../modals/MoneyTransferModal";
import DmtModal from "../modals/DmtModal";
import AddRetailerinAdUser from "../modals/AddRetailerinAdUser";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
import { currencySetter } from "../utils/Currencyutil";
import { json2Csv, json2Excel } from "../utils/exportToExcel";
import ExcelUploadModal from "../modals/ExcelUploadModal";
import moment from "moment";
// import Spinner from "../commons/Spinner";
import { primaryColor } from "../theme/setThemeColor";
import { useLocation } from "react-router-dom";
// ACTIONS SECTION
import UserServiceSetting from "../modals/UserServiceSetting";
import ViewUserModal from "../modals/ViewUserModal";
//
import AdminDocsViewModal from "../../src/modals/AdminDocsViewModal";
import Mount from "../component/Mount";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import FilterCard from "../modals/FilterCard";
import {
  ROLE_LIST,
  ROLE_LIST4AD,
  adTab,
  adminTab,
  asmTab,
  mdTab,
  zsmTab,
} from "../utils/constants";
import FilterModal from "../modals/FilterModal";
import WalletDebitModal from "../modals/WalletDebitModal";
import AsmProductSaleModal from "../modals/admin/AsmProductSaleModal";
import BarChartIcon from "@mui/icons-material/BarChart";
import AdminDeletesUserModal from "../modals/AdminDeletesUserModal";
import RefreshComponent from "../component/RefreshComponent";
import AdminChargesForApiUsers from "../modals/AdminChargesForApiUsers";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AdminCreateVirtualAcct from "../modals/AdminCreateVirtualAcct";

// styled tabls
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {" "}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  // borderRadius: "4px",
  padding: "2px 10px",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 80,
    width: "0px",
    backgroundColor: "#ffffff",
  },
  minHeight: "30px",
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  color: "#fff",
  fontSize: "15px",
  minHeight: "15px",
  minWidth: "25px",
  padding: "4px 6px",
  borderRadius: "4px",
  textTransform: "none",
  // backgroundColor: getHoverInActive(),
  "&.Mui-selected": {
    color: "#fff",

    // backgroundColor: primaryColor(),
    backgroundColor: `hsla(0,0%,100%,.2)`,
    transition: `background-color .3s .2s`,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

//  tab pannel ends

let handleCloseModal;
const AdimUserView = () => {
  const theme = useTheme();

  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const [asmList, setAsmList] = useState([]);
  const [open, setOpen] = useState(false);
  const [adMdVal, setAdMdVal] = useState([]);
  // console.log("adMdVal", adMdVal);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const [request, setRequest] = useState(false);
  const [noOfResponses, setNoOfResponses] = useState(0);

  const [prefilledQuery, setPreFilledQuery] = useState(`platform=WEB`);
  // console.log("prefilled", prefilledQuery);

  const getAdMdValue = (passValue) => {
    get(
      ApiEndpoints.GET_USERS,
      `page=1&paginate=10&role=${passValue ? "Md" : "Ad"}&platform=WEB&export=`,
      "",
      (res) => {
        const adArray = res.data.data;
        setAdMdVal(adArray);
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setPreFilledQuery("platform=WEB");
    } else if (newValue === 1) {
      setPreFilledQuery("role=api&platform=WEB");
    } else if (newValue === 2) {
      setPreFilledQuery("role=Zsm&platform=WEB");
    } else if (newValue === 3) {
      setPreFilledQuery("role=Asm&platform=WEB");
    } else if (newValue === 4) {
      getAdMdValue(4);
      setPreFilledQuery("role=Ad&platform=WEB");
    } else if (newValue === 5) {
      setPreFilledQuery("role=Dd&platform=WEB");
    } else if (newValue === 6) {
      setPreFilledQuery("role=Ret&platform=WEB");
    } else if (newValue === 7) {
      setPreFilledQuery("platform=WEB");
    } else if (newValue === 8) {
      setPreFilledQuery("role=Md&platform=WEB");
    } else {
      setPreFilledQuery("platform=WEB");
    }
  };
  const location = useLocation();
  let refresh;
  function refreshFunc(setQuery) {
    setQuery("");
    if (refresh) refresh();
  }

  const handleClickSnack = () => {
    setOpen(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const copyToClipBoard = (copyMe) => {
    try {
      navigator.clipboard.writeText(copyMe);
    } catch (err) {
      console.log(err);
    }
  };

  const getAsmValue = () => {
    get(
      ApiEndpoints.GET_USERS,
      `page=1&paginate=10&role=Asm&platform=WEB&export=`,
      "",
      (res) => {
        const asmArray = res.data.data;
        setAsmList(
          asmArray &&
            asmArray.map((item) => {
              return {
                id: item.id,
                name: item.name,
              };
            })
        );
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const getExcel = () => {
    get(
      ApiEndpoints.GET_USERS,
      `${
        query
          ? query + "&page=1&paginate=10&platform=WEB&export=1"
          : "page=1&paginate=10&platform=WEB&export=1"
      }`,
      setRequest,
      (res) => {
        const apiData = res.data.data;
        const newApiData = apiData.map((item) => {
          const created_at = moment(item.created_at).utc().format("DD-MM-YYYY");
          const updated_at = moment(item.updated_at).utc().format("DD-MM-YYYY");
          return { ...item, created_at, updated_at };
        });
        json2Excel(
          `Users ${moment(new Date().toJSON()).format(
            "Do MMM YYYY"
          )} | ${moment(new Date().toJSON()).format("hh:mm a")}`,
          JSON.parse(JSON.stringify(newApiData && newApiData))
        );
        handleCloseModal();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  const getCsv = () => {
    get(
      ApiEndpoints.GET_USERS,
      `${
        query
          ? query + "&page=1&paginate=10&platform=WEB&export=1"
          : "page=1&paginate=10&platform=WEB&export=1"
      }`,
      setRequest,
      (res) => {
        const apiData = res.data.data;
        const newApiData = apiData.map((item) => {
          const created_at = moment(item.created_at).format("DD-MM-YYYY");
          const time_updated_at = moment(item.updated_at).format("LTS");
          return { ...item, created_at, time_updated_at };
        });
        json2Csv(
          `Users ${moment(new Date().toJSON()).format(
            "Do MMM YYYY"
          )} | ${moment(new Date().toJSON()).format("hh:mm a")}`,
          JSON.parse(JSON.stringify(newApiData && newApiData))
        );
        handleCloseModal();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  useEffect(() => {
    if (asmList.length < 1) {
      getAsmValue();
    }
    if (adMdVal.length < 1) {
      getAdMdValue();
    }
  }, []);

  useEffect(() => {
    if (location.state) {
      setQuery(`username=${location.state.username}`);
    }
  }, [location.state]);

  //

  const getParent = (row, parent = false, asm = false) => {
    if (parent) {
      let item =
        adMdVal && adMdVal.find((item) => item.id === parseInt(row.parent));
      // console.log("item", item);
      if (item) {
        return item.establishment;
      } else {
        return "";
      }
    } else if (asm) {
      let item = asmList && asmList.find((item) => item.id === Number(row.asm));
      // return item && item.name
      if (item) {
        return item.name;
      } else {
        return "";
      }
    }
  };

  // ############# table columns ################ //
  const columns = [
    {
      name:
        user && user.role === "Admin"
          ? "ID/Date"
          : user && user.role === "Asm"
          ? "ID/Date"
          : "Date",
      selector: (row) => (
        <>
          <div
            hidden={
              user && user.role === "Admin"
                ? false
                : user && user.role === "Asm"
                ? false
                : true
            }
            style={{ marginBottom: "5px", textAlign: "left" }}
          >
            {row.id}
          </div>
          <div style={{ textAlign: "left" }}>
            {datemonthYear(row.created_at)}
          </div>
        </>
      ),
      width: "120px",
    },
    {
      name: "Mobile",
      selector: (row) => (
        <>
          <div
            onClick={() => {
              copyToClipBoard(row.username);
              handleClickSnack();
            }}
            style={{ textAlign: "left" }}
          >
            {row.username}
          </div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseSnack}
            message="number copied"
            sx={{ zIndex: 10000 }}
          />

          <Mount visible={user.role === "Admin"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Mount visible={row.instId}>
                <AepsIdButton
                  id={row.instId}
                  onClick={() => {
                    copyToClipBoard(row.instId);
                    handleClickSnack();
                  }}
                />
              </Mount>
              <Mount visible={row.fingId}>
                <AepsIdButton
                  id={row.fingId}
                  onClick={() => {
                    copyToClipBoard(row.fingId);
                    handleClickSnack();
                  }}
                />
              </Mount>
            </Box>
          </Mount>
        </>
      ),
      wrap: true,
      width: "120px",
    },
    {
      name: "Name",
      selector: (row) => (
        <>
          <div className="break-spaces">{row.name}</div>
          <div
            style={{
              whiteSpace: "break-spaces",
              overflow: "hidden",
              textOverflow: "clip",
              textAlign: "left",
              fontSize: "10px",
              color: primaryColor(),
            }}
          >
            {row.establishment}
          </div>
          <div
            style={{
              whiteSpace: "break-spaces",
              overflow: "hidden",
              textOverflow: "clip",
              textAlign: "left",
              fontSize: "10px",
            }}
            className="fw-bold"
          >
            {row?.irctc}
          </div>
        </>
      ),
      wrap: true,
      width: "140px",
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Parent",
      cell: (row) => (
        <div
          style={{
            whiteSpace: "break-spaces",
            overflow: "hidden",
            textOverflow: "clip",
            textAlign: "left",
          }}
        >
          {getParent(row && row, true, false)}
        </div>
      ),
      wrap: true,
      center: false,
      grow: 1.7,
      omit:
        user && user.role === "Admin"
          ? false
          : user && user.role === "Asm"
          ? false
          : user && user.role === "Zsm"
          ? false
          : true,
    },
    {
      name: "Asm",
      cell: (row) => (
        <div
          style={{
            whiteSpace: "break-spaces",
            overflow: "hidden",
            textOverflow: "clip",
            textAlign: "left",
          }}
        >
          {getParent(row && row, false, true)}
        </div>
      ),
      wrap: true,
      center: false,
      grow: 1.7,
      omit:
        user && user.role === "Admin"
          ? false
          : user && user.role === "Zsm"
          ? false
          : true,
    },
    {
      name: "InActive",
      cell: (row) => (
        <section>
          {" "}
          <div>{dateDifference(row.updated_at, new Date())} days</div>
          <div>{row.last_transaction}</div>
        </section>
      ),
      wrap: true,
      width: "80px",
      omit: user && user.role === "Ret" ? true : false,
    },

    {
      name: "Wallet balance",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{currencySetter(row.w1 / 100)}</div>
          <div style={{ color: "#199ebb" }}>{currencySetter(row.w2 / 100)}</div>
          <div>
            {row.hold && row.hold > 0 ? (
              <span style={{ color: "red" }}>{currencySetter(row.hold)}</span>
            ) : (
              ""
            )}
          </div>
        </div>
      ),
      grow: 1,
      center: false,
    },
    {
      name: <span className="ms-2">DMT</span>,
      selector: (row) =>
        user &&
        (user.role === "Ad" || user.role === "Md" || user.role === "Admin") ? (
          <DmtModal row={row} refresh={refresh} />
        ) : (
          <span>{Number(row.dmt_slab2).toFixed(2)}%</span>
        ),
      center: false,
    },
    {
      name: "Transfer",
      selector: (row) => <MoneyTransferModal refresh={refresh} row={row} />,
      omit: user && (user.role === "Ad" || user.role === "Md") ? false : true,
    },
    {
      name:
        user && (user.role === "Admin" || user.role === "Asm")
          ? "Status/KYC"
          : "Status",
      selector: (row) => (
        <div style={{ display: "flex" }}>
          {user && user.role === "Admin" ? (
            <BlockUnBlockModal row={row} />
          ) : (
            <Box sx={{ width: "100%" }}>
              {row.status === 1 ? (
                <Tooltip title="Unblocked">
                  <LockOpenOutlinedIcon sx={{ color: "#00BF78" }} />
                </Tooltip>
              ) : (
                <Tooltip title="Blocked">
                  <LockOutlinedIcon sx={{ color: "#DC5F5F" }} />
                </Tooltip>
              )}
            </Box>
          )}

          {((user && user.role === "Admin") ||
            (user && user.role === "Asm")) && (
            <Box
              sx={{
                fontSize: "10px",
                color: row.kyc && row.kyc === 1 ? "#00BF78" : "#DC5F5F",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                ml: 1,
              }}
            >
              <Mount visible={row?.kyc === 1 && !row.fingId}>
                <Tooltip title="Kyc Done">
                  <DoneAllIcon />
                </Tooltip>
              </Mount>
              <Mount visible={row?.kyc === 1 && row.fingId}>
                <Tooltip title="Kyc / AePS2 Done">
                  <PlaylistAddCheckIcon />
                </Tooltip>
              </Mount>

              <Mount visible={row?.kyc !== 1}>
                <Tooltip title="Kyc Pending">
                  <MoreHorizIcon />
                </Tooltip>
              </Mount>
            </Box>
          )}
        </div>
      ),
    },
    {
      name: "Actions",
      selector: (row) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {user && user.role === "Admin" && (
            <AdminCreateVirtualAcct row={row} refresh={refresh} />
          )}
          {user && user.role === "Admin" && (
            <AsmProductSaleModal
              role={row.role}
              name={row.name}
              id={row.id}
              amount={
                <Tooltip title="Performace Report" placement="bottom">
                  <BarChartIcon sx={{ color: "#655487" }} />
                </Tooltip>
              }
              usedInUserTable
            />
          )}
          {user && user.role === "Admin" && (
            <AdminDocsViewModal row={row} refresh={refresh} />
          )}
          {user && user.role === "Admin" && <WalletDebitModal row={row} />}
          {user && user.role === "Admin" && (
            <ViewUserModal
              row={row}
              refresh={refresh}
              asmArray={asmList}
              adArray={adMdVal}
            />
          )}
          <UserServiceSetting row={row} />

          {user?.id.toString() === "1" && (
            <AdminDeletesUserModal row={row} refresh={refresh} />
          )}
        </Box>
      ),
      omit: user && user.role === "Admin" ? false : true,
      width: "230px",
      center: true,
    },
  ];

  const apiUsersColumns = [
    {
      name:
        user && user.role === "Admin"
          ? "ID/Date"
          : user && user.role === "Asm"
          ? "ID/Date"
          : "Date",
      selector: (row) => (
        <>
          <div
            hidden={
              user && user.role === "Admin"
                ? false
                : user && user.role === "Asm"
                ? false
                : true
            }
            style={{ marginBottom: "5px", textAlign: "left" }}
          >
            {row.id}
          </div>
          <div style={{ textAlign: "left" }}>
            {datemonthYear(row.created_at)}
          </div>
        </>
      ),
      width: "120px",
    },
    {
      name: "Mobile",
      selector: (row) => (
        <>
          <div
            onClick={() => {
              copyToClipBoard(row.username);
              handleClickSnack();
            }}
            style={{ textAlign: "left" }}
          >
            {row.username}
          </div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseSnack}
            message="number copied"
            sx={{ zIndex: 10000 }}
          />

          <Mount visible={user.role === "Admin"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Mount visible={row.instId}>
                <AepsIdButton
                  id={row.instId}
                  onClick={() => {
                    copyToClipBoard(row.instId);
                    handleClickSnack();
                  }}
                />
              </Mount>
              <Mount visible={row.fingId}>
                <AepsIdButton
                  id={row.fingId}
                  onClick={() => {
                    copyToClipBoard(row.fingId);
                    handleClickSnack();
                  }}
                />
              </Mount>
            </Box>
          </Mount>
        </>
      ),
      wrap: true,
      width: "120px",
    },
    {
      name: "Name",
      selector: (row) => (
        <>
          <div className="break-spaces">{row.name}</div>
          <div
            style={{
              whiteSpace: "break-spaces",
              overflow: "hidden",
              textOverflow: "clip",
              textAlign: "left",
              fontSize: "10px",
              color: primaryColor(),
            }}
          >
            {row.establishment}
          </div>
        </>
      ),
      wrap: true,
      width: "140px",
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "InActive",
      cell: (row) => (
        <section>
          {" "}
          <div>{dateDifference(row.updated_at, new Date())} days</div>
          <div>{row.last_transaction}</div>
        </section>
      ),
      wrap: true,
      width: "80px",
      omit: user && user.role === "Ret" ? true : false,
    },
    {
      name: "Asm",
      cell: (row) => (
        <div
          style={{
            whiteSpace: "break-spaces",
            textOverflow: "clip",
            overflow: "hidden",
            textAlign: "left",
          }}
        >
          {getParent(row && row, false, true)}
        </div>
      ),
      wrap: true,
      grow: 2,
      omit: user && user.role === "Admin" ? false : true,
    },
    {
      name: "Wallet balance",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{currencySetter(row.w1 / 100)}</div>
          <div style={{ color: "#199ebb" }}>{currencySetter(row.w2 / 100)}</div>
          <div>
            {row.hold && row.hold > 0 ? (
              <span style={{ color: "red" }}>{currencySetter(row.hold)}</span>
            ) : (
              ""
            )}
          </div>
        </div>
      ),
      grow: 1,
      center: false,
    },
    {
      name: "Transfer",
      selector: (row) => <MoneyTransferModal refresh={refresh} row={row} />,
      omit: user && user.role === "Ad" ? false : true,
    },
    {
      name:
        user && (user.role === "Admin" || user.role === "Asm")
          ? "Status/KYC"
          : "Status",
      selector: (row) => (
        <div style={{ display: "flex" }}>
          {user && user.role === "Admin" ? (
            <BlockUnBlockModal row={row} />
          ) : (
            <Box sx={{ width: "100%" }}>
              {row.status === 1 ? (
                <Tooltip title="Unblocked">
                  <LockOpenOutlinedIcon sx={{ color: "#00BF78" }} />
                </Tooltip>
              ) : (
                <Tooltip title="Blocked">
                  <LockOutlinedIcon sx={{ color: "#DC5F5F" }} />
                </Tooltip>
              )}
            </Box>
          )}

          {((user && user.role === "Admin") ||
            (user && user.role === "Asm")) && (
            <Box
              sx={{
                fontSize: "10px",
                color: row.kyc && row.kyc === 1 ? "#00BF78" : "#DC5F5F",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                ml: 1,
              }}
            >
              <Mount visible={row?.kyc === 1 && !row.fingId}>
                <Tooltip title="Kyc Done">
                  <DoneAllIcon />
                </Tooltip>
              </Mount>
              <Mount visible={row?.kyc === 1 && row.fingId}>
                <Tooltip title="Kyc / AePS2 Done">
                  <PlaylistAddCheckIcon />
                </Tooltip>
              </Mount>

              <Mount visible={row?.kyc !== 1}>
                <Tooltip title="Kyc Pending">
                  <MoreHorizIcon />
                </Tooltip>
              </Mount>
            </Box>
          )}
        </div>
      ),
    },
    {
      name: "Actions",
      selector: (row) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {user && user.role === "Admin" && (
            <AdminCreateVirtualAcct row={row} refresh={refresh} />
          )}
          {user && user.role === "Admin" && (
            <AsmProductSaleModal
              role={row.role}
              name={row.name}
              id={row.id}
              amount={
                <Tooltip title="Performace Report" placement="bottom">
                  <BarChartIcon sx={{ color: "#655487" }} />
                </Tooltip>
              }
              usedInUserTable
            />
          )}
          {user && user.role === "Admin" && (
            <AdminDocsViewModal row={row} refresh={refresh} />
          )}
          {user && user.role === "Admin" && <WalletDebitModal row={row} />}
          {user?.id.toString() === "1" && <AdminChargesForApiUsers row={row} />}

          <UserServiceSetting row={row} />
          {user?.id.toString() === "1" && (
            <AdminDeletesUserModal row={row} refresh={refresh} />
          )}
        </Box>
      ),
      omit: user && user.role === "Admin" ? false : true,
      width: "230px",
      center: true,
    },
  ];

  const searchOptions = [
    { field: "EST", parameter: "establishment" },
    { field: "Mobile", parameter: "username" },
    {
      field: user?.role === "Ad" ? "" : "Outlet Id",
      parameter: user?.role === "Ad" ? "" : "instId",
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {/* tab pannels here */}
      <Grid container>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            // width: "100%",
            backgroundImage: `linear-gradient(
            135deg,
            hsl(255deg 28% 31%) 0%,
            hsl(261deg 22% 47%) 57%,
            hsl(266deg 32% 64%) 100%
          )`,
            borderTopRightRadius: "4px",
            borderTopLeftRadius: "4px",
          }}
        >
          <StyledTabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            variant="fullWidth"
            scrollButtons="auto"
            aria-label="full width tabs example"
          >
            {user?.role === "Admin" &&
              adminTab.map((item) => {
                return <StyledTab label={item.label} value={item.value} />;
              })}
            {user?.role === "Asm" &&
              asmTab.map((item) => {
                return <StyledTab label={item.label} value={item.value} />;
              })}
            {user?.role === "Zsm" &&
              zsmTab.map((item) => {
                return <StyledTab label={item.label} value={item.value} />;
              })}
            {user?.role === "Md" &&
              mdTab.map((item) => {
                return <StyledTab label={item.label} value={item.value} />;
              })}
            {user?.role === "Ad" &&
              adTab.map((item) => {
                return <StyledTab label={item.label} value={item.value} />;
              })}
          </StyledTabs>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: { md: "none", sm: "none", xs: "flex" },
            justifyContent: "end",
            alignItems: "center",
            flexDirection: { md: "row" },
            pr: 1,
          }}
        >
          {/* excel */}
          <div className="mx-2">
            <ExcelUploadModal
              twobuttons="Download Csv"
              btn
              request={request}
              getExcel={getExcel}
              getCsv={getCsv}
              noOfResponses={noOfResponses}
              setQuery={setQuery}
              handleCloseCB={(closeModal) => {
                handleCloseModal = closeModal;
              }}
            />
          </div>
          {/* refresh */}
          <div className="me-3">
            <RefreshComponent
              onClick={() => {
                refreshFunc(setQuery);
              }}
            />
          </div>
          {/* filter modal */}
          <FilterModal
            query={query}
            setQuery={setQuery}
            ifRoleFilter
            ifestFilter
            ifUsernameFilter
            ifInstIdFilter={user?.role === "Admin"}
            ifFingIdFilter={user?.role === "Admin"}
            ifIrctcIdFilter={user?.role === "Admin"}
            ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
            roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
            asmList={asmList}
            clearHookCb={(cb) => {
              refresh = cb;
            }}
            refresh={refresh}
          />
        </Grid>
      </Grid>
      {/* <Spinner loading={userRequest} /> */}
      {/* 0 ALL USERS*/}
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ApiPaginateSearch
          showSearch={false}
          actionButtons={
            <Grid
              item
              md={4}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {user && user.role !== "Ad" && (
                <ExcelUploadModal
                  twobuttons="Download Csv"
                  btn
                  request={request}
                  getExcel={getExcel}
                  getCsv={getCsv}
                  noOfResponses={noOfResponses}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              )}
              <Tooltip title="refresh">
                <IconButton
                  className=""
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
              {user && user.role === "Admin" ? (
                ""
              ) : user && user.role === "Asm" ? (
                ""
              ) : (
                <AddRetailerinAdUser refresh={refresh} />
              )}
            </Grid>
          }
          apiEnd={ApiEndpoints.GET_USERS}
          searchOptions={searchOptions}
          prefilledQuery={prefilledQuery}
          setQuery={setQuery}
          columns={columns}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          isFilterAllowed={true}
          filterComponent={
            <FilterCard
              showSearch={false}
              query={query}
              setQuery={setQuery}
              ifRoleFilter
              ifAdIdFilter
              ifestFilter
              ifUsernameFilter
              ifInstIdFilter={user?.role === "Admin"}
              ifFingIdFilter={user?.role === "Admin"}
              ifIrctcIdFilter={user?.role === "Admin"}
              ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
              roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
              asmList={asmList}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              actionButtons={
                <>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}
                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {user && user.role === "Admin" ? (
                    ""
                  ) : user && user.role === "Asm" ? (
                    ""
                  ) : (
                    <AddRetailerinAdUser refresh={refresh} />
                  )}
                </>
              }
            />
          }
        />
      </TabPanel>
      {/* 1 CORPORATES */}
      <TabPanel value={value} index={1} dir={theme.direction}>
        <ApiPaginateSearch
          showSearch={false}
          actionButtons={
            <Grid
              item
              md={4}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {user && user.role !== "Ad" && (
                <ExcelUploadModal
                  twobuttons="Download Csv"
                  btn
                  request={request}
                  getExcel={getExcel}
                  getCsv={getCsv}
                  noOfResponses={noOfResponses}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              )}
              <Tooltip title="refresh">
                <IconButton
                  className=""
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
              {user && user.role === "Admin" ? (
                ""
              ) : user && user.role === "Asm" ? (
                ""
              ) : (
                <AddRetailerinAdUser refresh={refresh} />
              )}
            </Grid>
          }
          apiEnd={ApiEndpoints.GET_USERS}
          searchOptions={searchOptions}
          setQuery={setQuery}
          columns={apiUsersColumns}
          prefilledQuery={prefilledQuery}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          isFilterAllowed={true}
          filterComponent={
            <FilterCard
              showSearch={false}
              query={query}
              setQuery={setQuery}
              ifRoleFilter
              ifAdIdFilter
              ifestFilter
              ifUsernameFilter
              ifInstIdFilter={user?.role === "Admin"}
              ifFingIdFilter={user?.role === "Admin"}
              ifIrctcIdFilter={user?.role === "Admin"}
              ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
              roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
              asmList={asmList}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              actionButtons={
                <>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}
                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {user && user.role === "Admin" ? (
                    ""
                  ) : user && user.role === "Asm" ? (
                    ""
                  ) : (
                    <AddRetailerinAdUser refresh={refresh} />
                  )}
                </>
              }
            />
          }
        />
      </TabPanel>
      {/* 2 ZSM */}
      <TabPanel value={value} index={2} dir={theme.direction}>
        <ApiPaginateSearch
          showSearch={false}
          actionButtons={
            <Grid
              item
              md={4}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {user && user.role !== "Ad" && (
                <ExcelUploadModal
                  twobuttons="Download Csv"
                  btn
                  request={request}
                  getExcel={getExcel}
                  getCsv={getCsv}
                  noOfResponses={noOfResponses}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              )}
              <Tooltip title="refresh">
                <IconButton
                  className=""
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
              {user && user.role === "Admin" ? (
                ""
              ) : user && user.role === "Asm" ? (
                ""
              ) : (
                <AddRetailerinAdUser refresh={refresh} />
              )}
            </Grid>
          }
          apiEnd={ApiEndpoints.GET_USERS}
          searchOptions={searchOptions}
          setQuery={setQuery}
          columns={columns}
          prefilledQuery={prefilledQuery}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          isFilterAllowed={true}
          filterComponent={
            <FilterCard
              showSearch={false}
              query={query}
              setQuery={setQuery}
              ifRoleFilter
              ifAdIdFilter
              ifestFilter
              ifUsernameFilter
              ifInstIdFilter={user?.role === "Admin"}
              ifFingIdFilter={user?.role === "Admin"}
              ifIrctcIdFilter={user?.role === "Admin"}
              ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
              roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
              asmList={asmList}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              actionButtons={
                <>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}
                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {user && user.role === "Admin" ? (
                    ""
                  ) : user && user.role === "Asm" ? (
                    ""
                  ) : (
                    <AddRetailerinAdUser refresh={refresh} />
                  )}
                </>
              }
            />
          }
        />
      </TabPanel>
      {/* 3 ASM*/}
      <TabPanel value={value} index={3} dir={theme.direction}>
        <ApiPaginateSearch
          showSearch={false}
          actionButtons={
            <Grid
              item
              md={4}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {user && user.role !== "Ad" && (
                <ExcelUploadModal
                  twobuttons="Download Csv"
                  btn
                  request={request}
                  getExcel={getExcel}
                  getCsv={getCsv}
                  noOfResponses={noOfResponses}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              )}
              <Tooltip title="refresh">
                <IconButton
                  className=""
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
              {user && user.role === "Admin" ? (
                ""
              ) : user && user.role === "Asm" ? (
                ""
              ) : (
                <AddRetailerinAdUser refresh={refresh} />
              )}
            </Grid>
          }
          apiEnd={ApiEndpoints.GET_USERS}
          searchOptions={searchOptions}
          setQuery={setQuery}
          columns={columns}
          prefilledQuery={prefilledQuery}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          isFilterAllowed={true}
          filterComponent={
            <FilterCard
              showSearch={false}
              query={query}
              setQuery={setQuery}
              ifRoleFilter
              ifAdIdFilter
              ifestFilter
              ifUsernameFilter
              ifInstIdFilter={user?.role === "Admin"}
              ifFingIdFilter={user?.role === "Admin"}
              ifIrctcIdFilter={user?.role === "Admin"}
              ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
              roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
              asmList={asmList}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              actionButtons={
                <>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}
                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {user && user.role === "Admin" ? (
                    ""
                  ) : user && user.role === "Asm" ? (
                    ""
                  ) : (
                    <AddRetailerinAdUser refresh={refresh} />
                  )}
                </>
              }
            />
          }
        />
      </TabPanel>
      {/* 4 AD*/}
      <TabPanel value={value} index={4} dir={theme.direction}>
        <ApiPaginateSearch
          showSearch={false}
          actionButtons={
            <Grid
              item
              md={4}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {user && user.role !== "Ad" && (
                <ExcelUploadModal
                  twobuttons="Download Csv"
                  btn
                  request={request}
                  getExcel={getExcel}
                  getCsv={getCsv}
                  noOfResponses={noOfResponses}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              )}
              <Tooltip title="refresh">
                <IconButton
                  className=""
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
              {user && user.role === "Admin" ? (
                ""
              ) : user && user.role === "Asm" ? (
                ""
              ) : (
                <AddRetailerinAdUser refresh={refresh} />
              )}
            </Grid>
          }
          apiEnd={ApiEndpoints.GET_USERS}
          searchOptions={searchOptions}
          setQuery={setQuery}
          columns={columns}
          prefilledQuery={prefilledQuery}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          isFilterAllowed={true}
          filterComponent={
            <FilterCard
              showSearch={false}
              query={query}
              setQuery={setQuery}
              ifRoleFilter
              ifAdIdFilter
              ifestFilter
              ifUsernameFilter
              ifInstIdFilter={user?.role === "Admin"}
              ifFingIdFilter={user?.role === "Admin"}
              ifIrctcIdFilter={user?.role === "Admin"}
              ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
              roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
              asmList={asmList}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              actionButtons={
                <>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}
                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {user && user.role === "Admin" ? (
                    ""
                  ) : user && user.role === "Asm" ? (
                    ""
                  ) : (
                    <AddRetailerinAdUser refresh={refresh} />
                  )}
                </>
              }
            />
          }
        />
      </TabPanel>
      {/* 8 MD*/}
      <TabPanel value={value} index={8} dir={theme.direction}>
        <ApiPaginateSearch
          showSearch={false}
          actionButtons={
            <Grid
              item
              md={4}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {user && user.role !== "Ad" && (
                <ExcelUploadModal
                  twobuttons="Download Csv"
                  btn
                  request={request}
                  getExcel={getExcel}
                  getCsv={getCsv}
                  noOfResponses={noOfResponses}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              )}
              <Tooltip title="refresh">
                <IconButton
                  className=""
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
              {user && user.role === "Admin" ? (
                ""
              ) : user && user.role === "Asm" ? (
                ""
              ) : (
                <AddRetailerinAdUser refresh={refresh} />
              )}
            </Grid>
          }
          apiEnd={ApiEndpoints.GET_USERS}
          searchOptions={searchOptions}
          setQuery={setQuery}
          columns={columns}
          prefilledQuery={prefilledQuery}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          isFilterAllowed={true}
          filterComponent={
            <FilterCard
              showSearch={false}
              query={query}
              setQuery={setQuery}
              ifRoleFilter
              ifAdIdFilter
              ifestFilter
              ifUsernameFilter
              ifInstIdFilter={user?.role === "Admin"}
              ifFingIdFilter={user?.role === "Admin"}
              ifIrctcIdFilter={user?.role === "Admin"}
              ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
              roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
              asmList={asmList}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              actionButtons={
                <>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}
                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {user && user.role === "Admin" ? (
                    ""
                  ) : user && user.role === "Asm" ? (
                    ""
                  ) : (
                    <AddRetailerinAdUser refresh={refresh} />
                  )}
                </>
              }
            />
          }
        />
      </TabPanel>
      {/* 5 DD*/}
      <TabPanel value={value} index={5} dir={theme.direction}>
        <ApiPaginateSearch
          showSearch={false}
          actionButtons={
            <Grid
              item
              md={4}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {user && user.role !== "Ad" && (
                <ExcelUploadModal
                  twobuttons="Download Csv"
                  btn
                  request={request}
                  getExcel={getExcel}
                  getCsv={getCsv}
                  noOfResponses={noOfResponses}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              )}
              <Tooltip title="refresh">
                <IconButton
                  className=""
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
              {user && user.role === "Admin" ? (
                ""
              ) : user && user.role === "Asm" ? (
                ""
              ) : (
                <AddRetailerinAdUser refresh={refresh} />
              )}
            </Grid>
          }
          apiEnd={ApiEndpoints.GET_USERS}
          searchOptions={searchOptions}
          setQuery={setQuery}
          columns={columns}
          prefilledQuery={prefilledQuery}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          isFilterAllowed={true}
          filterComponent={
            <FilterCard
              showSearch={false}
              query={query}
              setQuery={setQuery}
              ifRoleFilter
              ifAdIdFilter
              ifestFilter
              ifUsernameFilter
              ifInstIdFilter={user?.role === "Admin"}
              ifFingIdFilter={user?.role === "Admin"}
              ifIrctcIdFilter={user?.role === "Admin"}
              ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
              roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
              asmList={asmList}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              actionButtons={
                <>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}
                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {user && user.role === "Admin" ? (
                    ""
                  ) : user && user.role === "Asm" ? (
                    ""
                  ) : (
                    <AddRetailerinAdUser refresh={refresh} />
                  )}
                </>
              }
            />
          }
        />
      </TabPanel>
      {/* 6 RET*/}
      <TabPanel value={value} index={6} dir={theme.direction}>
        <ApiPaginateSearch
          showSearch={false}
          actionButtons={
            <Grid
              item
              md={4}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {user && user.role !== "Ad" && (
                <ExcelUploadModal
                  twobuttons="Download Csv"
                  btn
                  request={request}
                  getExcel={getExcel}
                  getCsv={getCsv}
                  noOfResponses={noOfResponses}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              )}
              <Tooltip title="refresh">
                <IconButton
                  className=""
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
              {user && user.role === "Admin" ? (
                ""
              ) : user && user.role === "Asm" ? (
                ""
              ) : (
                <AddRetailerinAdUser refresh={refresh} />
              )}
            </Grid>
          }
          apiEnd={ApiEndpoints.GET_USERS}
          searchOptions={searchOptions}
          setQuery={setQuery}
          columns={columns}
          prefilledQuery={prefilledQuery}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          isFilterAllowed={true}
          filterComponent={
            <FilterCard
              showSearch={false}
              query={query}
              setQuery={setQuery}
              ifRoleFilter
              ifAdIdFilter
              ifestFilter
              ifUsernameFilter
              ifInstIdFilter={user?.role === "Admin"}
              ifFingIdFilter={user?.role === "Admin"}
              ifIrctcIdFilter={user?.role === "Admin"}
              ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
              roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
              asmList={asmList}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              actionButtons={
                <>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}
                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {user && user.role === "Admin" ? (
                    ""
                  ) : user && user.role === "Asm" ? (
                    ""
                  ) : (
                    <AddRetailerinAdUser refresh={refresh} />
                  )}
                </>
              }
            />
          }
        />
      </TabPanel>
      {/* 7 IRCTC*/}
      <TabPanel value={value} index={7} dir={theme.direction}>
        <ApiPaginateSearch
          showSearch={false}
          actionButtons={
            <Grid
              item
              md={4}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {user && user.role !== "Ad" && (
                <ExcelUploadModal
                  twobuttons="Download Csv"
                  btn
                  request={request}
                  getExcel={getExcel}
                  getCsv={getCsv}
                  noOfResponses={noOfResponses}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              )}
              <Tooltip title="refresh">
                <IconButton
                  className=""
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
              {user && user.role === "Admin" ? (
                ""
              ) : user && user.role === "Asm" ? (
                ""
              ) : (
                <AddRetailerinAdUser refresh={refresh} />
              )}
            </Grid>
          }
          apiEnd={ApiEndpoints.GET_USERS}
          searchOptions={searchOptions}
          setQuery={setQuery}
          columns={columns}
          prefilledQuery={`irctc=irctc&platform=WEB`}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          isFilterAllowed={true}
          filterComponent={
            <FilterCard
              showSearch={false}
              query={query}
              setQuery={setQuery}
              ifRoleFilter
              ifAdIdFilter
              ifestFilter
              ifUsernameFilter
              ifInstIdFilter={user?.role === "Admin"}
              ifFingIdFilter={user?.role === "Admin"}
              ifIrctcIdFilter={user?.role === "Admin"}
              ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
              roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
              asmList={asmList}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              actionButtons={
                <>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}
                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {user && user.role === "Admin" ? (
                    ""
                  ) : user && user.role === "Asm" ? (
                    ""
                  ) : (
                    <AddRetailerinAdUser refresh={refresh} />
                  )}
                </>
              }
            />
          }
        />
      </TabPanel>
      {/* 9 UNVERIFIED*/}
      <TabPanel value={value} index={9} dir={theme.direction}>
        <ApiPaginateSearch
          showSearch={false}
          actionButtons={
            <Grid
              item
              md={4}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {user && user.role !== "Ad" && (
                <ExcelUploadModal
                  twobuttons="Download Csv"
                  btn
                  request={request}
                  getExcel={getExcel}
                  getCsv={getCsv}
                  noOfResponses={noOfResponses}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              )}
              <Tooltip title="refresh">
                <IconButton
                  className=""
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
              {user && user.role === "Admin" ? (
                ""
              ) : user && user.role === "Asm" ? (
                ""
              ) : (
                <AddRetailerinAdUser refresh={refresh} />
              )}
            </Grid>
          }
          apiEnd={ApiEndpoints.GET_USERS}
          searchOptions={searchOptions}
          setQuery={setQuery}
          columns={columns}
          prefilledQuery={`userType=unverified`}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          isFilterAllowed={true}
          filterComponent={
            <FilterCard
              showSearch={false}
              query={query}
              setQuery={setQuery}
              ifRoleFilter
              ifAdIdFilter
              ifestFilter
              ifUsernameFilter
              ifInstIdFilter={user?.role === "Admin"}
              ifFingIdFilter={user?.role === "Admin"}
              ifIrctcIdFilter={user?.role === "Admin"}
              ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
              roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
              asmList={asmList}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              actionButtons={
                <>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}
                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {user && user.role === "Admin" ? (
                    ""
                  ) : user && user.role === "Asm" ? (
                    ""
                  ) : (
                    <AddRetailerinAdUser refresh={refresh} />
                  )}
                </>
              }
            />
          }
        />
      </TabPanel>
    </Box>
  );
};

export default AdimUserView;

function AepsIdButton({ id, onClick }) {
  return (
    <Typography
      component="button"
      sx={{
        mt: 0.8,
        mx: 0.3,
        fontSize: "10px",
        fontWeight: "bold",
        color: primaryColor(),
      }}
      onClick={onClick}
    >
      {id}
    </Typography>
  );
}
