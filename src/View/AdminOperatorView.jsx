/* eslint-disable no-unused-vars */
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  // IconButton,
  MenuItem,
  Switch,
  TextField,
  Typography,
  // Tooltip,
} from "@mui/material";
import React, { useContext } from "react";
import ApiEndpoints from "../network/ApiEndPoints";
// import CachedIcon from "@mui/icons-material/Cached";
import { useState } from "react";
import { CustomStyles } from "../component/CustomStyle";
import ActiveInactiveOperator from "../modals/ActiveInactiveOperator";
import EditOperator from "../modals/EditOperator";
import AddOperatorModal from "../modals/AddOperatorModal";
import ChangeRouteMenu from "../component/ChangeRouteMenu";
import { currencySetter } from "../utils/Currencyutil";
import FilterCard from "../modals/FilterCard";
import AuthContext from "../store/AuthContext";
import FilterModal from "../modals/FilterModal";
import { get } from "../network/ApiController";
import { apiErrorToast } from "../utils/ToastUtil";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
import RefreshComponent from "../component/RefreshComponent";
import ChangePipeMenu from "../modals/ChangePipeMenu";
import Mount from "../component/Mount";
import { datemonthYear } from "../utils/DateUtils";
import ActiveInactiveOpServices from "../modals/ActiveInactiveOpServices";
import EditOpServices from "../component/EditOpServices";

