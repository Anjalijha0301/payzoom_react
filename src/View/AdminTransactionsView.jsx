import React, { useState } from "react";
import {
  Tooltip,
  Snackbar,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import ApiEndpoints from "../network/ApiEndPoints";
import { datemonthYear } from "../utils/DateUtils";
import { CustomStyles } from "../component/CustomStyle";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import LaptopIcon from "@mui/icons-material/Laptop";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import { get } from "../network/ApiController";
import { apiErrorToast } from "../utils/ToastUtil";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CheckResponseModal from "../modals/CheckResponseModal";
import CheckStatusModal from "../modals/CheckStatusModal";
import ChangeStatusModal from "../modals/ChangeStatusModal";
import GetAdModalTxn from "../modals/GetAdModalTxn";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
// import RaiseIssueModal from "../modals/RaiseIssueModal";
import { currencySetter } from "../utils/Currencyutil";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
// import PrintIcon from "@mui/icons-material/Print";
import ExcelUploadModal from "../modals/ExcelUploadModal";
import moment from "moment";
import { json2Csv, json2Excel } from "../utils/exportToExcel";
import { capitalize1 } from "../utils/TextUtil";
import FilterCard from "../modals/FilterCard";
import FilterModal from "../modals/FilterModal";
import {
  AD_REPORTS,
  REPORTS,
  nonAdminColOptions,
  searchOptions,
} from "../utils/constants";
import { useMemo } from "react";
import RefreshComponent from "../component/RefreshComponent";
import { Link, useNavigate } from "react-router-dom";
import { primaryColor } from "../theme/setThemeColor";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useCommonContext from "../store/CommonContext";
import RightSidePannel from "../component/transactions/RightSidePannel";
// import { Icon } from "@iconify/react";

// eslint-disable-next-line no-unused-vars
let refreshFilter;
let refresh;
let handleCloseModal;
const AdminTransactionsView = () => {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const [asmList, setAsmList] = useState([]);
  const authCtx = useContext(AuthContext);
  const [state, setState] = useState(false);
  const [rowData, setRowData] = useState(false);
  const user = authCtx.user;
  const role = user?.role.toLowerCase();

  const [showOldTransaction, setShowOldTransaction] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [request, setRequest] = useState();
  const [noOfResponses, setNoOfResponses] = useState(0);
  const [typeList, setTypeList] = useState([]);
  const navigate = useNavigate();

  // const chooseCat = (value) => {
  //   setQuery("&category=" + value);
  // };
  // const [columnOptions, setColumnOptions] = useState([]);

  const isFilterAllowed = useMemo(
    () =>
      user?.role.toLowerCase() === "admin" ||
      user?.role.toLowerCase() === "dd" ||
      user?.role.toLowerCase() === "ad" ||
      user?.role.toLowerCase() === "asm" ||
      user?.role.toLowerCase() === "ret" ||
      user?.role.toLowerCase() === "api",
    [user]
  );

  const getExcel = () => {
    get(
      showOldTransaction && showOldTransaction
        ? ApiEndpoints.OLD_TRANSACTIONS
        : ApiEndpoints.GET_TRANSACTIONS,
      // ApiEndpoints.GET_USERS,
      `${
        query
          ? query + `&page=1&paginate=10&export=1`
          : `page=1&paginate=10&export=1`
      }`,
      setRequest,
      (res) => {
        const apiData = res.data.data;
        const newApiData = apiData.map((item) => {
          const created_at = moment(item.created_at).format("DD-MM-YYYY");
          const time_updated_at = moment(item.updated_at).format("LTS");
          return { ...item, created_at, time_updated_at };
        });
        json2Excel(
          `Transactions ${moment(new Date().toJSON()).format(
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
      showOldTransaction && showOldTransaction
        ? ApiEndpoints.OLD_TRANSACTIONS
        : ApiEndpoints.GET_TRANSACTIONS,
      `${
        query
          ? query + `&page=1&paginate=10&export=1`
          : `page=1&paginate=10&export=1`
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
          `Transactions ${moment(new Date().toJSON()).format(
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

  // get asm list api
  const getAsmValue = () => {
    get(
      ApiEndpoints.GET_USERS,
      `page=1&paginate=10&role=Asm&export=`,
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

  // get types
  const getTypes = () => {
    if (typeList.length === 0) {
      get(
        ApiEndpoints.GET_CATEGORIES,
        "",
        setRequest,
        (res) => {
          const data = res.data.data;
          if (data) {
            data.push({ id: 13, name: "ALL" });
          }
          setTypeList(data);
        },
        (err) => {
          apiErrorToast(err);
        }
      );
    }
  };
  useEffect(() => {
    refreshUser();
    getTypes();
    if (role === "admin") {
      getAsmValue();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isShowFilterCard, setIsShowFilterCard] = useState(false);
  const {
    setChooseInitialCategoryFilter,
    chooseInitialCategoryFilter,
    refreshUser,
  } = useCommonContext();

  function refreshFunc(setQueryParams) {
    if (refresh) refresh();
  }

  const [operatorList, setOperatorList] = useState([]);
  const getOperatorVal = () => {
    get(
      ApiEndpoints.GET_OPERATOR,
      "",
      "",
      (res) => {
        const opArray = res.data.data;

        setOperatorList(opArray);
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const [open, setOpen] = React.useState(false);
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
    } catch (err) {}
  };

  // table data & conditional styles.....
  const conditionalRowStyles = [
    {
      when: (row) => row.operator.toLowerCase() === "admin transfer",
      style: {
        backgroundColor: "#dc5f5f38",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  ////  disable rows
  const isStatusPending = (row) =>
    // row.status.toLowerCase() === "pending" ||
    row.status.toLowerCase() === "refund" ||
    row.status.toLowerCase() === "failed";

  const columns = [
    {
      name: "Date/Time",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "5px" }}>
            {datemonthYear(row.created_at)}
          </div>
          <div>{datemonthYear(row.updated_at)}</div>
        </div>
      ),
      wrap: true,
      grow: 1.3,
      width: "110px",
    },
    {
      name: "Route",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <div>
            {row.platform === "APP" ? (
              <Tooltip title="APP">
                <InstallMobileIcon fontSize="small" />
              </Tooltip>
            ) : row.platform === "WEB" ? (
              <Tooltip title="WEB">
                <LaptopIcon fontSize="small" />
              </Tooltip>
            ) : row.platform === "ANDROID" ? (
              <Tooltip title="ANDROID">
                <AndroidIcon fontSize="small" />
              </Tooltip>
            ) : row.platform === "IOS" ? (
              <Tooltip title="IOS">
                <AppleIcon fontSize="small" />
              </Tooltip>
            ) : (
              <Tooltip title="API">
                <SyncAltIcon fontSize="small" />
              </Tooltip>
            )}
          </div>
          <div className="fw-bold">{row.route}</div>
        </div>
      ),
      center: false,
      width: "70px",
    },
    {
      name: <span className="">MOP</span>,
      selector: (row) => <div className="fw-bold">{row.mop}</div>,
      width: "70px",
    },
    {
      name: <span className="">Order ID</span>,
      selector: (row) => (
        <div className="d-flex flex-column align-items-start">
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              // color: "#566573",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              copyToClipBoard(row.order_id);
              handleClickSnack();
            }}
          >
            {row.order_id}
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleCloseSnack}
              message="number copied"
              sx={{ zIndex: 10000 }}
            />
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <CheckStatusModal row={row} />
            <CheckResponseModal row={row} />
          </div>
        </div>
      ),
      width: "130px",
    },
    {
      name: <span className="">Operator</span>,
      selector: (row) => (
        <div>
          <Tooltip
            placement="right"
            title={
              row.operator === "Vendor Payments" ? "settlements" : row.operator
            }
          >
            <div className="break-words mr-2">
              {row.operator === "Vendor Payments"
                ? "settlements"
                : row.operator}
            </div>
          </Tooltip>

          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              // color: "#566573",
              textAlign: "left",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              copyToClipBoard(row.client_id);
              handleClickSnack();
            }}
          >
            {row.client_id}
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleCloseSnack}
              message="number copied"
              sx={{ zIndex: 10000 }}
            />
          </Typography>
        </div>
      ),
      wrap: true,
      width: "150px",
    },
    // est missing from ad login
    {
      name: <span className="">EST</span>,
      selector: (row) => (
        <div
          style={{
            textAlign: "left",
          }}
        >
          <Tooltip title={capitalize1(row.establishment)}>
            <div className="d-flex" style={{ textAlign: "left" }}>
              <span className="break-words" style={{ marginRight: "4px" }}>
                {capitalize1(row.establishment)}
              </span>

              <GetAdModalTxn row={row} />
            </div>
          </Tooltip>
        </div>
      ),
      wrap: true,
      width: "150px",
      center: false,
    },
    {
      name: <span className="">Number</span>,
      selector: (row) => (
        <div className="d-flex flex-column align-items-start">
          <Typography
            sx={{
              fontSize: "inherit",
              fontWeight: "600",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              copyToClipBoard(row.number);
              handleClickSnack();
            }}
          >
            {row.number}
          </Typography>
        </div>
      ),
      wrap: true,
      center: false,
      width: "100px",
    },
    {
      name: <span className="ms-3">Info</span>,
      selector: (row) => (
        <Typography
          className="d-flex flex-column align-items-start ms-3"
          sx={{
            fontSize: "9px",
            textAlign: "left",
            fontWeight: "600",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => {
            copyToClipBoard(row.ben_acc);
            handleClickSnack();
          }}
        >
          <div>{row.ben_name}</div>
          <div>{row.ben_acc}</div>
          <div>{row.ifsc}</div>
        </Typography>
      ),
      wrap: true,
      width: "120px",
    },

    {
      name: <span className="pe-2">Amount</span>,
      cell: (row) => (
        <div className="d-flex flex-column align-items-end pe-3 fw-bold">
          <div>{currencySetter(row.amount)}</div>
          <div
            style={{
              color: row.txn_type === "CR" ? "green" : "red",
              textAlign: "right",
            }}
          >
            {row.txn_type === "CR" ? "+ " : "- "}
            {currencySetter(row.net_amount)}
          </div>
          <div style={{ color: "#5B4C7D" }}>
            {currencySetter(row.ad_comm)} 
          </div>
        </div>
      ),
      right: true,
      width: "120px",
    },
    {
      name: <span className="pe-2">GST/TDS</span>,
      cell: (row) => (
        <div className="fw-bold">
          <div>{currencySetter(row.gst)}</div>
          <div>{currencySetter(row.ret_tds)}</div>
        </div>
      ),
      width: "65px",
    },
    {
      name: "Closing",
      selector: (row) => (
        <div className="d-flex align-items-start flex-column fw-bold">
          <div>{currencySetter(row.w1)}</div>
          <div style={{ color: "#F29132" }} hidden={role === "api"}>
            {currencySetter(row.w2)}
          </div>

          <div style={{ color: "#9f86c0" }}>
            {currencySetter(row.ad_closing)}
          </div>
        </div>
      ),
    },
    {
      name: "Adm Comm.",
      selector: (row) => (
        <div className="d-flex align-items-start flex-column">
          <div>{currencySetter(row.a_comm)}</div>
        </div>
      ),
      width: "100px",
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <div
            className="px-2 text-uppercase"
            style={{
              color: "#fff",
              backgroundColor:
                row.status && row.status === "SUCCESS"
                  ? "#00BF78"
                  : row.status && row.status === "PENDING"
                  ? "#F08D17"
                  : row.status && row.status === "REFUND"
                  ? "#9f86c0"
                  : row.status && row.status === "FAILED"
                  ? "#DC6F6F"
                  : "#00BF78",
              fontWeight: "bold",
              borderRadius: "4px",
              minWidth: "85px",
            }}
          >
            {row.status && row.status === "SUCCESS"
              ? "Success"
              : row.status && row.status === "PENDING"
              ? "Pending"
              : row.status && row.status === "REFUND"
              ? "Refund"
              : row.status && row.status === "FAILED"
              ? "Failed"
              : "Success"}
          </div>
          <div
            className="break-words"
            style={{
              fontSize: "9px",
              maxWidth: "85px",
              marginTop: "5px",
              color: "#000",
              fontWeight: "600",
            }}
          >
            {row.op_id}
          </div>
        </>
      ),
      wrap: true,
      width: "100px",
    },
    {
      name: "Action",
      selector: (row) => <ChangeStatusModal row={row} refresh={refresh} />,
      wrap: true,
      center: false,
    },
    {
      name: "Details",
      selector: (row) => (
        <Button
          type="text"
          onClick={() => {
            setRowData(row);
            setState(true);
          }}
          sx={{
            textTransform: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          className="just-hover"
        >
          View
        </Button>
      ),
      center: true,
    },
  ];

  const statusList = [
    { name: "SUCCESS", code: "SUCCESS" },
    { name: "PENDING", code: "PENDING" },
    { name: "REFUND", code: "REFUND" },
    { name: "FAILED", code: "FAILED" },
  ];
  useEffect(() => {
    if (selectedRows) {
      localStorage.setItem(
        "selectedRow",
        JSON.stringify(selectedRows.selectedRows)
      );
    }
    return () => {};
  }, [selectedRows]);

  // // use effect for dynamic filter values
  // useEffect(() => {
  //   if (apiData.length > 0) {
  //     const {
  //       route: Route,
  //       order_id: OrderId,
  //       operator: Operator,
  //       establishment: EST,
  //       number: Number,
  //       info: Info,
  //       amount: Amount,
  //       w1: Closing,
  //       status: Status,
  //     } = apiData[0];

  //     const filterKeysObj = {
  //       Route,
  //       OrderId,
  //       Operator,
  //       EST,
  //       Number,
  //       Info,
  //       Amount,
  //       Closing,
  //       Status,
  //     };
  //     const value = Object.keys(filterKeysObj);

  //     setColumnOptions([...value, "Action"]);
  //   }
  // }, [apiData]);

  if (!chooseInitialCategoryFilter && role !== "admin" && role !== "api") {
    return (
      <>
        <Grid container>
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              textAlign: "left",
              pl: 3,
              fontSize: "25px",
              fontWeight: "600",
              mb: 3,
            }}
          >
            Reports
          </Grid>
          {typeList.length > 1 &&
            typeList
              .filter((i) => i.name !== "SECONDARY")
              .map((item) => {
                return (
                  <Grid
                    item
                    md={2}
                    onClick={() => {
                      setChooseInitialCategoryFilter(item.name);
                    }}
                    className="all-categories-box hover-less-zoom"
                  >
                    <Box sx={{ width: "30%", p: 1 }}>
                      <Box className="transaction-icon-box">
                        <img
                          src={`https://api.impsguru.com/public/logos/${
                            item.name.split(" ")[0]
                          }.svg`}
                          alt="categories"
                          width="65%"
                        />
                      </Box>
                    </Box>
                    <Box sx={{ width: "70%" }}>{item.name}</Box>
                  </Grid>
                );
              })}
        </Grid>

        <Grid
          container
          sx={{ mt: 5 }}
          hidden={role !== "ret" && role !== "dd" && role !== "ad"}
        >
          {(role === "ad"
            ? AD_REPORTS
            : REPORTS.filter((i) => {
                if (user?.acst === 0) {
                  return i.name !== "ACCOUNT LEDGER";
                } else {
                  return i;
                }
              })
          ).map((item) => {
            return (
              <Grid
                item
                md={2}
                onClick={() => navigate(item.url)}
                className="all-categories-box hover-less-zoom"
                // sx={{
                //   backgroundImage: `url("https://api.impsguru.com/public/logos/${
                //     item.name.split(" ")[0]
                //   }.svg")`,
                // }}
              >
                <Box sx={{ width: "30%", p: 1 }}>
                  <Box className="transaction-icon-box">
                    <img
                      src={`https://api.impsguru.com/public/logos/${
                        item.name.split(" ")[0]
                      }.svg`}
                      alt="categories"
                      width="65%"
                    />
                  </Box>
                </Box>
                <Box sx={{ width: "70%" }}>{item.name}</Box>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  } else {
    return (
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
          {/* form in filter */}

          <FormGroup>
            <FormControlLabel
              sx={{
                mt: { md: 0, sm: 2, xs: 2 },
                mb: { md: 0, sm: 2, xs: 2 },
              }}
              control={
                <Switch
                  value={showOldTransaction}
                  defaultChecked={showOldTransaction}
                  onChange={() => setShowOldTransaction(!showOldTransaction)}
                />
              }
              label={
                <Typography variant="body2" style={{ fontSize: "15px" }}>
                  Old
                </Typography>
              }
            />
          </FormGroup>
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
              className="refresh-icon-table"
              onClick={() => {
                refreshFunc(setQuery);
              }}
            />
          </div>
          {/* filter modal */}
          <FilterModal
            ifdateFilter
            ifrouteFilter
            ifoperatorFilter
            ifstatusFilter
            iforderidFilter
            // type and category is same
            ifTypeFilter
            ifUsernameFilter
            ifestFilter
            ifnumberFilter
            ifotherFilter
            ifAdIdFilter
            ifAsmFilter
            chooseInitialCategoryFilter={
              chooseInitialCategoryFilter !== "ALL"
                ? chooseInitialCategoryFilter
                : false
            }
            operatorList={operatorList}
            statusList={statusList}
            getOperatorVal={getOperatorVal}
            setQuery={setQuery}
            query={query}
            clearHookCb={(cb) => {
              refreshFilter = cb;
            }}
            refresh={refresh}
            isShowFilterCard={isShowFilterCard}
            setIsShowFilterCard={setIsShowFilterCard}
          />
        </Grid>
        <Grid xs={12} sx={{ pl: { xs: 0, md: 2 } }}>
          <ApiPaginateSearch
            showSearch={false}
            actionButtons={
              <Grid
                item
                md={11}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: { md: "end", xs: "start" },
                  alignItems: "center",
                  flexDirection: { md: "row", xs: "column" },
                  pr: 1,
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    sx={{
                      mt: { md: 0, sm: 2, xs: 2 },
                      mb: { md: 0, sm: 2, xs: 2 },
                    }}
                    control={
                      <Switch
                        value={showOldTransaction}
                        defaultChecked={showOldTransaction}
                        onChange={() =>
                          setShowOldTransaction(!showOldTransaction)
                        }
                      />
                    }
                    label={
                      <Typography variant="body2" style={{ fontSize: "15px" }}>
                        Old Transactions
                      </Typography>
                    }
                  />
                </FormGroup>

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
                <RefreshComponent
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                />
              </Grid>
            }
            backButton={
              role !== "admin" && role !== "api" ? (
                <Button
                  size="small"
                  className="otp-hover-purple mb-2"
                  sx={{
                    color: primaryColor(),
                  }}
                  onClick={() => {
                    setChooseInitialCategoryFilter(false);
                  }}
                >
                  <KeyboardBackspaceIcon fontSize="small" /> Back
                </Button>
              ) : (
                false
              )
            }
            apiEnd={
              showOldTransaction && showOldTransaction
                ? ApiEndpoints.OLD_TRANSACTIONS
                : ApiEndpoints.GET_TRANSACTIONS
            }
            searchOptions={searchOptions[`${role}`]}
            setQuery={setQuery}
            columns={columns}
            apiData={apiData}
            setApiData={setApiData}
            tableStyle={CustomStyles}
            queryParam={query ? query : ""}
            returnRefetch={(ref) => {
              refresh = ref;
            }}
            conditionalRowStyles={conditionalRowStyles}
            selectableRows={
              user &&
              user.role !== "Admin" &&
              user.role !== "Asm" &&
              user.role !== "Ad" &&
              user.role !== "Api"
              // selectedRows?.selectedRows.length === 1 &&
              // selectedRows?.selectedRows[0].operator === "Super Transfer"
            }
            selectableRowDisabled={isStatusPending}
            onSelectedRowsChange={(data) => {
              setSelectedRows(data);
            }}
            responses={(val) => {
              setNoOfResponses(val);
            }}
            isFilterAllowed={isFilterAllowed}
            filterComponent={
              <FilterCard
                showSearch={false}
                ifdateFilter
                ifrouteFilter
                ifoperatorFilter
                ifstatusFilter
                iforderidFilter
                // type and category is same
                ifTypeFilter
                ifUsernameFilter
                ifestFilter
                ifnumberFilter
                ifotherFilter
                chooseInitialCategoryFilter={
                  chooseInitialCategoryFilter !== "ALL"
                    ? chooseInitialCategoryFilter
                    : false
                }
                //
                ifAdIdFilter
                ifAsmFilter
                asmList={asmList}
                typeList={typeList.filter((item) => item.name !== "ALL")}
                ifClientIdFilter
                nonAdminColOptions={nonAdminColOptions[`${role}`]}
                statusList={statusList}
                operatorList={operatorList}
                getOperatorVal={getOperatorVal}
                setQuery={setQuery}
                query={query}
                clearHookCb={(cb) => {
                  refreshFilter = cb;
                }}
                getTypes={getTypes}
                refresh={refresh}
                isShowFilterCard={isShowFilterCard}
                setIsShowFilterCard={setIsShowFilterCard}
                // buttons
                actionButtons={
                  <>
                    <FormGroup>
                      <FormControlLabel
                        sx={{
                          mt: { md: 0, sm: 2, xs: 2 },
                          mb: { md: 0, sm: 2, xs: 2 },
                        }}
                        control={
                          <Switch
                            value={showOldTransaction}
                            defaultChecked={showOldTransaction}
                            onChange={() =>
                              setShowOldTransaction(!showOldTransaction)
                            }
                          />
                        }
                        label={
                          <Typography
                            variant="body2"
                            style={{ fontSize: "15px" }}
                          >
                            Old
                          </Typography>
                        }
                      />
                    </FormGroup>

                    <div className="">
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
                    <RefreshComponent
                      className="refresh-icon-table"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    />
                    <div className="ms-3">
                      <Link to="/admin/pg-orders" className="navLinks">
                        <Button
                          variant="outlined"
                          className="refresh-icon-risk"
                          sx={{ py: 0.3, fontSize: "13px" }}
                        >
                          PG Orders
                        </Button>
                      </Link>
                    </div>
                  </>
                }
              />
            }
          />
        </Grid>
        <RightSidePannel
          state={state}
          setState={setState}
          row={rowData}
          setRow={setRowData}
          // buttons={<ChangeStatusModal row={rowData} refresh={refresh} />}
        />
      </Grid>
    );
  }
};

export default AdminTransactionsView;
