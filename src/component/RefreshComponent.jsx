import React from "react";
import { CircularProgress } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import Mount from "./Mount";

const RefreshComponent = ({
  className = "refresh-purple",
  refresh,
  onClick,
  color = "#fff",
  progressColor = "#fff",
  ...other
}) => {
  return (
    <>
      <Mount visible={refresh}>
        <CircularProgress size="1.2rem" sx={{ color: progressColor, ml: 1 }} />
      </Mount>
      <Mount visible={!refresh}>
        <CachedIcon
          className={className}
          onClick={onClick}
          sx={{ ml: 1, color: color }}
          {...other}
        />
      </Mount>
    </>
  );
};

export default RefreshComponent;