let refresh;
let refreshFilter;
function refreshFunc(setQueryParams) {
  // setQueryParams("");
  if (refresh) refresh();
  // if (refreshFilter) refreshFilter();
}
const AdminOperatorView = () => {
  const [apiData, setApiData] = useState([]);
  const [apiUserData, setApiUserData] = useState([]);
  // console.log("apiUserData", apiUserData);
  // console.log("apiData", apiData);
  const [query, setQuery] = useState();
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const [isShowFilterCard, setIsShowFilterCard] = useState(false);
  const [request, setRequest] = useState(false);
  const [typeList, setTypeList] = useState([]);
  const [defaultStatus, setDefaultStatus] = useState("All");
  const [showoperatorservices, setShowOperatorServices] = useState(false);

  const handleChangeStatus = (event) => {
    setDefaultStatus(
      event.target.value === "All" ? event.target.value : event.target.value * 1
    );
    if (event.target.value !== "All") {
      setQuery(`active=${event.target.value * 1}`);
    } else if (event.target.value === "All") setQuery("");
  };

  const handleOpServices = (e) => {
    setShowOperatorServices(e.target.checked);
  };
  let routeList;
  // const typeList = [
  //   { name: "UTILITY", code: "utility" },
  //   { name: "VERIFICATION", code: "verification" },
  // ];
  const statusList = [
    { name: "ACTIVE", code: 1 },
    { name: "IN-ACTIVE", code: 0 },
  ];
  const searchOptions = [{ field: "Name", parameter: "name" }];
  const [rowArray, setRowArray] = useState([]);

  const columnOptions = ["Name", "Code", "Type", "Route"];
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Code",
      selector: (row) => row.code,
    },
    {
      name: "Type",
      selector: (row) => row.category,
    },

    {
      name: "Route",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{row.route}</div>
          <ChangeRouteMenu row={row} refresh={refresh} />
        </div>
      ),
      center: false,
    },
    {
      name: "Adm Comm",
      selector: (row) => currencySetter(row.admin_comm),
    },
    {
      name: "Ret Comm",
      selector: (row) => currencySetter(row.ret_comm),
    },
    {
      name: "Ad Comm",
      selector: (row) => currencySetter(row.ad_comm),
    },
    {
      name: "Dd Comm",
      selector: (row) => currencySetter(row.dd_comm),
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
            <MenuItem dense value="All">
              All
            </MenuItem>
            <MenuItem dense value="1">
              ACTIVE
            </MenuItem>
            <MenuItem dense value="0">
              IN-ACTIVE
            </MenuItem>
          </TextField>
        </FormControl>
      ),
      selector: (row) => <ActiveInactiveOperator row={row} refresh={refresh} />,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 0.5 }}>
            <Mount visible={row.code === "DMT2"}>
              <ChangePipeMenu />
            </Mount>
          </Box>
          <EditOperator row={row} refresh={refresh} />,
        </div>
      ),
      width: "150px",
      right: true,
    },
  ];
  const opcolumns = [
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
      name: "Code",
      selector: (row) => row.code,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Route",
      selector: (row) => row.route,
    },
    {
      name: "Admin Comm",
      selector: (row) => row.a_comm,
    },
    {
      name: (
        <FormControl className="customized-textfield">
          <TextField
            select
            value={defaultStatus}
            // onChange={handleChangeStatus}
            sx={{ color: "#fff" }}
          >
            <MenuItem dense value="All">
              All
            </MenuItem>
            <MenuItem dense value="1">
              ACTIVE
            </MenuItem>
            <MenuItem dense value="0">
              IN-ACTIVE
            </MenuItem>
          </TextField>
        </FormControl>
      ),
      selector: (row) => (
        <ActiveInactiveOpServices row={row} refresh={refresh} />
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <EditOpServices refresh={refresh} row={row} />
        </Box>
      ),
    },
  ];

  function refreshFunc(setQueryParams) {
    setDefaultStatus("Status");
    if (refresh) refresh();
    // if (refreshFilter) refreshFilter();
  }

  // get types
  const getTypes = () => {
    if (typeList.length === 0) {
      get(
        ApiEndpoints.GET_CATEGORIES,
        "",
        setRequest,
        (res) => {
          const data = res.data.data;

          setTypeList(data);
        },
        (err) => {
          apiErrorToast(err);
        }
      );
    }
  };
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
        <Mount visible={user?.role === "Admin"}>
          <FormGroup>
            <FormControlLabel
              sx={{
                mt: { md: 0, sm: 2, xs: 2 },
                mb: { md: 0, sm: 2, xs: 2 },
              }}
              control={
                <Switch
                  value={showoperatorservices}
                  defaultChecked={showoperatorservices}
                  onChange={handleOpServices}
                />
              }
              label={
                <Typography variant="body2" style={{ fontSize: "15px" }}>
                  Api Services
                </Typography>
              }
            />
          </FormGroup>
        </Mount>
        <div>
          <AddOperatorModal />
        </div>
        <RefreshComponent
          className="refresh-icon-table"
          onClick={() => {
            refreshFunc(setQuery);
          }}
        />
      </Grid>
      <Grid xs={12}>
        <div>
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
                  pr: 5,
                }}
              >
                <Mount visible={user?.role === "Admin"}>
                  <FormGroup>
                    <FormControlLabel
                      sx={{
                        mt: { md: 0, sm: 2, xs: 2 },
                        mb: { md: 0, sm: 2, xs: 2 },
                      }}
                      control={
                        <Switch
                          value={showoperatorservices}
                          defaultChecked={showoperatorservices}
                          onChange={handleOpServices}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          style={{ fontSize: "15px" }}
                        >
                          Api Services
                        </Typography>
                      }
                    />
                  </FormGroup>
                </Mount>
                <div>
                  <AddOperatorModal />
                </div>
                <RefreshComponent
                  className="refresh-icon-table"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                />
                <span className="filter-sm">
                  <FilterModal
                    ifTypeFilter
                    ifnameFilter
                    ifrouteFilter
                    ifstatusFilter
                    typeList={typeList}
                    getTypes={getTypes}
                    routeList={routeList}
                    statusList={statusList}
                    operatorList={typeList}
                    setQuery={setQuery}
                    query={query}
                    clearHookCb={(cb) => {
                      refreshFilter = cb;
                    }}
                    refresh={refresh}
                    isShowFilterCard={isShowFilterCard}
                    setIsShowFilterCard={setIsShowFilterCard}
                  />
                </span>
              </Grid>
            }
            apiEnd={
              showoperatorservices
                ? ApiEndpoints.ADMIN_OP_SERVICE
                : ApiEndpoints.GET_OPERATOR
            }
            searchOptions={searchOptions}
            setQuery={setQuery}
            columns={showoperatorservices ? opcolumns : columns}
            apiData={showoperatorservices ? apiUserData : apiData}
            setApiData={showoperatorservices ? setApiUserData : setApiData}
            tableStyle={CustomStyles}
            queryParam={query ? query : ""}
            returnRefetch={(ref) => {
              refresh = ref;
            }}
            isFilterAllowed={user?.role?.toLowerCase() === "admin"}
            filterComponent={
              <FilterCard
                fromOperatorPage
                ifTypeFilter
                ifnameFilter
                ifrouteFilter
                ifstatusFilter
                typeList={typeList}
                getTypes={getTypes}
                routeList={routeList}
                statusList={statusList}
                setQuery={setQuery}
                query={query}
                clearHookCb={(cb) => {
                  refreshFilter = cb;
                }}
                refresh={refresh}
                isShowFilterCard={isShowFilterCard}
                setIsShowFilterCard={setIsShowFilterCard}
              />
            }
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default AdminOperatorView;
