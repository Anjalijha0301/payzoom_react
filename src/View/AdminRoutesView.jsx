import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import ApiPaginate from "../component/ApiPaginate";
import ApiEndpoints from "../network/ApiEndPoints";
import CachedIcon from "@mui/icons-material/Cached";
import { useState } from "react";
import { CustomStyles } from "../component/CustomStyle";
import { datemonthYear } from "../utils/DateUtils";

let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}
const AdminRoutesView = () => {
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
      name: "Status",
      selector: (row) =>
        row.status === 1 ? (
          <div
            style={{
              color: "#fff",
              backgroundColor: "#00BF78",
              fontWeight: "bold",
              borderRadius: "4px",
              minWidth: "70px",
              textTransform: "uppercase",
            }}
          >
            Online
          </div>
        ) : (
          <div
            style={{
              color: "#fff",
              backgroundColor: "#dc5f5f",
              fontWeight: "bold",
              borderRadius: "4px",
              minWidth: "70px",
              textTransform: "uppercase",
            }}
          >
            Offline
          </div>
        ),
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
          apiEnd={ApiEndpoints.GET_ROUTE}
          columns={columns}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          ExpandedComponent=""
          paginateServer={false}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          paginate={false}
        />
      </div>
    </Box>
  );
};

export default AdminRoutesView;
