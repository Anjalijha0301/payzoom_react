import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { postJsonData } from "../../../network/ApiController";
import ApiEndpoints from "../../../network/ApiEndPoints";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import Mount from "../../Mount";
import { CustomStyles } from "../../CustomStyle";
import { useContext } from "react";
import AuthContext from "../../../store/AuthContext";
import { USER_ROLES } from "../../../utils/constants";
import RefreshComponent from "../../RefreshComponent";
import Spinner from "../../../commons/Spinner";
import NoDataView from "../../NoDataView";

const MyEarnings = ({
  isTitle = true,
  fixedHeaderScrollHeight = "",
  isGridStyle = true,
}) => {
  const authCtx = useContext(AuthContext);
  const [type, setType] = useState("TODAY");
  const [earnings, setEarnings] = useState([]);
  const [request, setRequest] = useState(false);
  const user = authCtx.user;
  const role = user.role;

  const getEarning = useCallback(() => {
    postJsonData(
      ApiEndpoints.MY_EARNINGS,
      { type: type },
      setRequest,
      (res) => {
        if (Array.isArray(res.data.data)) setEarnings(res.data.data);
        else setEarnings([]);
      },
      (err) => {
        setEarnings([]);
      }
    );
  }, [type]);

  useEffect(() => {
    getEarning();

    return () => {};
  }, [getEarning]);

  const columns = [
    {
      name: "Service",
      cell: (row) => row.SERVICE,
    },
    {
      name: "Commision",
      cell: (row) => row.COMMISSION,
    },
    {
      name: "TDS",
      cell: (row) => row.TDS,
      omit: role === USER_ROLES.ADMIN,
    },
  ];

  // const tableData = useMemo(() => {
  //   if (earnings && earnings.length > 0) {
  //     return {
  //       columns: [
  //         {
  //           name: "Commision",
  //           cell: (row) => row.COMMISSION,
  //         },
  //         {
  //           name: "Service",
  //           cell: (row) => row.SERVICE,
  //         },
  //         {
  //           name: "TDS",
  //           cell: (row) => row.TDS,
  //           omit: role === USER_ROLES.ADMIN,
  //         },
  //       ],
  //     };
  //   }
  // }, [earnings, role]);
  const handleChange = (event, newType) => {
    setType(newType);
  };

  const gridItemStyle = {
    height: "auto",
    padding: "1.3rem",
    background: "#fff",
    borderRadius: "8px",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    ml: { md: 0, xs: 0 },
    mr: { md: 1.9, xs: 0 },
  };

  return (
    <Grid
      container
      sx={{
        mt: 1.2,
        pr: { xs: 1.3, lg: 0 },
        mb: { xs: 8, lg: 0 },
      }}
    >
      <Grid item xs={12} sx={isGridStyle ? gridItemStyle : ""}>
        {isTitle && (
          <Typography
            style={{
              fontWeight: "500",
              fontSize: "18px",
              display: "flex",
              alignContent: "center",
            }}
          >
            My Earnings
            <RefreshComponent onClick={getEarning} color="#000" />
          </Typography>
        )}
        <Grid
          item
          xs={12}
          sx={{
            mt: 2,
            mb: 2,
            textAlign: "left",
          }}
        >
          <ToggleButtonGroup
            color="secondary"
            defaultValue={type}
            value={type}
            exclusive
            onChange={handleChange}
            aria-label="value-type"
          >
            <ToggleButton size="small" value="TODAY">
              Today
            </ToggleButton>
            <ToggleButton size="small" value="THIS">
              This
            </ToggleButton>
            <ToggleButton size="small" value="LAST">
              Last
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Mount visible={earnings && earnings?.length > 0}>
          <Grid
            item
            xs={12}
            sx={{
              position: "relative",
            }}
          >
            <Spinner loading={request} circleBlue />

            <DataTable
              columns={columns}
              data={earnings}
              customStyles={CustomStyles}
              pagination
              paginationServer={false}
              progressPending={request}
              fixedHeader
              fixedHeaderScrollHeight={fixedHeaderScrollHeight}
            />
          </Grid>
        </Mount>
        <Mount visible={earnings && earnings?.length === 0}>
          <NoDataView />
        </Mount>
      </Grid>
    </Grid>
  );
};

export default MyEarnings;
