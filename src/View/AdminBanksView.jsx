import { Box, Button, IconButton, Tooltip } from "@mui/material";
import React from "react";
import ApiPaginate from "../component/ApiPaginate";
import ApiEndpoints from "../network/ApiEndPoints";
import CachedIcon from "@mui/icons-material/Cached";
import { useState } from "react";
import { CustomStyles } from "../component/CustomStyle";
import { useNavigate } from "react-router-dom";
import { currencySetter } from "../utils/Currencyutil";
import { primaryColor, getHoverInActive } from "../theme/setThemeColor";
import MyButton from "../component/MyButton";
// import AdminBanksDetailsModal from "../modals/admin/AdminBanksDetailsModal";

let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}
const AdminBanksView = () => {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const navigate = useNavigate();
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
      name: "Account",
      selector: (row) => row.accNo,
    },
    {
      name: "Balance",
      selector: (row) => currencySetter(row.balance),
    },
    {
      name: "Status",
      selector: (row) => (
        <Box sx={{ display: "flex" }}>
          {row.status === 1 ? (
            <Button
              size="small"
              sx={{
                backgroundColor: primaryColor(),
                color: "#ffffff",
                p: 0,
                "&:hover": {
                  backgroundColor: primaryColor(),
                  color: "#ffffff",
                },
              }}
            >
              Active
            </Button>
          ) : (
            <Button
              size="small"
              sx={{
                backgroundColor: getHoverInActive(),
                color: "#ffffff",
                px: 1,
                py: 0,
                "&:hover": {
                  backgroundColor: getHoverInActive(),
                  color: "#ffffff",
                },
              }}
            >
              InActive
            </Button>
          )}
          {/* <AdminBanksDetailsModal row={row} /> */}
        </Box>
      ),
    },
    {
      name: "Statement",
      selector: (row) => (
        <Tooltip title="statement">
          <MyButton
            text="Statement"
            onClick={() => {
              navigate("/admin/bankStatement", {
                state: {
                  bank_id: row.id,
                  bank_name: row.name,
                  balance: row.balance,
                },
              });
            }}
          />
        </Tooltip>
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
          apiEnd={ApiEndpoints.GET_BANKS}
          columns={columns}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          ExpandedComponent=""
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          paginateServer={false}
          paginate={false}
        />
      </div>
    </Box>
  );
};

export default AdminBanksView;
