import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import ApiPaginate from "../component/ApiPaginate";
import { CustomStyles } from "../component/CustomStyle";
import ApiEndpoints from "../network/ApiEndPoints";
import CachedIcon from "@mui/icons-material/Cached";
import { datemonthYear } from "../utils/DateUtils";
import IssueHandlerModal from "../modals/IssueHandlerModal";
import { currencySetter } from "../utils/Currencyutil";

const ComplaintsView = () => {
  let refresh;
  function refreshFunc(setQuery) {
    setQuery(`status=OPEN`);
    if (refresh) refresh();
  }

  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState(`status=OPEN`);
  const [defaultStatus, setDefaultStatus] = useState("OPEN");

  const handleChangeStatus = (event) => {
    setDefaultStatus(event.target.value);
    if (event.target.value === "OPEN") setQuery(`status=OPEN`);
    else if (event.target.value === "CLOSED") setQuery(`status=CLOSED`);
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => (
        <div>
          <div>{datemonthYear(row.created_at)}</div>
          <div>{datemonthYear(row.updated_at)}</div>
        </div>
      ),
      width: "150px",
    },
    {
      name: "Est",
      selector: (row) => (
        <Tooltip title={row.establishment}>
          <div style={{ textAlign: "left" }}>{row.establishment}</div>
        </Tooltip>
      ),
      width: "170px",
      wrap: true,
    },
    {
      name: "Operator/Route",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{row.operator}</div>
          <div>{row.route}</div>
        </div>
      ),
      center: false,
      width: "150px",
      wrap: true,
    },
    {
      name: "Number",
      selector: (row) => row.number,
      width: "110px",
    },
    {
      name: "Amount",
      selector: (row) => currencySetter(row.amount),
      width: "90px",
    },
    {
      name: "Txn Date",
      selector: (row) => row.txn_date && datemonthYear(row.txn_date),
      width: "120px",
    },
    {
      name: "Txn ID",
      selector: (row) => row.txnId,
      width: "140px",
    },
    {
      name: "Txn Status",
      selector: (row) => row.txn_status,
      width: "90px",
    },

    {
      name: "Message",
      cell: (row) => <div style={{ textAlign: "left" }}>{row.msg}</div>,
      width: "150px",
      wrap: true,
    },
    {
      name: "Remark",
      selector: (row) => <div style={{ textAlign: "left" }}>{row.remark}</div>,
      wrap: true,
    },
    {
      name: "Handler",
      selector: (row) => row.handler,
    },
    {
      name: (
        <FormControl className="customized-textfield" fullWidth>
          <TextField
            select
            value={defaultStatus && defaultStatus}
            onChange={(event) => {
              handleChangeStatus(event);
            }}
            sx={{ color: "#fff" }}
          >
            <MenuItem dense value="OPEN">
              OPEN
            </MenuItem>
            <MenuItem dense value="CLOSED">
              CLOSED
            </MenuItem>
          </TextField>
        </FormControl>
      ),
      selector: (row) => <span>{row.status}</span>,
      width: "120px",
      center: true,
    },
    {
      name: "Action",
      selector: (row) => <IssueHandlerModal row={row} refresh={refresh} />,
      width: "70px",
    },
  ];
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
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
      </Box>
      <div>
        <ApiPaginate
          apiEnd={ApiEndpoints.COMPLAINTS}
          columns={columns}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          ExpandedComponent={null}
        />
      </div>
    </Box>
  );
};

export default ComplaintsView;
