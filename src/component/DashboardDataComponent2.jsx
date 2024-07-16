import React from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { getUserColor } from "../theme/setThemeColor";

const DashboardDataComponent2 = ({ users }) => {
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "left",
        // backgroundColor: "blue",
        width: { md: "100%", sm: "80%", xs: "80%" },
        mb: { md: 0, sm: 2, xs: 2 },
      }}
    >
      <Avatar
        sx={{
          width: 48,
          height: 48,
          mr: 1.5,
          backgroundColor: getUserColor(users.role),
        }}
      >
        <GroupAddOutlinedIcon />
      </Avatar>
      <div style={{ textAlign: "left", maxWidth: "150px" }}>
        <span style={{ color: "grey" }}>
          {users.role === "Asm"
            ? "ASM"
            : users.role === "Ad"
            ? "Area Distributers"
            : users.role === "Ret"
            ? "Retailers"
            : users.role === "Dd"
            ? "Direct Dealers"
            : users.role === "Api"
            ? "API"
            : ""}
          {/* {users.role} */}
        </span>

        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            display: { xs: "none", sm: "none", md: "block", lg: "block" },
          }}
        >
          {users.userCount}
        </Typography>
        <div
          style={{
            fontSize: "12px",
            color: users.increased ? "#00BF78" : "#DC5F5F",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* {users.increased ? (
            <CallMadeIcon sx={{ ml: -0.7, fontSize: "18px" }} />
          ) : (
            <SouthWestIcon sx={{ ml: -0.7, fontSize: "18px" }} />
          )}
          <Typography
            sx={{ fontSize: { sm: "8px", xs: "8px", md: "12px", lg: "12px" } }}
          >
            54.3%
          </Typography>{" "}
          {users.increased ? (
            <Typography
              sx={{
                color: "#9f86c0",
                fontSize: { sm: "8px", xs: "8px", md: "12px", lg: "12px" },
              }}
            >
              &nbsp;Growth
            </Typography>
          ) : (
            <Typography
              sx={{
                color: "#9f86c0",
                fontSize: { sm: "8px", xs: "8px", md: "12px", lg: "12px" },
              }}
            >
              &nbsp;Less Growth
            </Typography>
          )} */}
        </div>
      </div>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          display: { xs: "block", sm: "block", md: "none", lg: "none" },
          ml: { lg: 0, md: 0, sm: 2, xs: 1 },
        }}
      >
        {users.userCount}
      </Typography>
    </Grid>
  );
};

export default DashboardDataComponent2;
