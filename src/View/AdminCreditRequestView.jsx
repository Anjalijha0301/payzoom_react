/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  TextField,
  IconButton,
  Tooltip,
  Snackbar,
  Button,
  Grid,
} from "@mui/material";
import ApiEndpoints from "../network/ApiEndPoints";
// import ApiPaginate from "../component/ApiPaginate";
import { datemonthYear, yyyymmdd } from "../utils/DateUtils";
import { CustomStyles } from "../component/CustomStyle";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CreditRequestModal from "../modals/CreditRequestModal";
import numWords from "num-words";
import CachedIcon from "@mui/icons-material/Cached";
// import FilterComponent from "../component/FilterComponent";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import CreateCreditRequest from "../modals/CreateCreditRequest";
import { useNavigate } from "react-router-dom";
import { currencySetter } from "../utils/Currencyutil";
// import ApiPaginateSearch from "../component/ApiPaginateSearch";
import ApiPaginate from "../component/ApiPaginate";
import { get } from "../network/ApiController";
import { apiErrorToast } from "../utils/ToastUtil";
import { json2Excel } from "../utils/exportToExcel";
import moment from "moment";
import ExcelUploadModal from "../modals/ExcelUploadModal";
import { DateRangePicker } from "rsuite";
// import TextToSpeech from "../component/TextToSpeech";

