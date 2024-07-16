import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
// import ApiPaginate from "../component/ApiPaginate";
import ApiEndpoints from "../network/ApiEndPoints";
import CachedIcon from "@mui/icons-material/Cached";
import { useState } from "react";
import { massegetable } from "../component/CustomStyle";
import { datemonthYear } from "../utils/DateUtils";
import ApiPaginateSearch from "../component/ApiPaginateSearch";

let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}
const AdminInMassegeView = () => {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      width: "70px",
    },
    {
      name: "Date",
      selector: (row) => datemonthYear(row.created_at),
      width: "100px",
    },
    {
      name: "From",
      selector: (row) => row.sender,
      width: "100px",
    },
    {
      name: "Massege",
      selector: (row) => (
        <div
          style={{
            whiteSpace: "break-spaces",
            overflow: "hidden",
            textOverflow: "clip",
            textAlign: "left",
          }}
        >
          {row.msg}
        </div>
      ),
    },
  ];

  const searchOptions = [{ field: "Sender", parameter: "sender" }];

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
        <ApiPaginateSearch
          apiEnd={ApiEndpoints.GET_MASSEGE}
          searchOptions={searchOptions}
          setQuery={setQuery}
          query={query}
          columns={columns}
          apiData={apiData}
          tableStyle={massegetable}
          setApiData={setApiData}
          ExpandedComponent=""
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
        />
        {/* <ApiPaginate
          apiEnd={ApiEndpoints.GET_MASSEGE}
          columns={columns}
          apiData={apiData}
          tableStyle={massegetable}
          setApiData={setApiData}
          ExpandedComponent=""
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
        /> */}
      </div>
    </Box>
  );
};

export default AdminInMassegeView;
