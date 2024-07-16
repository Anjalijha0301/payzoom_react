import React, { useState } from "react";
import {
  Tooltip,
  // Snackbar,
  // IconButton,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  Box,
} from "@mui/material";
// import InstallMobileIcon from "@mui/icons-material/InstallMobile";
// import LaptopIcon from "@mui/icons-material/Laptop";
// import AppleIcon from "@mui/icons-material/Apple";
// import AndroidIcon from "@mui/icons-material/Android";
// import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useEffect } from "react";
import { useContext } from "react";

import PrintIcon from "@mui/icons-material/Print";
import moment from "moment";

import { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AuthContext from "../../store/AuthContext";
import ApiEndpoints from "../../network/ApiEndPoints";
import { get } from "../../network/ApiController";
import { json2Csv, json2Excel } from "../../utils/exportToExcel";
import { apiErrorToast } from "../../utils/ToastUtil";
import useCommonContext from "../../store/CommonContext";
import { datemonthYear } from "../../utils/DateUtils";
// import CheckStatusModal from "../../modals/CheckStatusModal";
// import CheckResponseModal from "../../modals/CheckResponseModal";
// import { capitalize1 } from "../../utils/TextUtil";
// import GetAdModalTxn from "../../modals/GetAdModalTxn";
import { currencySetter } from "../../utils/Currencyutil";

import RaiseIssueModal from "../../modals/RaiseIssueModal";
import {
  AD_REPORTS,
  REPORTS,
  nonAdminColOptions,
  searchOptions,
} from "../../utils/constants";
import ApiPaginateSearch from "../../component/ApiPaginateSearch";
import ExcelUploadModal from "../../modals/ExcelUploadModal";
import RefreshComponent from "../../component/RefreshComponent";
import FilterModal from "../../modals/FilterModal";
import { primaryColor } from "../../theme/setThemeColor";
import { CustomStyles } from "../../component/CustomStyle";
import FilterCard from "../../modals/FilterCard";
// import { Icon } from "@iconify/react";
import RightSidePannel from "../../component/transactions/RightSidePannel";
// eslint-disable-next-line no-unused-vars
let refreshFilter;
let refresh;

let handleCloseModal;
const RetDdTransactionView = () => {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const role = user?.role.toLowerCase();
  const [state, setState] = useState(false);
  const [rowData, setRowData] = useState({});
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

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isShowFilterCard, setIsShowFilterCard] = useState(false);
  const {
    setChooseInitialCategoryFilter,
    chooseInitialCategoryFilter,
    refreshUser,
  } = useCommonContext();

  const prefilledQuery = `category=${chooseInitialCategoryFilter}`;

  useEffect(() => {
    if (chooseInitialCategoryFilter && chooseInitialCategoryFilter !== "ALL") {
      setQuery(`category=${chooseInitialCategoryFilter}`);
    }
  }, [chooseInitialCategoryFilter]);

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
        // const op = opArray.map((item) => {
        //   return {
        //     code: item.code,
        //     name: item.name,
        //   };
        // });
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
    row.status.toLowerCase() === "failed" ||
    row.operator === "Vendor Payments";

  const columns = [
    {
      name: "Date/Time",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "5px" }}>
            {datemonthYear(row.created_at)}
          </div>
          {/* <div>{datemonthYear(row.updated_at)}</div> */}
        </div>
      ),
      wrap: true,
      // grow: 1.3,
      width: "120px",
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
        </div>
      ),
      wrap: true,
      width: "160px",
    },
    // est missing from ad login

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
      omit: role === "ad",
    },

    {
      name: <span className="pe-2">Amount</span>,
      cell: (row) => (
        <div className="d-flex flex-column align-items-end pe-3 fw-bold">
          <div style={{ color: "green" }}>{currencySetter(row.amount)}</div>

          <div style={{ color: "#5B4C7D" }} hidden={role !== "admin"}>
            {currencySetter(row.ad_comm)}
          </div>
        </div>
      ),
      right: true,
    },
    {
      name: "Charge",
      cell: (row) => (
        <div style={{ color: "red", textAlign: "right" }} className="fw-bold">
          {currencySetter(row.ret_charge)}
        </div>
      ),
      width: "80px",
      center: true,
    },
    {
      name: "GST",
      cell: (row) => (
        <div style={{ color: "red", textAlign: "center" }} className="fw-bold">
          {currencySetter(row.gst)}
        </div>
      ),
      width: "80px",
      center: true,
    },

    {
      name: <span className="pe-2">Comm</span>,
      cell: (row) => (
        <div className="fw-bold">
          <div>
            {currencySetter(role === "ad" ? row.ad_comm : row.ret_comm)}
          </div>
        </div>
      ),

      width: "80px",
    },
    {
      name: "TDS",
      selector: (row) => (
        <>
          <div style={{ color: "#715E93" }} className="fw-bold">
            {currencySetter(role === "ad" ? row.ad_tds : row.ret_tds)}
          </div>
        </>
      ),
      // omit: user && user.role !== "Ad",
      width: "80px",
    },

    {
      name: "CR/DR",
      selector: (row) => (
        <>
          <div
            style={{
              color: row.txn_type === "CR" ? "green" : "red",
              textAlign: "right",
            }}
            className="fw-bold"
          >
            {row.txn_type === "CR" ? "+ " : "- "}
            {currencySetter(row.net_amount)}
          </div>
        </>
      ),
      omit: user && user.role === "Ad",
    },
    {
      name: <span className="pe-2">GST/TDS</span>,
      cell: (row) => (
        <div className="fw-bold">
          <div>{currencySetter(row.gst)}</div>
          <div>{currencySetter(row.ret_tds)}</div>
        </div>
      ),
      omit: role !== "admin",
      width: "65px",
    },
    {
      name: "Closing",
      selector: (row) => (
        <div className="d-flex align-items-start flex-column fw-bold">
          <div>{currencySetter(row.w1)}</div>
          <div style={{ color: "#F29132" }}>{currencySetter(row.w2)}</div>
        </div>
      ),
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
      width: "120px",
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
        >
          View
        </Button>
      ),
    },
  ];

  // const searchOptions = [
  //   { field: "Number", parameter: "number" },
  //   { field: "Account", parameter: "ben_acc" },
  //   { field: "Username", parameter: "username" },
  // ];

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
        {/* small screen action button and filter modal show only on small screen*/}

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
          {/* back button */}
          <div className="me-3">
            {" "}
            <Button
              size="small"
              className="otp-hover-purple"
              sx={{
                color: primaryColor(),
              }}
              onClick={() => {
                setChooseInitialCategoryFilter(false);
              }}
            >
              <KeyboardBackspaceIcon fontSize="small" /> Back
            </Button>
          </div>{" "}
          {/* radio toggle */}
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
          <FilterModal
            ifoperatorFilter
            ifstatusFilter
            ifdateFilter
            // type and category is sa
            ifTypeFilter
            ifnumberFilter
            ifotherFilter
            typeList={typeList.filter((item) => item.name !== "ALL")}
            operatorList={operatorList}
            statusList={statusList}
            getOperatorVal={getOperatorVal}
            setQuery={setQuery}
            query={query}
            clearHookCb={(cb) => {
              refreshFilter = cb;
            }}
            getTypes={getTypes}
            refresh={refresh}
          />{" "}
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
                        Old
                      </Typography>
                    }
                  />
                </FormGroup>
                {user?.role?.toLowerCase() !== "admin" &&
                  user?.role?.toLowerCase() !== "asm" &&
                  user?.role?.toLowerCase() !== "ad" &&
                  user?.role?.toLowerCase() !== "api" && (
                    <Tooltip title="Download Receipt" placement="top">
                      <PrintIcon
                        color="success"
                        className=" mx-2 refresh-purple"
                        onClick={() => {
                          if (
                            selectedRows &&
                            selectedRows.selectedRows &&
                            selectedRows.selectedRows.length > 0
                          ) {
                            window.open("/receipt", "_blank");
                          } else {
                            apiErrorToast("No Transaction Selected.");
                          }
                        }}
                      />
                    </Tooltip>
                  )}
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
            selectableRows
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
                ifoperatorFilter
                ifstatusFilter
                ifdateFilter
                // type and category is same
                ifTypeFilter
                chooseInitialCategoryFilter={
                  chooseInitialCategoryFilter !== "ALL"
                    ? chooseInitialCategoryFilter
                    : false
                }
                //
                ifnumberFilter
                ifotherFilter
                typeList={typeList.filter((item) => item.name !== "ALL")}
                nonAdminColOptions={nonAdminColOptions[`${role}`]}
                statusList={statusList}
                operatorList={operatorList}
                getOperatorVal={getOperatorVal}
                setQuery={setQuery}
                query={query}
                clearHookCb={(cb) => {
                  refreshFilter = cb;
                }}
                refresh={refresh}
                getTypes={getTypes}
                isShowFilterCard={isShowFilterCard}
                setIsShowFilterCard={setIsShowFilterCard}
                // button
                backButton={
                  <Button
                    size="small"
                    className="otp-hover-purple"
                    sx={{
                      color: primaryColor(),
                      mt: 2,
                    }}
                    onClick={() => {
                      setChooseInitialCategoryFilter(false);
                    }}
                  >
                    <KeyboardBackspaceIcon fontSize="small" /> Back
                  </Button>
                }
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

                    <Tooltip title="Download Receipt" placement="top">
                      <PrintIcon
                        color="success"
                        className="refresh-purple"
                        onClick={() => {
                          if (
                            selectedRows &&
                            selectedRows.selectedRows &&
                            selectedRows.selectedRows.length > 0
                          ) {
                            window.open("/receipt", "_blank");
                          } else {
                            apiErrorToast("No Transaction Selected.");
                          }
                        }}
                      />
                    </Tooltip>

                    <div className="me-1">
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
          buttons={
            (rowData?.status === "SUCCESS" ||
              rowData?.status === "PENDING") && (
              <RaiseIssueModal row={rowData} refresh={refresh} />
            )
          }
        />
      </Grid>
    );
  }
};

export default RetDdTransactionView;
