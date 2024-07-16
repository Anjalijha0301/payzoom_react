import React from "react";
import { Typography } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { primaryColor } from "../theme/setThemeColor";

const ModalHeader = ({ title = "Heading", handleClose }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "550",
            display: "flex",
            alignItems: "center",
            color: primaryColor(),
            width: "90%",
            justifyContent: "center",
            paddingLeft: "10%",
            // marginTop: "24px",
            // marginBottom: "16px",
          }}
        >
          {title}
        </Typography>
        <span style={{ width: "10%", textAlign: "right" }}>
          <HighlightOffRoundedIcon
            className="hover-red"
            onClick={handleClose}
          />
        </span>
      </div>
    </>
  );
};

export default ModalHeader;
