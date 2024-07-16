import { Grid, Typography } from "@mui/material";
import React from "react";
import RetTxnCardComponent from "./RetTxnCardComponent";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { primaryColor, getHoverInActive } from "../theme/setThemeColor";
import Spinner from "../commons/Spinner";

// tab styles . .  .
export const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  // borderRadius: "4px",
  padding: "12px 10px",
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
});

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  () => ({
    color: "#fff",
    fontSize: "12px",
    minHeight: "15px",
    minWidth: "25px",
    padding: "8px 6px",
    borderRadius: "4px",
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
  })
);

const TodayThisLastComponent = ({
  txnDataDuration,
  txnDataReq,
  txnData,
  getTxnData,
  handleChange,
}) => {
  return (
    <div>
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
          {txnDataDuration === "TODAY"
            ? "Today's"
            : txnDataDuration === "LAST"
            ? "Last Month's"
            : txnDataDuration === "THIS"
            ? "This Month's"
            : ""}{" "}
          Transactions
          <CachedOutlinedIcon
            className="ms-2 refresh-purple"
            sx={{
              ml: 1,
            }}
            onClick={() => {
              getTxnData();
            }}
          />
        </Typography>
      </Grid>

      {/* filter tabs component */}
      <Grid
        item
        xs={12}
        sx={{
          width: "100%",
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
          value={txnDataDuration}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="full width tabs example"
        >
          <StyledTab label="TODAY" value="TODAY" />
          <StyledTab label="THIS" value="THIS" />
          <StyledTab label="LAST" value="LAST" />
        </StyledTabs>
      </Grid>
      {/* success fail cards mapping */}
      <Grid
        item
        sx={{
          alignItems: "center",
          marginBottom: "1rem",
          flexDirection: { xs: "column", md: "row" },
        }}
        className="position-relative"
      >
        <Spinner loading={txnDataReq} circleBlue />
        {txnData?.length > 0 &&
          txnData.map((item) => {
            return <RetTxnCardComponent item={item} />;
          })}
      </Grid>
    </div>
  );
};

export default TodayThisLastComponent;
