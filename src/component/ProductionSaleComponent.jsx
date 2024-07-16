import {
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast } from "../utils/ToastUtil";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import DashboardDataComponent1 from "./DashboardDataComponent1";

import { barChartData, totalChartData } from "../utils/ChartUtil";
import Spinner from "../commons/Spinner";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import ApiPaginate from "./ApiPaginate";
import { massegetable } from "./CustomStyle";
import AdminBarChart from "./AdminBarChart";
import LineChartAllServices from "./LineChartAllServices.";
import AdminLineChart from "./AdminLineChart";
import { primaryColor } from "../theme/setThemeColor";

let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}
const ProductionSaleComponent = ({
  graphDuration,
  graphRequest,
  setGraphRequest,
  isPaisaKart = false,
}) => {
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const [graphData, setGraphData] = useState([]);
  const [graphAllData, setGraphAllData] = useState();
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const [txnDataReq, setTxnDataReq] = useState(false);
  const [showAllGraph, setShowAllGraph] = useState(false);
  const [showProductTable, setShowProductTable] = useState(
    user && (user.role === "Asm" || user.role === "Zsm") ? true : false
  );
  const [txnData, setTxnData] = useState([
    {
      name: "TOTAL",
      balance: "0",
      color: "#9f86c0",
    },
    {
      name: "SUCCESS",
      balance: "0",
      color: "#00BF78",
    },
    {
      name: "PENDING",
      balance: "0",
      color: "#F08D17",
    },
    {
      name: "FAILED",
      balance: "0",
      color: "#DC5F5F",
    },
  ]);

  const columnsProd = [
    {
      name: "Services",
      selector: (row) => row.service,
    },
    {
      name: "Last Month",
      selector: (row) => Number(row.Last).toFixed(2),
    },

    {
      name: "This Month",
      selector: (row) => Number(row.This).toFixed(2),
    },
    {
      name: "Today",
      selector: (row) => Number(row.Today).toFixed(2),
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

  const getGraphData = () => {
    postJsonData(
      ApiEndpoints.ADMIN_DASHBOARD_GET_GRAPH_DATA,
      {
        type: graphDuration,
      },
      setGraphRequest,
      (res) => {
        const data = res.data.data;
        if (graphDuration === "TODAY") {
          setGraphData(barChartData(data));
        } else if (graphDuration === "THIS" || graphDuration === "LAST") {
          setGraphAllData(data && data);
          setGraphData(totalChartData(data));
        }
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  const getTxnData = () => {
    postJsonData(
      ApiEndpoints.ADMIN_DASHBOARD_GET_TXN_DATA,
      {
        type: graphDuration,
      },
      setTxnDataReq,
      (res) => {
        const data = res.data.data;
        const newData = [...txnData];
        newData.forEach((oldData) => {
          if (oldData.name === "SUCCESS") {
            oldData.balance = data.SUCCESS;
          }
          if (oldData.name === "PENDING") {
            oldData.balance = data.PENDING;
          }
          if (oldData.name === "FAILED") {
            oldData.balance = data.FAILED;
          }
          if (oldData.name === "TOTAL") {
            oldData.balance = data.TOTAL;
          }
        });
        setTxnData(newData);
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  useEffect(() => {
    if (user.role !== "Zsm") {
      getGraphData();
    }
    if (
      user.role !== "Ret" &&
      user.role !== "Dd" &&
      user.role !== "Asm" &&
      user.role !== "Zsm"
    ) {
      getTxnData();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphDuration]);

  return (
    <Grid
      item
      lg={
        user &&
        (user.role === "Ret" ||
          user.role === "Dd" ||
          user.role === "Asm" ||
          user.role === "Zsm")
          ? 8.5
          : isPaisaKart
          ? 12
          : 5.4 // admin
      }
      md={user && (user.role === "Asm" || user.role === "Zsm") ? 8.5 : 12}
      sm={11.8}
      xs={11.2}
      sx={{
        background: "#fff",
        borderRadius: "8px",
        padding: "1.3rem",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        ml: { md: 0, xs: 0 },
        mr: { md: 0, xs: 0 },
        height: "auto",
      }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          style={{
            fontWeight: "500",
            fontSize: "18px",
            display: "flex",
            alignContent: "center",
          }}
        >
          Product Sale
          <CachedOutlinedIcon
            className="ms-2 refresh-purple"
            sx={{
              transform: "scale(1)",
              transition: "0.5s",
              "&:hover": { transform: "scale(1.2)" },
              ml: 1,
            }}
            onClick={() => {
              if (showProductTable && showProductTable) {
                refreshFunc(setQuery);
              } else {
                getGraphData();
                if (user && (user.role !== "Asm" || user.role !== "Zsm")) {
                  getTxnData();
                }
              }
            }}
          />
        </Typography>
        <div style={{ display: "flex" }}>
          {user && (user.role === "Asm" || user.role === "Zsm") && (
            <FormGroup>
              <FormControlLabel
                sx={{
                  mt: { md: 0, sm: 2, xs: 2 },
                  mb: { md: 0, sm: 2, xs: 2 },
                }}
                control={
                  <Switch
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: primaryColor(),
                      },
                    }}
                    value={showProductTable}
                    defaultChecked={showProductTable}
                    onChange={() => setShowProductTable(!showProductTable)}
                  />
                }
                label={
                  <Typography variant="body2" style={{ fontSize: "15px" }}>
                    Product Table
                  </Typography>
                }
              />
            </FormGroup>
          )}
          {!showProductTable &&
            graphDuration &&
            graphDuration !== "TODAY" &&
            !graphRequest && (
              <FormGroup>
                <FormControlLabel
                  sx={{
                    mt: { md: 0, sm: 2, xs: 2 },
                    mb: { md: 0, sm: 2, xs: 2 },
                  }}
                  control={
                    <Switch
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#9f86c0",
                        },
                      }}
                      value={showAllGraph}
                      defaultChecked={showAllGraph}
                      onChange={() => setShowAllGraph(!showAllGraph)}
                    />
                  }
                  label={
                    <Typography variant="body2" style={{ fontSize: "15px" }}>
                      All Services
                    </Typography>
                  }
                />
              </FormGroup>
            )}
        </div>
      </Grid>

      <Grid container>
        {user &&
          user.role !== "Ret" &&
          user.role !== "Dd" &&
          user.role !== "Asm" &&
          user.role !== "Zsm" && (
            <Grid
              item
              // hidden={showAllGraph}
              lg={12}
              md={11}
              sm={11}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.5rem",
              }}
              className="position-relative"
              onClick={getTxnData}
            >
              <Spinner loading={txnDataReq} circleBlue />
              {txnData &&
                txnData.map((item, index) => {
                  return (
                    <Grid key={index} item xs={6} sm={2} md={2}>
                      {/* transaction count component */}
                      <DashboardDataComponent1
                        users={item}
                        data="txn"
                        index={index}
                        len={txnData.length}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          )}

        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{ minHeight: { md: "350px", sm: "180px", xs: "180px" } }}
          className="position-relative"
        >
          <Spinner loading={graphRequest && !showProductTable} circleBlue />

          {user &&
          (user.role === "Asm" || user.role === "Zsm") &&
          showProductTable ? (
            <Grid item xs={12} lg={12} sm={12} md={12}>
              <ApiPaginate
                apiEnd={ApiEndpoints.GET_RET_PROD_SALE}
                columns={columnsProd}
                apiData={apiData}
                tableStyle={massegetable}
                setApiData={setApiData}
                queryParam={query ? query : ""}
                returnRefetch={(ref) => {
                  refresh = ref;
                }}
                ExpandedComponent={null}
                paginateServer={false}
                paginate={false}
              />
            </Grid>
          ) : !showProductTable &&
            graphDuration &&
            graphDuration === "TODAY" ? (
            <AdminBarChart graphData={graphData} />
          ) : (
            ((!showProductTable && graphDuration === "THIS") ||
              graphDuration === "LAST") && (
              <>
                {showAllGraph ? (
                  <LineChartAllServices graphData={graphAllData} />
                ) : (
                  <AdminLineChart graphData={graphData} />
                )}
              </>
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductionSaleComponent;
