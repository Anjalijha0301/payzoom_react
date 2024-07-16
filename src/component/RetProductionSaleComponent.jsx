import React from "react";
import { Grid, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import ApiPaginate from "./ApiPaginate";
import { CustomStyles } from "./CustomStyle";
import { apiErrorToast } from "../utils/ToastUtil";
import { postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { useEffect } from "react";
import { currencySetter } from "../utils/Currencyutil";
import CheckIcon from "@mui/icons-material/Check";
import BarChartIcon from "@mui/icons-material/BarChart";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TodayThisLastComponent from "./TodayThisLastComponent";

let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}
const RetProductionSaleComponent = () => {
  const [txnDataReq, setTxnDataReq] = useState(false);
  const [txnDataDuration, setTxnDataDuration] = useState("TODAY");
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const handleChange = (event, newValue) => {
    if (process.env.REACT_APP_TITLE === "ImpsGuru")
      setTxnDataDuration(newValue);
    else setTxnDataDuration(event);
  };

  const [txnData, setTxnData] = useState([
    {
      name: "SUCCESS",
      balance: "0",
      percent: "0",
      icon: <CheckIcon sx={{ fontSize: "16px" }} />,
      color: " rgb(75, 192, 192)",
      bgColor: "rgb(75, 192, 192 , 0.20)",
    },
    {
      name: "PENDING",
      balance: "0",
      percent: "0",
      icon: <PriorityHighOutlinedIcon sx={{ fontSize: "16px" }} />,
      color: "rgba(255, 204, 86)",
      bgColor: "rgb(255, 204, 86 , 0.20)",
    },
    {
      name: "FAILED",
      balance: "0",
      percent: "0",
      icon: <CloseOutlinedIcon sx={{ fontSize: "16px" }} />,
      color: "rgba(255, 99, 133)",
      bgColor: "rgb(255, 99, 133 , 0.20)",
    },
    {
      name: "TOTAL",
      balance: "0",
      percent: "0",
      icon: <BarChartIcon sx={{ fontSize: "16px" }} />,
      color: "rgb(153, 102, 255)",
      bgColor: "rgb(153, 102, 255 , 0.20)",
    },
  ]);

  const getTxnData = () => {
    postJsonData(
      ApiEndpoints.ADMIN_DASHBOARD_GET_TXN_DATA,
      {
        type: txnDataDuration,
      },
      setTxnDataReq,
      (res) => {
        const data = res.data.data;
        // console.log("data", data);
        const newData = [...txnData];
        newData.forEach((oldData) => {
          if (oldData.name === "SUCCESS") {
            oldData.balance = data.SUCCESS;
            if (data.SUCCESS === 0) {
              oldData.percent = 0;
            } else {
              oldData.percent = (data.SUCCESS * 100) / data.TOTAL;
            }
          }
          if (oldData.name === "PENDING") {
            oldData.balance = data.PENDING;
            if (data.PENDING === 0) {
              oldData.percent = 0;
            } else {
              oldData.percent = (data.PENDING * 100) / data.TOTAL;
            }
          }
          if (oldData.name === "FAILED") {
            oldData.balance = data.FAILED;
            if (data.FAILED === 0) {
              oldData.percent = 0;
            } else {
              oldData.percent = (data.FAILED * 100) / data.TOTAL;
            }
          }
          if (oldData.name === "TOTAL") {
            oldData.balance = data.TOTAL;
            if (data.TOTAL !== 0) {
              oldData.percent = (data.TOTAL * 100) / data.TOTAL;
            } else {
              oldData.percent = 0;
            }
          }
        });

        setTxnData(newData);
      },
      (err) => {
        apiErrorToast(err);
        setTxnData([]);
      }
    );
  };

  useEffect(() => {
    getTxnData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txnDataDuration]);

  const columns = [
    {
      name: "Services",
      selector: (row) => row.service,
    },
    {
      name: "Last Month",
      selector: (row) => currencySetter(row.Last),
    },

    {
      name: "This Month",
      selector: (row) => currencySetter(row.This),
    },
    {
      name: "Today",
      selector: (row) => currencySetter(row.Today),
    },

    {
      name: "Achieved",
      selector: (row) => (
        <div style={{ width: "100px" }}>
          <div>
            {Number(row.Last) === 0
              ? "0.00%"
              : Number((parseInt(row.This) * 100) / parseInt(row.Last)).toFixed(
                  2
                ) + "%"}
          </div>
          <div>
            <LinearProgress
              variant="determinate"
              value={
                Number((parseInt(row.This) * 100) / parseInt(row.Last)) > 100
                  ? 100
                  : Number(row.Last) === 0
                  ? 0
                  : Number((parseInt(row.This) * 100) / parseInt(row.Last))
              }
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Grid
      container
      sx={{
        mt: 1.2,
        pr: { xs: 1.3, lg: 0 },
        mb: { xs: 8, lg: 0 },
      }}
    >
      {/* product sale card component */}
      <Grid
        item
        lg={8}
        md={12}
        sm={12}
        xs={12}
        sx={{
          background: "#fff",
          padding: "1.3rem",
          height: "auto",
          borderRadius: "8px",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          ml: { md: 0, xs: 0 },
          mr: { md: 0, xs: 0 },
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography
            style={{
              fontWeight: "600",
              fontSize: "16px",
              display: "flex",
              alignContent: "center",
            }}
          >
            Product Sale
            <CachedOutlinedIcon
              className="ms-2 refresh-purple"
              sx={{
                ml: 1,
              }}
              onClick={() => {
                refreshFunc(setQuery);
              }}
            />
          </Typography>
        </Grid>
        {/* product sale table */}
        <Grid
          item
          sx={{ minHeight: { md: "350px", sm: "180px", xs: "180px" } }}
        >
          <ApiPaginate
            apiEnd={ApiEndpoints.GET_RET_PROD_SALE}
            columns={columns}
            apiData={apiData}
            tableStyle={CustomStyles}
            setApiData={setApiData}
            ExpandedComponent=""
            queryParam={query ? query : ""}
            returnRefetch={(ref) => {
              refresh = ref;
            }}
            paginate={false}
          />
        </Grid>
      </Grid>
      {/* transactions card component */}
      <Grid
        item
        lg={3.8}
        md={12}
        sm={12}
        xs={12}
        sx={{
          background: "#fff",
          borderRadius: "8px",
          padding: "1.3rem",
          height: "auto",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          ml: { lg: 1, md: 1, sm: 0, xs: 0 },
          mt: { md: 0, xs: 1, sm: 1, lg: 0 },
        }}
      >
        <TodayThisLastComponent
          txnDataDuration={txnDataDuration}
          txnDataReq={txnDataReq}
          txnData={txnData}
          getTxnData={getTxnData}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default RetProductionSaleComponent;
