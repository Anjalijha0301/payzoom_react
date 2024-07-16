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
import { currencySetter } from "../utils/Currencyutil";
import { useTheme } from "@mui/material/styles";

import CreateEditLimitAccount from "../component/accountLimits/CreateEditLimtAccount";
import AdminDeleteLimitedAccounts from "../component/accountLimits/AdminDeleteLimitedAccounts";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AdminApprovesBene from "../modals/AdminApprovesBene";
import CommonStatus from "../component/CommonStatus";
import Mount from "../component/Mount";
import FilterCard from "../modals/FilterCard";
import FilterModal from "../modals/FilterModal";
import { get } from "../network/ApiController";
import { apiErrorToast } from "../utils/ToastUtil";
import ActiveInactiveModal from "../modals/ActiveInactiveModal";
import EditVirtualAccounts from "../component/accountLimits/EditVirtualAccounts";
import CheckResponseModal from "../modals/CheckResponseModal";

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

const AdminRiskView = () => {
  const theme = useTheme();
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  //   const authCtx = useContext(AuthContext);
  //   const user = authCtx.user;
  //   const role = user?.role;
  const [value, setValue] = useState(0);
  const [singleUser, setSingleUser] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const searchOptions = [
    { field: "AC Name", parameter: "acc_name" },
    { field: "AC Number", parameter: "acc_no" },
  ];
  const searchOptionsVa = [
    { field: "AC Name", parameter: "acc_name" },
    { field: "AC Number", parameter: "acc_no" },
  ];

  const getSingleUser = (id) => {
    get(
      ApiEndpoints.GET_USERS,
      `page=1&paginate=10&export=&user_id=${id}`,
      "",
      (res) => {
        const userArray = res.data;
        console.log("userArr", userArray);
        setSingleUser();
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      width: "70px",
    },
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
      name: "AC Name",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>{row.acc_name}</div>
      ),
      wrap: true,
    },
    {
      name: "AC Number",
      selector: (row) => row.acc_no,
    },
    {
      name: "AC IFSC",
      selector: (row) => row.ifsc,
    },
    {
      name: "AC Type",
      selector: (row) => row.acc_type,
    },
    {
      name: "AC Limit",
      selector: (row) => currencySetter(row.acc_limit),
    },
    {
      name: "Actions",
      selector: (row) => (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* edit */}

          <CreateEditLimitAccount edit row={row} refresh={refresh} />
          <AdminDeleteLimitedAccounts row={row} refresh={refresh} />
        </Box>
      ),
      right: true,
    },
  ];

  const settlementBeneficiarys = [
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
      width: "160px",
    },
    {
      name: "Id",
      selector: (row) => <div style={{ textAlign: "left" }}>{row.id}</div>,
      width: "60px",
    },
    {
      name: "Name",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row.name}</div>
          <div
            style={{
              marginTop: "2px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            <CommonStatus
              status={row.status}
              approvedStatusText="Verified"
              fontSize="13px"
              // minWidth="120px"
              maxWidth="120px"
            />
          </div>
        </div>
      ),
      center: true,
      wrap: true,
      width: "250px",
    },
    {
      name: "Bank",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{row.bank}</div>
          <div>{row.ifsc}</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Account",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{row.acc_number}</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "KYC",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <CommonStatus
            status={row.kyc_status}
            approvedStatusText="Verified"
            pendingStatusText="Pending"
            rejectedStatusText="Not Done"
            fontSize="13px"
            minWidth="120px"
          />
        </div>
      ),
      center: true,
      width: "150px",
    },
    {
      name: "Actions",
      selector: (row) => <AdminApprovesBene row={row} refresh={refresh} />,
      center: true,
    },
  ];
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
    },
    {
      name: "Id",
      selector: (row) => (
        <div
          style={{ textAlign: "left" }}
          onClick={() => getSingleUser(row.user_id)}
        >
          {row.user_id}
        </div>
      ),
      width: "50px",
    },
    {
      name: "Virtual Account",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row.va}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: "Allowed Accounts",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row.allowed_accounts}</div>
        </div>
      ),
      center: true,
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
          <StyledTab label="Account Limit" value={0} />
          <StyledTab label="Settlement Beneficiary's" value={1} />
          {/* <StyledTab label="Virtual Accounts" value={2} />
          <StyledTab label="Virtual Transactions" value={3} /> */}
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
          <Mount visible={value === 0}>
            <div className="mx-2">
              <CreateEditLimitAccount refresh={refresh} />
            </div>
          </Mount>
          <Mount visible={value === 1}>
            <div className="mx-2">
              <FilterModal
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
            </div>
          </Mount>

          {/*  */}
          <RefreshComponent
            className="refresh-icon-table"
            onClick={() => {
              refresh();
            }}
          />
        </Grid>
        {/* 0 Account limit  */}
        <Grid item md={12} sm={12} xs={12}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ApiPaginateSearch
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
                  <div className="mx-2">
                    <CreateEditLimitAccount refresh={refresh} />
                  </div>
                  <RefreshComponent
                    className="refresh-icon-table"
                    onClick={() => {
                      refresh();
                    }}
                  />
                </Grid>
              }
              apiEnd={ApiEndpoints.ADMIN_ACCOUNTS_LIMITS}
              searchOptions={searchOptions}
              setQuery={setQuery}
              columns={columns}
              apiData={apiData}
              setApiData={setApiData}
              tableStyle={CustomStyles}
              queryParam={query ? query : ""}
              returnRefetch={(ref) => {
                refresh = ref;
              }}
            />
          </TabPanel>
        </Grid>
        {/* 1  "Settlement Beneficiary's" */}
        <Grid item md={12} sm={12} xs={12}>
          <TabPanel value={value} index={1} dir={theme.direction}>
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
              apiEnd={ApiEndpoints.PAYOUT_BENES}
              searchOptions={searchOptions}
              setQuery={setQuery}
              columns={settlementBeneficiarys}
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
      </Grid>
    </Grid>
  );
};

export default AdminRiskView;