const CreditRequestView = () => {
  const navigate = useNavigate();
  const [prefilledQuery, SetPrefilledQuery] = useState("status=PENDING");

  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("status=PENDING");

  const [open, setOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState("PENDING");
  const [noOfResponses, setNoOfResponses] = useState(0);
  // console.log("noOfResponses", noOfResponses);
  const [request, setRequest] = useState(false);
  const [asmVal, setAsmVal] = useState([]);
  const [filterValues, setFilterValues] = useState({ date: {}, dateVal: null });
  //

  // check screen is big or small
  const [isBig, setIsBig] = React.useState(
    window.innerWidth < 900 ? false : true
  );

  const changeApply = () => {
    if (window.innerWidth < 900) setIsBig(false);
    if (window.innerWidth > 900) setIsBig(true);
  };
  useEffect(() => {
    window.addEventListener("resize", changeApply);
    return () => {
      window.removeEventListener("resize", changeApply);
    };
  }, []);

  let handleCloseModal;
  let refresh;
  function refreshFunc(setQueryParams) {
    setQueryParams("status=PENDING");
    setDefaultStatus("PENDING");
    if (refresh) refresh();
  }
  //
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

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

  const handleChangeStatus = (event) => {
    setDefaultStatus(event.target.value);
    if (defaultStatus !== "Status") {
      SetPrefilledQuery(`status=${event.target.value}`);
      setQuery(`status=${event.target.value}`);
    } else if (defaultStatus === "Status") setQuery(`status=`);
  };

  const getUserAsm = () => {
    get(
      ApiEndpoints.GET_USERS,
      `page=1&paginate=100&role=Asm&export=`,
      null,
      (res) => {
        const asmArray = res.data.data;
        setAsmVal(
          asmArray &&
            asmArray.map((item) => {
              return {
                id: item.id,
                name: item.name,
              };
            })
        );
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  const findAsmWithId = (id) => {
    let item = asmVal && asmVal.find((item) => item.id === Number(id));
    // return item && item.name
    if (item) {
      return item.name;
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (user.role === "Admin") getUserAsm();
  }, []);

  const columns = [
    {
      name: "Created/Updated",
      selector: (row) => (
        <>
          <div className="mb-1">{datemonthYear(row.created_at)}</div>
          <div>{datemonthYear(row.updated_at)}</div>
        </>
      ),
      wrap: true,
    },
    {
      name: "Date",
      selector: (row) => <div>{row.date}</div>,
      wrap: true,
    },
    {
      name: "Number",
      // name: (
      //   <FilterComponent
      //     name="Number"
      //     onKeyDown={(e) => {
      //       if (
      //         e.target.value.length === 10 &&
      //         e.key.toLowerCase() !== "backspace"
      //       ) {
      //         setQuery(`status=${defaultStatus}&number=${e.target.value}`);
      //       }
      //     }}
      //   />
      // ),
      selector: (row) => (
        <>
          <div
            onClick={() => {
              copyToClipBoard(row.username);
              handleClickSnack();
            }}
          >
            {row.username}
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleCloseSnack}
              message="number copied"
              sx={{ zIndex: 10000 }}
            />
          </div>
          <div>
            {user && user.role === "Admin" && (
              <Button
                variant="text"
                sx={{ fontSize: "8px" }}
                onClick={() => {
                  navigate("/admin/accountStatement", {
                    state: {
                      mobile: row.username,
                      acc_name: row.name,
                      bal: row.balance,
                    },
                  });
                }}
              >
                Go to acc
              </Button>
            )}
          </div>
        </>
      ),
      wrap: true,
      width: "120px",
      omit:
        user && user.role === "Admin"
          ? false
          : user && user.role === "Asm"
          ? false
          : true,
    },
    {
      name: "Establishment",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{row.name}</div>
          <div style={{ color: "grey" }}>
            {row.role && row.role === "Ret"
              ? "Retailer"
              : row.role && row.role === "Ad"
              ? "Area Distributer"
              : row.role && row.role === "Api"
              ? "Corporates"
              : row.role && row.role === "Asm"
              ? "Sales Manager"
              : row.role && row.role === "Dd"
              ? "Direct Dealer"
              : ""}
          </div>
        </div>
      ),
      wrap: true,
      center: false,
      omit:
        user && user.role === "Admin"
          ? false
          : user && user.role === "Asm"
          ? false
          : true,
    },
    {
      name: "ASM",
      selector: (row) => findAsmWithId(row.asm_Id),
      wrap: true,
      width: "150px",
      omit:
        user && user.role === "Admin"
          ? false
          : user && user.role === "Asm"
          ? true
          : true,
    },
    {
      name: "Bank/Mode",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{row.bank_name}</div>
          <div style={{ color: "grey" }}>{row.mode}</div>
        </div>
      ),
      wrap: true,
      center: false,
    },

    {
      name: "Ref",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>{row.bank_ref_id}</div>
      ),
      wrap: true,
      grow: 0.8,
      center: false,
    },
    {
      name: "Amount",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{currencySetter(row.amount)}</div>
          <div style={{ color: "grey" }}>{numWords(row.amount)}</div>
        </div>
      ),
      wrap: true,
      grow: 1,
    },
    {
      name: "Credit",
      selector: (row) => currencySetter(row.ledger_bal),
      wrap: true,
      right: true,
      width: "100px",
      // omit: user && (user.role === "Ret" || user.role === "Dd"),
      omit: user && user.role !== "Admin",
    },
    {
      name: "Remark",
      selector: (row) => row.remark,
      wrap: true,
      center: true,
    },
    {
      name: "Action",
      selector: (row) =>
        defaultStatus === "REJECTED" ? (
          <CreditRequestModal row={row} action="REOPEN" refresh={refresh} />
        ) : (
          <div style={{ display: "flex" }}>
            <CreditRequestModal row={row} action="APPROVE" refresh={refresh} />
            <CreditRequestModal row={row} action="REJECT" refresh={refresh} />
          </div>
        ),
      wrap: true,
      center: true,
      omit:
        user && user.role === "Admin"
          ? defaultStatus && defaultStatus === "APPROVED"
            ? true
            : false
          : true,
    },
    {
      name: (
        <FormControl className="customized-textfield">
          <TextField
            select
            value={defaultStatus}
            onChange={handleChangeStatus}
            sx={{ color: "#fff" }}
          >
            <MenuItem dense value="PENDING">
              PENDING
            </MenuItem>
            <MenuItem dense value="APPROVED">
              APPROVED
            </MenuItem>
            <MenuItem dense value="REJECTED">
              REJECTED
            </MenuItem>
          </TextField>
        </FormControl>
      ),
      selector: (
        row //pending aprooved rejected
      ) => (
        <Box
          style={{
            fontSize: "10px",
            color:
              row.status && row.status === "APPROVED"
                ? "#00BF78"
                : row.status && row.status === "PENDING"
                ? "#F08D17"
                : "#DC5F5F",
            width: "72px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {row.status && row.status === "APPROVED" ? (
            <DoneAllIcon />
          ) : row.status && row.status === "PENDING" ? (
            <MoreHorizIcon />
          ) : (
            <CloseIcon />
          )}
        </Box>
      ),
      center: true,
      wrap: true,
      width: "150px",
    },
  ];

  // excel api call
  const getExcel = () => {
    get(
      ApiEndpoints.CRED_REQ,
      `${
        query
          ? query + "&page=1&paginate=10&export=1"
          : "page=1&paginate=10&export=1&status=ALL"
      }`,
      setRequest,
      (res) => {
        const apiData = res.data.data;
        // console.log("data", apiData);
        json2Excel(
          `Fund Request ${moment(new Date().toJSON()).format(
            "Do MMM YYYY"
          )} | ${moment(new Date().toJSON()).format("hh:mm a")}`,
          JSON.parse(JSON.stringify(apiData && apiData))
        );
        handleCloseModal();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  return (
    <>
      <Box
        className="table-container"
        sx={{
          display: "flex",
          justifyContent: "end",
          pt: 1,
          pb: 1,
        }}
      >
        {/* date filter */}
        <Box sx={{ mx: 2 }}>
          <DateRangePicker
            placement={isBig ? "leftStart" : "auto"}
            showOneCalendar
            placeholder="Date"
            size="xs"
            cleanable
            value={filterValues.dateVal}
            onChange={(value) => {
              const dateVal = value;
              const dates = {
                start: dateVal && dateVal[0],
                end: dateVal && dateVal[1],
              };
              setFilterValues({
                ...filterValues,
                date: {
                  start: yyyymmdd(dates.start),
                  end: yyyymmdd(dates.end),
                },
                dateVal,
              });
              if (dateVal) {
                setQuery(
                  `${prefilledQuery}&start=${yyyymmdd(
                    dateVal[0]
                  )}&end=${yyyymmdd(dateVal[1])}`
                );
              } else {
                setQuery(`${prefilledQuery}`);
              }
            }}
            // disabledDate={afterToday()}
          />
        </Box>

        <Tooltip title="export">
          <ExcelUploadModal
            btn
            request={request}
            getExcel={getExcel}
            noOfResponses={noOfResponses}
            setQuery={setQuery}
            handleCloseCB={(closeModal) => {
              handleCloseModal = closeModal;
            }}
          />
        </Tooltip>

        <Tooltip title="refresh">
          <IconButton
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
          <CreateCreditRequest refresh={refresh} />
        )}
      </Box>
      <Grid sx={{ pr: { xs: 1.3, lg: 0 } }}>
        <ApiPaginate
          apiEnd={ApiEndpoints.CRED_REQ}
          columns={columns}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          ExpandedComponent={null}
          responses={(val) => {
            setNoOfResponses(val);
          }}
        />
      </Grid>
    </>
  );
};

export default CreditRequestView;
