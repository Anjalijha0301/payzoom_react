import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
import { useState } from "react";
// import { useContext } from "react";
// import AuthContext from "../store/AuthContext";
import { CustomStyles } from "../component/CustomStyle";
import RefreshComponent from "../component/RefreshComponent";
import ApiEndpoints from "../network/ApiEndPoints";
import { datemonthYear } from "../utils/DateUtils";
import { useTheme } from "@mui/material/styles";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CommonStatus from "../component/CommonStatus";

// import { get } from "../network/ApiController";
// import { apiErrorToast } from "../utils/ToastUtil";
import ActiveInactiveModal from "../modals/ActiveInactiveModal";
import EditVirtualAccounts from "../component/accountLimits/EditVirtualAccounts";
import CheckResponseModal from "../modals/CheckResponseModal";
import { currencySetter } from "../utils/Currencyutil";
import FilterCard from "../modals/FilterCard";

let refresh;
let refreshFilter;

// tabs in top bar

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

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  color: "#fff",
  fontSize: "15px",
  minHeight: "15px",
  minWidth: "25px",
  padding: "8px 6px",
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

const AdminVirtualAccounts = () => {
  const theme = useTheme();
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  //   const authCtx = useContext(AuthContext);
  //   const user = authCtx.user;
  //   const role = user?.role;
  const [value, setValue] = useState(2);
  //   const [singleUser, setSingleUser] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const searchOptionsVa = [
    { field: "AC Name", parameter: "acc_name" },
    { field: "AC Number", parameter: "acc_no" },
  ];

  //   const getSingleUser = (id) => {
  //     get(
  //       ApiEndpoints.GET_USERS,
  //       `page=1&paginate=10&export=&user_id=${id}`,
  //       "",
  //       (res) => {
  //         const userArray = res.data;
  //         // console.log("userArr", userArray);
  //         setSingleUser();
  //       },
  //       (error) => {
  //         apiErrorToast(error);
  //       }
  //     );
  //   };

  const virtualAccounts = [
    {
      name: "Created/Updated",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "5px" }}>
            {datemonthYear(row.created_at)}
          </div>
          <div>{datemonthYear(row.updated_at)}</div>
        </div>
      ),
      width:"150px"

    },
    {
      name: "user",
      selector: (row) => (
        <div
          style={{ textAlign: "left" }}
          //   onClick={() => getSingleUser(row.user_id)}
        >
         {row.establishment} ({row.user_id})
        </div> 
      ),
      wrap: true,

    },
    {
      name: "Virtual Account",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          
          <div style={{color:"#473b7f"}}>{row.va}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: "Allowed Accounts",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          {" "}
          <div>{row.allowed_accounts}</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => <ActiveInactiveModal row={row} refresh={refresh} />,
      center: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* edit */}

          <EditVirtualAccounts row={row} refresh={refresh} />
        </Box>
      ),
      right: true,
    },
  ];
  const virtualTransactions = [
    {
      name: "Created/Updated",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "5px" }}>
            {datemonthYear(row.created_at)}
          </div>
          <div>{datemonthYear(row.updated_at)}</div>
        </div>
      ),
    },
    {
      name: "UTR",
      cell: (row) => <div style={{ textAlign: "left" }}>{row.utr_number}</div>,
      wrap: true,
      width: "150px",
    },
    {
      name: "Account Number",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          <div>{row.acc_number}</div>
          <div>{row.ifsc}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },

    {
      name: "Sender Name/Info",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row.sender_name}</div>
          <div>{row.sender_info}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: "VA",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row.va_account}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: "Credit Date",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row?.credit_date?.split(" ")[0]}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: "Amount",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div className="fw-bold">{currencySetter(row.amount)}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <CommonStatus
          status={row.status}
          approvedStatusText="Success"
          pendingStatusText="Pending"
          rejectedStatusText="Not Done"
          fontSize="13px"
          minWidth="120px"
        />
      ),
      center: true,
    },
    {
      name: "Response",
      selector: (row) => (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* edit */}

          <CheckResponseModal
            row={row}
            width="35px"
            height="30px"
            fontSize="12px"
          />
        </Box>
      ),
      right: true,
    },
  ];

  return (
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
          <StyledTab label="Virtual Accounts" value={2} />
          <StyledTab label="Virtual Transactions" value={3} />
        </StyledTabs>
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
          {/*  */}
          <RefreshComponent
            className="refresh-icon-table"
            onClick={() => {
              refresh();
            }}
          />
        </Grid>

        {/* 2  virtual accounts*/}
        <Grid item md={12} sm={12} xs={12}>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <ApiPaginateSearch
              showSearch={false}
              actionButtons={
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: { md: "end", xs: "start" },
                    alignItems: "center",
                    pr: 2,
                    mt: { md: 0, xs: 2, sm: 2 },
                  }}
                >
                  <RefreshComponent
                    className="refresh-icon-table"
                    onClick={() => {
                      refresh();
                    }}
                  />
                </Grid>
              }
              apiEnd={ApiEndpoints.VIRTUAL_ACCS}
              // searchOptions={searchOptions}
              setQuery={setQuery}
              columns={virtualAccounts}
              apiData={apiData}
              setApiData={setApiData}
              tableStyle={CustomStyles}
              queryParam={query ? query : ""}
              returnRefetch={(ref) => {
                refresh = ref;
              }}
              isFilterAllowed={true}
              // filterComponent={
              //   <FilterCard
              //     showSearch={false}
              //     ifBeneKycStatus
              //     setQuery={setQuery}
              //     query={query}
              //     clearHookCb={(cb) => {
              //       refreshFilter = cb;
              //     }}
              //     refresh={refresh}
              //     actionButtons={
              //       <>
              //         <RefreshComponent
              //           className="refresh-icon-table"
              //           onClick={() => {
              //             refresh();
              //           }}
              //         />
              //       </>
              //     }
              //   />
              // }
            />
          </TabPanel>
        </Grid>
        {/* 3  virtual transactions*/}
        <Grid item md={12} sm={12} xs={12}>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <ApiPaginateSearch
              showSearch={false}
              actionButtons={
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: { md: "end", xs: "start" },
                    alignItems: "center",
                    pr: 2,
                    mt: { md: 0, xs: 2, sm: 2 },
                  }}
                >
                  <RefreshComponent
                    className="refresh-icon-table"
                    onClick={() => {
                      refresh();
                    }}
                  />
                </Grid>
              }
              apiEnd={ApiEndpoints.VIRTUAL_TRANSACTIONS}
              searchOptions={searchOptionsVa}
              setQuery={setQuery}
              columns={virtualTransactions}
              apiData={apiData}
              setApiData={setApiData}
              tableStyle={CustomStyles}
              queryParam={query ? query : ""}
              returnRefetch={(ref) => {
                refresh = ref;
              }}
              isFilterAllowed={true}
              filterComponent={
                <FilterCard
                  showSearch={false}
                  ifBeneKycStatus
                  setQuery={setQuery}
                  query={query}
                  clearHookCb={(cb) => {
                    refreshFilter = cb;
                  }}
                  refresh={refresh}
                  actionButtons={
                    <>
                      <RefreshComponent
                        className="refresh-icon-table"
                        onClick={() => {
                          refresh();
                        }}
                      />
                    </>
                  }
                />
              }
            />
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminVirtualAccounts;
