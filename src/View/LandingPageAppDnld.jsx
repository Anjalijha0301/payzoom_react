import { Button, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import { getActiveColor } from "../theme/setThemeColor";
import DownloadIcon from "@mui/icons-material/Download";
import { styled } from "@mui/material/styles";
import { playstore } from "../iconsImports";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: getActiveColor(),
  },
  "& .MuiRating-iconHover": {
    color: getActiveColor(),
  },
});

const LandingPageAppDnld = () => {
  return (
    <div className="squarePatternBg my-1 ">
      <div className="sectionBreake">
        <Grid container sx={{ px: 5, pt: 6 }}>
          <Grid md={12} xs={12} className="bottom2top">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: getActiveColor(),
              }}
            >
              <Typography
                sx={{
                  fontSize: "130px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
                className="thick font"
              >
                4.0
                <StyledRating
                  className="mui-stars"
                  name="half-rating-read"
                  defaultValue={4.0}
                  precision={0.5}
                  readOnly
                  sx={{ fontSize: "2.4rem" }}
                />
              </Typography>
              <Typography
                sx={{
                  ml: 2,
                  mb: 5,
                }}
                className="less-thick less-thick-font"
              >
                <img src={playstore} alt="play-store" width="100px" />
                {/* play <div>store</div> */}
              </Typography>
            </div>

            <Button
              variant="contained"
              sx={{
                borderRadius: "40px",
                backgroundColor: getActiveColor(),
                padding: "20px 50px",
                textTransform: "none",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "600",
                mt: 6,
                "&:hover": {
                  color: "#fff",
                },
              }}
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.payzoom.cm",
                  "_blank"
                )
              }
            >
              <DownloadIcon sx={{ fontSize: "40px", mr: 1 }} /> Download the app
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LandingPageAppDnld;
