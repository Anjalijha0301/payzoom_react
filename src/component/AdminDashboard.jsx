import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import AdminWalletBalanceComponent from "./AdminWalletBalanceComponent";
import AsmProductionSaleComponent from "./AsmProductionSaleComponent";
import DashboardDataComponent2 from "./DashboardDataComponent2";
import DashboardDataToggleComponent from "./DashboardDataToggleComponent";
import ProductionSaleComponent from "./ProductionSaleComponent";
import Spinner from "../commons/Spinner";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import RetTxnCardComponent from "./RetTxnCardComponent";

const AdminDashboard = ({
  graphDuration,
  setGraphDuration,
  user,
  request,
  userData,
  graphRequest,
  setGraphRequest,
  getTxnData,
  txnDataReq,
  txnData,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* user by roles cards */}
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid
          xs={12}
          md={12}
          lg={2}
          item
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DashboardDataToggleComponent
            graphDuration={graphDuration}
            setGraphDuration={setGraphDuration}
          />
        </Grid>

        <AdminWalletBalanceComponent graphDuration={graphDuration} />
      </Grid>

      {user && user.role !== "Asm" && user.role !== "Zsm" && (
        <Grid
          container
          md={12}
          sm={11.8}
          xs={11.2}
          lg={12}
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            background: "#fff",
            borderRadius: "8px",
            padding: "1.3rem",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            mb: { md: 1, lg: 1, xs: 1, sm: 1 },
          }}
          className="position-relative"
        >
          <Spinner loading={request} />
          {userData &&
            userData.map((item, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={2.4}
                  lg={2.4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DashboardDataComponent2 users={item} />
                </Grid>
              );
            })}
        </Grid>
      )}

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ProductionSaleComponent
          graphDuration={graphDuration}
          setGraphDuration={setGraphDuration}
          graphRequest={graphRequest}
          setGraphRequest={setGraphRequest}
        />
        {user && user.role !== "Asm" && user.role !== "Zsm" ? (
          <AsmProductionSaleComponent />
        ) : (
          <Grid
            item
            lg={3.3}
            md={3.3}
            sm={11.8}
            xs={11.2}
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
                  fontWeight: "500",
                  fontSize: "18px",
                  display: "flex",
                  alignContent: "center",
                }}
              >
                {graphDuration === "TODAY"
                  ? "Today's"
                  : graphDuration === "LAST"
                  ? "Last Month's"
                  : graphDuration === "THIS"
                  ? "This Month's"
                  : ""}
                Transactions
                <CachedOutlinedIcon
                  className="ms-2 rotate-on-hover"
                  sx={{
                    transform: "scale(1)",
                    transition: "0.5s",
                    "&:hover": { transform: "scale(1.2)" },
                    ml: 1,
                  }}
                  onClick={() => {
                    if (getTxnData) {
                      getTxnData();
                    }
                  }}
                />
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "center",
                marginBottom: "1rem",
                flexDirection: { xs: "column", md: "row" },
              }}
              className="position-relative"
            >
              <Spinner loading={txnDataReq} />
              {txnData &&
                txnData.map((item) => {
                  return <RetTxnCardComponent item={item} />;
                })}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
