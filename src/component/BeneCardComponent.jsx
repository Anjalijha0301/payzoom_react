import React from "react";
import { Box, Button, Card, Grid, Tooltip, Typography } from "@mui/material";
import RetExpresTransferModal from "../modals/RetExpresTransferModal";
import ApiEndpoints from "../network/ApiEndPoints";
import DeleteBeneficiaryModal from "../modals/DeleteBeneficiaryModal";
import AccountVerificationModal from "../modals/AccountVerificationModal";
import { capitalize1 } from "../utils/TextUtil";
import { randomColors } from "../theme/setThemeColor";
import VerifiedIcon from "@mui/icons-material/Verified";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import { postJsonData } from "../network/ApiController";
// import { useState } from "react";
// import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
// import VerifyOtpLogin from "../modals/VerifyOtpLogin";
import PortBeneficiaries from "../modals/PortBeneficiaries";

const BeneCardComponent = ({
  ben,
  index,
  mobile,
  remitterStatus,
  getRemitterStatus,
  dmtValue,
  view,
}) => {
  // console.log("remitterStatus", remitterStatus);

  return (
    <Card
      className="card-css"
      key={index}
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        // p: 1,
        px: 2,
        py: 1.5,
        // pl: { md: 1, sm: 0, xs: 0 },
        m: { md: 2, sm: 1, xs: 1 },
        ml: { md: 2, sm: 0, xs: 0.5 },
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: { md: "flex", sm: "none", xs: "none" },
          // background: "#d3d3d3",
          // background: "rgb(75, 192, 192 , 0.090)",
          background: randomColors(
            ben && ben.name
              ? ben.name.charAt(0).toUpperCase()
              : ben.bene_name.charAt(0).toUpperCase()
          ),
          borderRadius: "4px",
          height: "64px",
          width: "64px",
          position: "relative",
          p: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
          }}
        >
          {ben && ben.name
            ? ben.name.charAt(0).toUpperCase()
            : ben.bene_name.charAt(0).toUpperCase()}
        </Typography>
        <Box>
          {/*  this bene card is only  used in money
          transferView
          verificationDt is used in dmt1 and status is used in dmt2  express/super me last success date*/}
          {(ben.verificationDt && ben.verificationDt !== null) ||
          ben.verified === "1" ||
          ben.status === 1 ? (
            <Box
              sx={{
                position: "absolute",
                top: "-9px",
                right: "-5px",
                color: "#00bf78",
              }}
            >
              <Tooltip title="Already Verified">
                <VerifiedIcon sx={{ fontSize: "17px" }} />
              </Tooltip>
            </Box>
          ) : (
            // <Button
            //   size="small"
            //   className="button-green"
            //   sx={{
            //     fontSize: "10px",
            //     padding: "0px 5px !important",
            //     textTransform: "uppercase",
            //     minWidth: "59px !important",
            //   }}
            //   color="success"
            // >
            //   Verified
            // </Button>

            <AccountVerificationModal
              ben={ben}
              rem_number={mobile}
              remitterStatus={remitterStatus}
              getRemitterStatus={getRemitterStatus}
              dmtValue={dmtValue}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          width: "100%",
          alignContent: "center",
        }}
      >
        <Box sx={{ ml: { xs: 1, md: 3 }, textAlign: "center" }}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "left",
              fontWeight: "500",
              textAlign: {
                md: "center",
                sm: "left",
                xs: "left",
              },
              fontSize: "18px",
            }}
          >
            {ben.name ? capitalize1(ben.name) : capitalize1(ben.bene_name)}
            {/* {ben.verificationDt && ben.verificationDt !== null ? (
              <Tooltip title="Verified">
                <CheckCircleOutlinedIcon
                  color="success"
                  sx={{ ml: "4px", fontSize: "12px" }}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Unverified">
                <ErrorIcon color="error" sx={{ ml: "4px", fontSize: "12px" }} />
              </Tooltip>
            )} */}
          </Typography>

          <Grid
            sx={{
              display: { xs: "flex", md: "grid" },
              justifyContent: "space-between",
              // p: 1,
              // my: 1,
            }}
          >
            <Typography sx={{ textAlign: "left", fontSize: "13px" }}>
              A/C : {ben.account ? ben.account : ben.bene_acc}
            </Typography>
            <Typography sx={{ textAlign: "left", fontSize: "13px" }}>
              IFSC : {ben.ifsc}
            </Typography>
          </Grid>
        </Box>
        <Grid
          sx={{
            display: "grid",
            alignItems: "center",
            // ml: { md: 0, sm: 1, xs: 1 },
            mt: { md: 0, sm: 1, xs: 1 },
          }}
        >
          <div style={{ display: "flex" }}>
            <RetExpresTransferModal
              dmtValue={dmtValue}
              type="NEFT"
              ben={ben}
              rem_number={mobile && mobile}
              rem_details={remitterStatus}
              apiEnd={
                dmtValue === "dmt1"
                  ? ApiEndpoints.DMR_MONEY_TRANSFER
                  : ApiEndpoints.DMT2_MT
              }
              view="Money Transfer"
              limit_per_txn={
                remitterStatus.limitPerTransaction
                  ? remitterStatus.limitPerTransaction
                  : 5000
              }
              remDailyLimit={remitterStatus?.limitDetails?.availableDailyLimit}
            />
            <RetExpresTransferModal
              type="IMPS"
              ben={ben}
              rem_number={mobile && mobile}
              rem_details={remitterStatus}
              apiEnd={
                dmtValue === "dmt1"
                  ? ApiEndpoints.DMR_MONEY_TRANSFER
                  : ApiEndpoints.DMT2_MT
              }
              view="Money Transfer"
              limit_per_txn={
                remitterStatus.limitPerTransaction
                  ? remitterStatus.limitPerTransaction
                  : 5000
              }
            />
          </div>
          <div
            style={{
              textAlign: "end",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "6px",
            }}
          >
            <Box sx={{ display: { md: "none", sm: "block", xs: "block" } }}>
              {ben.verificationDt && ben.verificationDt !== null ? (
                <Button
                  size="small"
                  // className="button-green"
                  sx={{
                    fontSize: "10px",
                    padding: "0px 5px !important",
                    textTransform: "uppercase",
                    minWidth: "59px !important",
                    color: "#00bf78",
                    fontWeight: "bold",
                  }}
                >
                  Already Verified
                </Button>
              ) : (
                <AccountVerificationModal
                  ben={ben}
                  rem_number={mobile}
                  remitterStatus={remitterStatus}
                  getRemitterStatus={getRemitterStatus}
                />
              )}
            </Box>

            <DeleteBeneficiaryModal
              dmtValue={dmtValue}
              bene={ben}
              mob={mobile && mobile}
              getRemitterStatus={getRemitterStatus}
              apiEnd={
                dmtValue === "dmt1"
                  ? ApiEndpoints.REMOVE_BENE
                  : ApiEndpoints.DMT2_REM_BENE
              }
              view="moneyTransfer"
            />

            <PortBeneficiaries
              ben={ben}
              dmtValue={dmtValue}
              remitterStatus={remitterStatus}
              getRemitterStatus={getRemitterStatus}
              view={view}
            />
            {/* <Button
              className="button-purple-outline"
              startIcon={<ExitToAppIcon sx={{ fontSize: "1px" }} />}
              sx={{
                fontSize: "11px",
                py: 0,
                ml: 1,
                px: 1.5,
                textTransform: "none",
                mr: { md: 5, sm: 0 },
              }}
              onClick={portBene}
            >
              Port
            </Button> */}
          </div>
        </Grid>
      </Box>
    </Card>
  );
};

export default BeneCardComponent;
