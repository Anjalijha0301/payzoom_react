import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { get, postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast } from "../utils/ToastUtil";
import DeleteBeneficiaryModal from "../modals/DeleteBeneficiaryModal";
import DmrAddRemitterModal from "../modals/DmrAddRemitterModal";
import AddBeneficiaryUpiModal from "../modals/AddBeneficiaryUpiModal";
import AccountVerificationUpi from "../modals/AccountVerificationUpi";
import RetUpiTransferModal from "../modals/RetUpiTransferModal";
import VerifiedIcon from "@mui/icons-material/Verified";
import Spinner from "../commons/Spinner";
import CustomCard from "../component/CustomCard";
import { noDataFoundGif } from "../iconsImports";
import { PATTERNS } from "../utils/ValidationUtil";
import { currencySetter } from "../utils/Currencyutil";
import { randomColors } from "../theme/setThemeColor";
import AuthContext from "../store/AuthContext";
import OutletRegistration from "../component/OutletRegistration";
import { banking } from "../_nav";
import HNavButton from "../component/HNavButton";
import { useNavigate } from "react-router-dom";

const UPITransferView = () => {
  const [infoFetchedMob, setInfoFetchedMob] = useState(false);
  const [request, setRequest] = useState(false);
  const [remitterStatus, setRemitterStatus] = useState();

  const [mobile, setMobile] = useState("");
  const [bene, setBene] = useState([]);
  const [addNewRem, setAddNewRem] = useState(false);
  const [verifyRem, setVerifyRem] = useState(false);
  const [isMobv, setIsMobv] = useState(true);

  //
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const navigate = useNavigate();
  const getRemitterStatus = (number) => {
    console.log("here in get stat");
    postJsonData(
      ApiEndpoints.GET_REMITTER_STATUS_UPI,
      {
        rem_number: number,
      },
      setRequest,
      (res) => {
        if (res && res.data && res.data) {
          if (res.data.message === "Verify Remitter") {
            setAddNewRem(true);
            setVerifyRem(true);
          } else {
            const data = res.data;
            setMobile(number);
            setRemitterStatus(data.remitter);
            setBene(data.data);
            setInfoFetchedMob(true);
          }
        } else {
          setRemitterStatus();
        }
      },
      (error) => {
        // console.log("err", error);
        const errorData = error.response;
        const err_status = errorData.status;
        const err_message = errorData.data.message;

        // console.log("err_message", err_message);
        if (
          err_status &&
          err_status === 404 &&
          err_message === "Remitter Not Found"
        ) {
          // console.log("here in add new rem 404");
          setVerifyRem(true);
          setAddNewRem(true);
        } else {
          apiErrorToast(error);
        }
      }
    );
  };
  const ekycCall = () => {
    get(
      ApiEndpoints.EKYC_INITIATE,
      `rem_mobile=${mobile && mobile}`,
      setRequest,
      (res) => {
        const data = res.data;
        window.open(data.url);
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  return (
    <>
      {user && !user.instId && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <OutletRegistration autoOpen />
        </Box>
      )}

      {user && user.instId && (
        <>
          {user?.layout && user?.layout === 2 && (
            <Box
              className="card-css"
              sx={{
                width: "100%",
                my: 2,
                p: 2,
                py: 1,
              }}
            >
              <Typography className="services-heading">
                Banking Services
              </Typography>
              <Grid container>
                {user?.st === 0 ||
                user.dmt4 === 0 ||
                user?.aeps === 0 ||
                user?.nepal_transfer === 0 ||
                user?.upi_transfer === 0
                  ? banking
                      .filter((item) => {
                        if (user?.st === 0 && item.title === "Super Transfer") {
                          return undefined;
                        }
                        if (
                          user?.dmt4 === 0 &&
                          item.title === "Express Transfer"
                        ) {
                          return undefined;
                        }
                        if (user?.aeps === 0 && item.title === "AEPS") {
                          return undefined;
                        }
                        if (
                          user?.nepal_transfer === 0 &&
                          item.title === "Nepal Transfer"
                        ) {
                          return undefined;
                        }
                        if (
                          user?.upi_transfer === 0 &&
                          item.title === "UPI Transfer"
                        ) {
                          return undefined;
                        } else {
                          return item;
                        }
                      })
                      .map((mitem, index) => {
                        return (
                          <Grid
                            item
                            md={2}
                            index={index}
                            onClick={() => navigate(mitem.to)}
                            className="horizontal-sidenav"
                          >
                            <HNavButton item={mitem} />
                          </Grid>
                        );
                      })
                  : banking.map((item, index) => {
                      return (
                        <Grid
                          item
                          md={2}
                          index={index}
                          onClick={() => navigate(item.to)}
                          className="horizontal-sidenav"
                        >
                          <HNavButton item={item} />
                        </Grid>
                      );
                    })}
              </Grid>
            </Box>
          )}
          <Box
            sx={{
              height: "max-content",
              px: 3,
            }}
            className="position-relative card-css"
          >
            <Spinner loading={request} circleBlue />
            {/* initial form */}
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                sx={{
                  mb: { md: 2, sm: 4, xs: 4 },
                  mr: { md: 0, sm: 1.3, xs: 1.3 },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    pt: 2,
                    pb: 3,
                  }}
                >
                  {/* heading */}
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    UPI Transfer
                  </Typography>

                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { mt: 2 },
                      objectFit: "contain",
                      overflowY: "scroll",
                    }}
                  >
                    <Grid container spacing={2} sx={{ pt: 1 }}>
                      <Grid item md={4} xs={12}>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            label="Mobile Number"
                            id="mobile"
                            name="mobile"
                            type="tel"
                            size="small"
                            value={mobile}
                            onChange={(e) => {
                              setInfoFetchedMob(false);
                              setBene("");
                              setRemitterStatus("");
                              setIsMobv(PATTERNS.MOBILE.test(e.target.value));
                              if (e.target.value === "") setIsMobv(true);
                              setMobile(e.target.value);
                              if (PATTERNS.MOBILE.test(e.target.value)) {
                                getRemitterStatus(e.target.value);
                              }
                            }}
                            error={!isMobv}
                            helperText={!isMobv ? "Enter valid Mobile" : ""}
                            onKeyDown={(e) => {
                              if (
                                (e.which >= 65 && e.which <= 90) ||
                                e.key === "+"
                              ) {
                                e.preventDefault();
                              }
                              if (e.target.value.length === 10) {
                                if (e.key.toLowerCase() !== "backspace") {
                                  e.preventDefault();
                                }

                                if (e.key.toLowerCase() === "backspace") {
                                }
                              }
                            }}
                            inputProps={{
                              form: {
                                autocomplete: "off",
                              },
                              maxLength: "10",
                            }}
                            disabled={request && request && true}
                          />
                        </FormControl>
                      </Grid>
                      {/* {infoFetchedMob && infoFetchedMob && ( */}
                      <Grid
                        item
                        md={4}
                        xs={12}
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            label="Name"
                            id="name"
                            size="small"
                            value={remitterStatus && remitterStatus.name}
                            focused={remitterStatus && remitterStatus.name}
                            disabled={request && request && true}
                            InputProps={
                              remitterStatus &&
                              remitterStatus.limitIncreaseOffer && {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Button variant="text" onClick={ekycCall}>
                                      E-KYC
                                    </Button>
                                  </InputAdornment>
                                ),
                              }
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            label="Limit Per Transaction"
                            id="limit"
                            size="small"
                            disabled={request && request && true}
                            value={
                              infoFetchedMob ? currencySetter(100000.0) : ""
                            }
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              {infoFetchedMob && infoFetchedMob && (
                <Grid
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{ mb: { md: 2, sm: 4, xs: 4 } }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      alignItems: { xs: "start", sm: "end" },
                      // mx: { md: 2, sm: 1, xs: 0 },
                      mr: { xs: 1.3, md: 2 },
                    }}
                  >
                    <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                      Beneficiary List ({bene.length})
                    </Typography>
                    <AddBeneficiaryUpiModal
                      rem_mobile={mobile}
                      apiEnd={ApiEndpoints.ADD_BENE_UPI}
                      getRemitterStatus={getRemitterStatus}
                    />
                  </Box>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      pr: { xs: 1.3, md: 2 },
                      pt: 2,
                      mb: { md: 2, sm: 4, xs: 4 },
                    }}
                  >
                    {bene.length <= 0 ? (
                      <Grid
                        item
                        xs={12}
                        className="d-flex align-items-start justify-content-center"
                      >
                        <img
                          src={noDataFoundGif}
                          alt="no_data"
                          width="40%"
                          // style={{ marginTop: "24px" }}
                        />
                      </Grid>
                    ) : (
                      bene.map((ben, index) => {
                        return (
                          <CustomCard
                            width="50%"
                            xs={12}
                            sm={6}
                            md={6}
                            lg={4}
                            icon={
                              <Box
                                sx={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                  display: "flex",
                                  borderRadius: "4px",
                                  height: "64px",
                                  background: randomColors(),
                                  width: "64px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "40px",
                                  }}
                                >
                                  {ben &&
                                    ben.bene_name &&
                                    ben.bene_name.charAt(0).toUpperCase()}
                                </Typography>
                              </Box>
                            }
                            title={ben.bene_acc}
                            description={
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <RetUpiTransferModal
                                  ben={ben}
                                  rem_number={mobile}
                                />
                              </div>
                            }
                            descriptionSup={
                              <DeleteBeneficiaryModal
                                bene={ben}
                                mob={mobile && mobile}
                                getRemitterStatus={getRemitterStatus}
                                apiEnd={ApiEndpoints.REMOVE_BENE_UPI}
                                view="expressTransfer"
                              />
                            }
                            iconSup={
                              <div
                                style={{
                                  textAlign: "end",
                                  position: "relative",
                                }}
                              >
                                {ben.last_success_date &&
                                ben.last_success_date !== "" ? (
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: "-74px",
                                      right: "-68px",
                                      color: "#00bf78",
                                    }}
                                  >
                                    <Tooltip title="Already Verified">
                                      <VerifiedIcon sx={{ fontSize: "17px" }} />
                                    </Tooltip>
                                  </Box>
                                ) : (
                                  <AccountVerificationUpi
                                    rem_number={mobile}
                                    ben={ben}
                                  />
                                )}
                              </div>
                            }
                          />
                        );
                      })
                    )}
                  </Grid>
                </Grid>
              )}
              {addNewRem && addNewRem && (
                <DmrAddRemitterModal
                  rem_mobile={mobile}
                  getRemitterStatus={getRemitterStatus}
                  apiEnd={ApiEndpoints.ADD_REM_UPI}
                  view="upiTransfer"
                  setAddNewRem={setAddNewRem}
                  verifyRem={verifyRem}
                  setVerifyRem={setVerifyRem}
                />
              )}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default UPITransferView;
