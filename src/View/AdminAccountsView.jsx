import { Box, Grid, Tooltip } from "@mui/material";
import React from "react";
import ApiEndpoints from "../network/ApiEndPoints";
import { useState } from "react";
import { CustomStyles } from "../component/CustomStyle";
import AddBankAddAccountModal from "../modals/AddBankAccountModal";
import { useNavigate } from "react-router-dom";
import UpdateAccount from "../modals/UpdateAccount";
import { currencySetter, numberSetter } from "../utils/Currencyutil";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
import MyButton from "../component/MyButton";
import moment from "moment";
import { get } from "../network/ApiController";
import { json2Csv, json2Excel } from "../utils/exportToExcel";
import { apiErrorToast } from "../utils/ToastUtil";
import ExcelUploadModal from "../modals/ExcelUploadModal";
import RefreshComponent from "../component/RefreshComponent";

let refresh;
let handleCloseModal;

const AdminAccountsView = () => {
  const searchOptions = [
    { field: "Business name", parameter: "est" },
    { field: "Name", parameter: "name" },
    { field: "Number", parameter: "number" },
    { field: "ASM", parameter: "asm" },
  ];

  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const [searchIn, setSearchIn] = useState(searchOptions[0].parameter);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState();
  const [debounceSearch, setdebounceSearch] = useState();
  const [request, setRequest] = useState(false);
  const [noOfResponses, setNoOfResponses] = useState(0);

  const navigate = useNavigate();

  function refreshFunc(setQueryParams) {
    setQueryParams("");
    setSearch("");
    setSearchIn("est");
    setdebounceSearch("");
    if (refresh) refresh();
  }

  const filterFunc = (item, SearchInput = "") => {
    return searchIn && searchIn === "name"
      ? item.name && item.name.toLowerCase().includes(SearchInput.toLowerCase())
      : searchIn && searchIn === "est"
      ? item.establishment &&
        item.establishment.toLowerCase().includes(SearchInput.toLowerCase())
      : searchIn && searchIn === "asm"
      ? item.asm && item.asm.toLowerCase().includes(SearchInput.toLowerCase())
      : searchIn && searchIn === "number"
      ? item.mobile &&
        ("" + item.mobile).toLowerCase().includes(SearchInput.toLowerCase())
      : "";
  };
  const getExcel = () => {
    get(
      ApiEndpoints.GET_ACCOUNTS,
      `${
        query
          ? query + "&page=1&paginate=10&export=1"
          : "&page=1&paginate=10&export=1"
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
          `Accounts ${moment(new Date().toJSON()).format(
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
      ApiEndpoints.GET_ACCOUNTS,
      `${
        query
          ? query + "&page=1&paginate=10&export=1"
          : "&page=1&paginate=10&export=1"
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

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      width: "70px",
    },
    {
      name: "Name",
      // name: (
      //   <FilterComponent
      //     name="Name"
      //     onChangeValue={(value) => {
      //       setSearch(value);
      //       setSearchIn("name");
      //     }}
      //   />
      // ),
      selector: (row) => row.name,
    },
    {
      name: "Business Name",
      // name: (
      //   <FilterComponent
      //     name="Business name"
      //     onChangeValue={(value) => {
      //       setSearch(value);
      //       setSearchIn("est");
      //     }}
      //   />
      // ),
      selector: (row) => row.establishment,
    },
    {
      name: "Number",
      // name: (
      //   <FilterComponent
      //     name="Number"
      //     onChangeValue={(value) => {
      //       setSearch(value);
      //       setSearchIn("number");
      //     }}
      //   />
      // ),
      selector: (row) => row.mobile,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "ASM",
      // name: (
      //   <FilterComponent
      //     name="ASM"
      //     onChangeValue={(value) => {
      //       setSearch(value);
      //       setSearchIn("asm");
      //     }}
      //   />
      // ),
      selector: (row) => row.asm,
    },
    {
      name: "Credit Limit",
      selector: (row) => numberSetter(row.creditlimit),
    },
    {
      name: "Balance",
      selector: (row) => currencySetter(row.balance),
    },
    {
      name: "Actions",
      selector: (row) => (
        <Box sx={{ display: "flex" }}>
          <Tooltip title="statement">
            <MyButton
              text="Statement"
              // hidden={row.status && row.status === "1"}
              onClick={() => {
                navigate("/admin/accountStatement", {
                  state: {
                    mobile: row.mobile,
                    acc_name: row.establishment,
                    bal: row.balance,
                  },
                });
              }}
            />
            {/* <Button
              display={row.status && row.status === "1" ? "none" : ""}
              style={{
                color: "green",
                fontSize: "10px",
              }}
              onClick={() => {
                navigate("/admin/accountStatement", {
                  state: {
                    mobile: row.mobile,
                    acc_name: row.establishment,
                    bal: row.balance,
                  },
                });
              }}
            >
              Statement
            </Button> */}
          </Tooltip>
          <UpdateAccount row={row} refresh={refresh} />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <ApiPaginateSearch
        actionButtons={
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
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
            <div className="me-2">
              <RefreshComponent
                className="refresh-icon-table"
                onClick={() => {
                  refreshFunc(setQuery);
                }}
                size="2rem"
              />
            </div>
            <AddBankAddAccountModal />
          </Grid>
        }
        apiEnd={ApiEndpoints.GET_ACCOUNTS}
        searchOptions={searchOptions}
        setQuery={setQuery}
        columns={columns}
        apiData={apiData}
        tableStyle={CustomStyles}
        setApiData={setApiData}
        ExpandedComponent={null}
        queryParam={query ? query : ""}
        returnRefetch={(ref) => {
          refresh = ref;
        }}
        responses={(val) => {
          setNoOfResponses(val);
        }}
        paginateServer={false}
        paginate={true}
        filterData
        DBvalue={(backval) => {
          setdebounceSearch(backval);
        }}
        choseVal={(backVal) => {
          setSearchIn(backVal);
        }}
        filterFunc={filterFunc}
        search={debounceSearch && debounceSearch}
      />
    </Box>
  );
};

export default AdminAccountsView;
