import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
// import ApiPaginate from "../component/ApiPaginate";
import ApiEndpoints from "../network/ApiEndPoints";
import CachedIcon from "@mui/icons-material/Cached";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useState } from "react";
import { CustomStyles } from "../component/CustomStyle";
import BlockUnBlockPlans from "../modals/BlockUnBlockPlans";
import AddPlanModal from "../modals/AddPlanModal";
import DeletePlan from "../modals/DeletePlan";
import EditPlanModal from "../modals/EditPlanmodal";
import { currencySetter } from "../utils/Currencyutil";
import ApiPaginate from "../component/ApiPaginate";

let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}

const AdminPlanView = () => {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();

  const handleChangeOperator = (event) => {
    if (event.target.value !== "Operators") {
      setQuery(`operator=${event.target.value}`);
    }
  };
  const columns = [
    {
      name: (
        <FormControl
          className="customized-textfield custom-textfield"
          fullWidth
          sx={{ textAlign: "left" }}
        >
          <TextField
            select
            defaultValue="Operators"
            onChange={handleChangeOperator}
            sx={{ color: "#fff" }}
          >
            <MenuItem dense value="Operators">
              Operators
            </MenuItem>
            <MenuItem dense value="AIR">
              AIR
            </MenuItem>
            <MenuItem dense value="VOD">
              VOD
            </MenuItem>
            <MenuItem dense value="JIO">
              JIO
            </MenuItem>
            <MenuItem dense value="IDE">
              IDE
            </MenuItem>
          </TextField>
        </FormControl>
      ),
      selector: (row) => (
        <div style={{ marginLeft: "1rem" }}>
          <span>{row.operator}</span>
        </div>
      ),
      width: "150px",
    },
    {
      name: "Plan",
      selector: (row) => currencySetter(row.plan),
    },
    {
      name: "Validity",
      selector: (row) => row.validity,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Status",
      selector: (row) => <BlockUnBlockPlans row={row} />,
      width: "150px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div style={{ display: "flex" }}>
          <EditPlanModal row={row} refresh={refresh} />
          <DeletePlan row={row} refresh={refresh} />
        </div>
      ),
      width: "150px",
    },
  ];

  const searchOptions = [
    { field: "Plan", parameter: "plan" },
    { field: "Validity", parameter: "validity" },
  ];

  return (
    <Box>
      {/* <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Tooltip title="export">
          <IconButton aria-label="export" color="secondary">
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
        <AddPlanModal refresh={refresh} />
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
      </Box> */}
      <div>
        <Grid
          item
          md={4}
          sm={6}
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <AddPlanModal refresh={refresh} />
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
        </Grid>

        <ApiPaginate
          apiEnd={ApiEndpoints.GET_PLANS}
          columns={columns}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          setQuery={setQuery}
          ExpandedComponent={null}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
        />

        {/* <ApiPaginate
          apiEnd={ApiEndpoints.GET_PLANS}
          columns={columns}
          apiData={apiData}
          tableStyle={CustomStyles}
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

export default AdminPlanView;
