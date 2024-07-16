import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import ApiPaginate from "../component/ApiPaginate";
import { CustomStyles } from "../component/CustomStyle";
import SendNewNoti from "../modals/SendNewNoti";
import ApiEndpoints from "../network/ApiEndPoints";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { datemonthYear } from "../utils/DateUtils";
import DeleteNotification from "../modals/DeleteNotification";
import { getPriorityBg, getPriorityColor } from "../theme/setThemeColor";
let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}
const AdminNotificationsView = () => {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      width: "70px",
    },
    {
      name: "Created At",
      selector: (row) => datemonthYear(row.created_at),
      width: "140px",
    },
    {
      name: "Notification Id",
      selector: (row) => row.notification_id,
      width: "140px",
    },
    {
      name: "user Id",
      selector: (row) => row.user_id,
      width: "120px",
    },
    {
      name: "Priority",
      selector: (row) => (
        <div
          style={{
            color: getPriorityColor(row.priority),
            backgroundColor: getPriorityBg(row.priority),
            padding: "0.2rem",
            borderRadius: "3px",
          }}
        >
          {row.priority}
        </div>
      ),

      width: "120px",
    },
    {
      name: "Message",
      selector: (row) => (
        <span
          className="break-words"
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {row.message}
        </span>
      ),
      width: "560px",
      // grow: 1,
      wrap: true,
    },
    // {
    //   name: "Is Read",
    //   selector: (row) => row.is_read,
    // },

    {
      name: "Actions",
      selector: (row) => (
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {row.is_read === 0 ? (
              <Tooltip title="Unread">
                <DoneIcon sx={{ color: "grey" }} />
              </Tooltip>
            ) : (
              <Tooltip title="Read">
                <DoneAllIcon color="success" />
              </Tooltip>
            )}
          </div>
          <div>
            <DeleteNotification row={row} refresh={refresh} />
          </div>
        </div>
      ),
      width: "70px",
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          mb: 1,
        }}
      >
        {/* <AddOperatorModal /> */}
        <SendNewNoti refresh={refresh} />
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
          apiEnd={ApiEndpoints.GET_NOTIFICATION}
          ExpandedComponent={false}
          expandVisible={false}
          setQuery={setQuery}
          columns={columns}
          tableStyle={CustomStyles}
          apiData={apiData}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
        />
      </div>
    </>
  );
};

export default AdminNotificationsView;
