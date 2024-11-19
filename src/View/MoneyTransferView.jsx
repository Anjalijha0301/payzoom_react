import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { get, postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast } from "../utils/ToastUtil";
import DmrNumberListModal from "../modals/DmrNumberListModal";
import DmrAddBeneficiaryModal from "../modals/DmrAddBeneficiaryModal";
import DmrAddRemitterModal from "../modals/DmrAddRemitterModal";
import DmrVrifyNewUser from "../modals/DmrVrifyNewUser";
import BeneCardComponent from "../component/BeneCardComponent";
import Spinner from "../commons/Spinner";
import NameChangeModal from "../modals/NameChangeModal";
import { PATTERNS } from "../utils/ValidationUtil";
import BeneSearchBar from "../component/BeneSearchBar";
import { useEffect } from "react";
import { currencySetter } from "../utils/Currencyutil";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import OutletRegistration from "../component/OutletRegistration";
import { banking } from "../_nav";
import HNavButton from "../component/HNavButton";
import { useNavigate } from "react-router-dom";
import { RssFeed } from "@mui/icons-material";
import RemitterKyc from "../modals/RemitterKyc";
import Mount from "../component/Mount";
import DmtAddRemModal from "../modals/DmtAddRemModal";

const MoneyTransferView = () => {
  const [infoFetchedMob, setInfoFetchedMob] = useState(false);
  const [request, setRequest] = useState(false);
  const [remitterStatus, setRemitterStatus] = useState();
  const [remRefKey, setRemRefKey] = useState({});
  const [search, setSearch] = useState("");
  const [mobile, setMobile] = useState("");
  const [bene, setBene] = useState([]);
  const [openRemKyc, setOpenRemKyc] = useState(false);

  const [filteredBenelist, setFilteredBenelist] = useState([]);
  const [otpRefId, setOtpRefId] = useState("");
  const [verifyotp, setVerifyotp] = useState(false);
  const [addNewRem, setAddNewRem] = useState(false);
  const [isValAccNum, setisValAccNum] = useState(true);
  const [isMobv, setIsMobv] = useState(true);
  const [dmr2RemRes, setDmr2RemRes] = useState();
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const userLat = authCtx.location.lat;
  const userLong = authCtx.location.long;

  const navigate = useNavigate();

  const handleCloseKycModal = () => {
    setOpenRemKyc(false); // Close the modal when this function is called
  };

  useEffect(() => {
    if (search) {
      const myList = bene?.filter((item) => {
        // console.log("item", item);
        return item.name
          ? item.name.toUpperCase().includes(search.toUpperCase())
          : item.bene_name.toUpperCase().includes(search.toUpperCase());
      });
      setFilteredBenelist(myList);
    } else {
      setFilteredBenelist(bene);
    }

    return () => {};
  }, [search, bene]);

  const getRemitterStatus = (number) => {
    console.log("calling api");

    postJsonData(
      dmtValue === "dmt1"
        ? ApiEndpoints.GET_REMMITTER_STATUS
        : ApiEndpoints.DMT2_REM_STAT,
      {
        number: number,
        type: "M",
        latitude: userLat,
        longitude: userLong,
      },
      setRequest,
      (res) => {
        console.log("res in dmt 2 =====", res);
        if (res && res.status === 200 && res.data.message === "OTP Sent") {
          setOtpRefId(res.data.otpReference);
          setVerifyotp(true);
        } else if (res && res.data && res.data.remitter) {
          const data = dmtValue === "dmt1" ? res.data.remitter : res.data;
          setMobile(number);
          setRemitterStatus(dmtValue === "dmt1" ? data : data.remitter);
          setBene(dmtValue === "dmt1" ? data.beneficiaries : data.data);
          setInfoFetchedMob(true);
          setNumberList("");
        } else {
          console.log("im here3");
          setRemitterStatus();
        }
      },
      (error) => {
        if (error && error) {
          if (
            error.response.status === 404 &&
            error.response.data.message === "Please do remitter e-kyc."
          ) {
            if (dmtValue == "dmt2") {
              console.log("errorin", error);
              setOpenRemKyc(true);
              // setOtpRefId(error?.response?.data?.otpReference);
            }
          }
          if (
            error.response.status === 404 &&
            error.response.data.message === "Remitter Not Found"
          ) {
            if (dmtValue === "dmt1") {
              setRemRefKey(error.response.data.data);
            }
            setAddNewRem(true);
          }
          if (error?.response?.data?.step == 3) {
            console.log("im here");
            setVerifyotp(true);
            setDmr2RemRes(error?.response?.data?.data);
          }
        }
      }
    );
  };
  const refreshRemitterStatus = (number) => {
    postJsonData(
      ApiEndpoints.REF_REMMITTER_STATUS,
      {
        number: number,
        type: "M",
      },
      setRequest,
      (res) => {
        if (res && res.status === 200 && res.data.message === "OTP Sent") {
          setOtpRefId(res.data.otpReference);
          setVerifyotp(true);
        } else if (res && res.data && res.data.remitter) {
          const data = res.data.remitter;
          setMobile(number);
          setRemitterStatus(data);
          setBene(data.beneficiaries);
          setInfoFetchedMob(true);
          setNumberList("");
        } else {
          setRemitterStatus();
        }
      },
      (error) => {
        if (error && error) {
          if (
            error.response.status === 404 &&
            error.response.data.message === "Remitter Not Found"
          ) {
            setAddNewRem(true);
          } else {
            // apiErrorToast(error);
          }
        }
      }
    );
  };

  const [numberList, setNumberList] = useState([]);

  const [dmtValue, setDmtValue] = useState(
    user.dmt1 === 1 && user.dmt2 === 1
      ? "dmt2"
      : user.dmt1 === 1
      ? "dmt1"
      : "dmt2"
  );

  const getRemitterStatusByAcc = (event) => {
    event.preventDefault();
    const number = document.getElementById("acc").value;
    postJsonData(
      ApiEndpoints.GET_REMMITTER_STATUS_ACC,
      {
        number: number,
      },
      setRequest,
      (res) => {
        if (res && res.data) {
          const data = res.data.data;
          if (data.length > 0) {
            setNumberList(data);
            document.getElementById("acc").value = "";
            document.getElementById("acc").focus = "off";
          } else {
            apiErrorToast("No Beneficiary Found! Kindly Change Account Number");
          }
        } else {
          setRemitterStatus();
        }
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  // eslint-disable-next-line no-unused-vars
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

  console.log("dmtValue", dmtValue);

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
                            key={index}
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
                          key={index}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "90vh",
              alignItems: infoFetchedMob
                ? "flex-start"
                : user?.layout && user?.layout === 2
                ? "start"
                : "center",
            }}
            className="position-relative"
          >
            <Spinner circleBlue loading={request} />
            {/* initial form */}
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                lg={6}
                sm={12}
                xs={12}
                sx={{
                  mb: { md: 2, sm: 4, xs: 4 },
                  mr: { md: 0, sm: 1.3, xs: 1.3 },
                }}
              >
                <Card
                  className="card-css"
                  sx={{
                    width: "100%",
                    px: 7,
                    py: 3,
                  }}
                >
                  {/* heading */}
                  {user.dmt1 === 1 && user.dmt2 === 1 && (
                    <div sx={{ display: "flex" }} hidden={remitterStatus}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          letterSpacing: "0.05rem",
                          textAlign: "left",
                          mt: 1,
                        }}
                      >
                        Choose Between DMT 1 OR DMT 2
                      </Typography>
                      <RadioGroup
                        row
                        value={dmtValue}
                        onChange={(e) => setDmtValue(e.target.value)}
                      >
                        <FormControlLabel
                          value="dmt1"
                          control={<Radio />}
                          label="DMT 1"
                          disabled={remitterStatus}
                        />
                        <FormControlLabel
                          value="dmt2"
                          control={<Radio />}
                          label="DMT 2"
                          disabled={remitterStatus}
                        />
                      </RadioGroup>
                    </div>
                  )}
                  <div>
                    <Typography
                      sx={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        letterSpacing: "0.05rem",
                        textAlign: "left",
                        mt: 1,
                      }}
                    >
                      {dmtValue === "dmt1"
                        ? "Domestic Money Transfer 1"
                        : "Domestic Money Transfer 2"}
                    </Typography>
                    <Grid
                      container
                      sx={{
                        pt: 1,
                        "& .MuiTextField-root": { mt: 2 },
                        objectFit: "contain",
                        overflowY: "scroll",
                      }}
                    >
                      <Grid container sx={{ pt: 1 }}>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            size="small"
                            label="Mobile Number"
                            id="mobile"
                            name="mobile"
                            type="tel"
                            value={mobile}
                            required
                            onChange={(e) => {
                              setIsMobv(PATTERNS.MOBILE.test(e.target.value));
                              if (e.target.value === "") setIsMobv(true);
                              setMobile(e.target.value);
                              if (e.target.value === "") {
                                setRemitterStatus("");
                                setInfoFetchedMob(false);
                                bene && setBene([]);
                              }
                              if (e.target.value.length === 9) {
                                setRemitterStatus("");
                                setInfoFetchedMob(false);
                                bene && setBene([]);
                              }
                              if (PATTERNS.MOBILE.test(e.target.value)) {
                                getRemitterStatus(e.target.value);
                              }
                            }}
                            error={!isMobv}
                            helperText={!isMobv ? "Enter valid Mobile" : ""}
                            // onKeyDown={(e) => {
                            //   if (
                            //     (e.which >= 65 &&
                            //       e.which <= 90 &&
                            //       e.which !== 86) ||
                            //     e.key === "+"
                            //   ) {
                            //     e.preventDefault();
                            //   }

                            // if (e.target.value.length === 10) {
                            //   if (e.key.toLowerCase() !== "backspace") {
                            //     e.preventDefault();
                            //   }

                            //   if (e.key.toLowerCase() === "backspace") {
                            //   }
                            // }
                            // }}
                            // InputProps={
                            //   remitterStatus &&
                            //   remitterStatus.limitIncreaseOffer && {
                            //     endAdornment: (
                            //       <InputAdornment position="end">
                            //         <Button variant="text" onClick={ekycCall}>
                            //           E-KYC
                            //         </Button>
                            //       </InputAdornment>
                            //     ),
                            //   }
                            // }
                            inputProps={{
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            disabled={request && request && true}
                          />
                        </FormControl>
                      </Grid>

                      {infoFetchedMob && infoFetchedMob && (
                        <div style={{ width: "100%" }}>
                          <Grid item md={12} xs={12}>
                            <Mount visible={remitterStatus.firstName}>
                              <NameChangeModal
                                remitterStatus={remitterStatus}
                                rem_mobile={mobile}
                                getRemitterStatus={getRemitterStatus}
                              />
                            </Mount>
                          </Grid>
                          <Grid item md={12} xs={12}>
                            {/* <FormControl> */}
                            <table className="mt-wide-table">
                              <tr>
                                <td>Limit Available</td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {remitterStatus &&
                                    (dmtValue === "dmt1"
                                      ? currencySetter(
                                          remitterStatus.limitAvailable
                                        )
                                      : dmtValue === "dmt2"
                                      ? currencySetter(remitterStatus.limit)
                                      : remitterStatus.bank1_limit !== 0
                                      ? currencySetter(
                                          remitterStatus.bank1_limit
                                        )
                                      : remitterStatus.bank2_limit !== 0
                                      ? currencySetter(
                                          remitterStatus.bank2_limit
                                        )
                                      : remitterStatus.bank3_limit !== 0
                                      ? currencySetter(
                                          remitterStatus.bank3_limit
                                        )
                                      : 0)}
                                </td>
                              </tr>
                            </table>
                            {/* <TextField
                        label="Limit Available"
                        id="limit"
                        size="small"
                        disabled={request && request && true}
                        value={remitterStatus && remitterStatus.limitAvailable}
                      /> */}
                            {/* </FormControl> */}
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <table className="mt-wide-table">
                              <tr>
                                <td style={{ width: "51.5%" }}>
                                  Limit Per Transaction
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {remitterStatus &&
                                    (dmtValue === "dmt1"
                                      ? currencySetter(
                                          remitterStatus.limitPerTransaction
                                        )
                                      : currencySetter(5000))}
                                </td>
                              </tr>
                            </table>
                          </Grid>
                        </div>
                      )}

                      <div style={{ width: "100%" }}>
                        <Grid
                          item
                          md={12}
                          xs={12}
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            textAlign="center"
                            sx={{
                              width: "100%",
                              mt: 1,
                            }}
                          >
                            OR
                          </Typography>
                        </Grid>

                        <Box
                          component="form"
                          id="seachRemByAcc"
                          onSubmit={getRemitterStatusByAcc}
                          validate
                          sx={{ width: "100%" }}
                        >
                          <Grid item md={12} xs={12}>
                            <FormControl sx={{ width: "100%", mt: -1 }}>
                              <TextField
                                label="Account Number"
                                id="acc"
                                required
                                size="small"
                                error={!isValAccNum}
                                helperText={
                                  !isValAccNum ? "Invalid Account Number" : ""
                                }
                                onChange={(e) => {
                                  setisValAccNum(
                                    PATTERNS.ACCOUNT_NUMBER.test(e.target.value)
                                  );
                                  if (e.target.value === "")
                                    setisValAccNum(true);
                                }}
                                disabled={request && request ? true : false}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <Button
                              form="seachRemByAcc"
                              className="btn-background"
                              type="submit"
                              sx={{
                                width: "100%",
                                my: 3,
                              }}
                              endIcon={<ArrowForwardIosIcon />}
                              disabled={request && request ? true : false}
                            >
                              Proceed
                            </Button>
                          </Grid>
                        </Box>
                      </div>
                    </Grid>
                  </div>
                </Card>
                {/* {numberList && numberList.length > 0 && ( */}
                <DmrNumberListModal
                  numberList={numberList}
                  setMobile={(mob) => {
                    setMobile(mob);
                    getRemitterStatus(mob);
                  }}
                />
                {/* )} */}
              </Grid>
              {infoFetchedMob && infoFetchedMob && (
                <Grid
                  lg={6}
                  sm={12}
                  xs={12}
                  sx={{ mb: { md: 2, sm: 4, xs: 12 } }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "end",
                      mx: { md: 2, sm: 1, xs: 0 },
                      mr: { xs: 1.3, md: 2 },
                    }}
                  >
                    <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                      Beneficiary List ({bene?.length})
                    </Typography>
                    <DmrAddBeneficiaryModal
                      dmtValue={dmtValue}
                      rem_mobile={mobile}
                      getRemitterStatus={
                        dmtValue === "dmt1"
                          ? refreshRemitterStatus
                          : getRemitterStatus
                      }
                      apiEnd={
                        dmtValue === "dmt1"
                          ? ApiEndpoints.ADD_BENE
                          : ApiEndpoints.DMT2_ADD_BENE
                      }
                      view="MT_View"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "end",
                      mx: { md: 2, sm: 1, xs: 0 },
                      mr: { xs: 1.3, md: 2 },
                    }}
                  >
                    <BeneSearchBar setSearch={setSearch} />
                  </Box>
                  <div
                    className="
             enable-scroll
            "
                    style={{
                      overflowY: "scroll",
                      scrollBehavior: "smooth",
                      height: "85vh",
                      paddingBottom: "8px",
                    }}
                  >
                    {bene?.length <= 0 ? (
                      <Typography sx={{ mt: 2 }}>
                        No Beneficiary found.
                      </Typography>
                    ) : filteredBenelist?.length <= 0 ? (
                      <Typography sx={{ mt: 2 }}>
                        No Beneficiary found.
                      </Typography>
                    ) : (
                      filteredBenelist?.map((ben, index) => {
                        return (
                          <BeneCardComponent
                            dmtValue={dmtValue}
                            ben={ben}
                            index={index}
                            mobile={mobile}
                            remitterStatus={remitterStatus}
                            getRemitterStatus={getRemitterStatus}
                            view="MT_View"
                          />
                        );
                      })
                    )}
                  </div>
                </Grid>
              )}
            </Grid>
            {addNewRem && addNewRem && (
              <DmtAddRemModal
                rem_mobile={mobile}
                getRemitterStatus={getRemitterStatus}
                apiEnd={
                  dmtValue === "dmt1"
                    ? ApiEndpoints.ADD_REM
                    : ApiEndpoints.DMT2_ADD_REM
                }
                view="moneyTransfer"
                dmtValue={dmtValue}
                setAddNewRem={setAddNewRem}
                otpRef={otpRefId}
                setOtpRef={setOtpRefId}
                remRefKey={remRefKey}
                setRemRefKey={setRemRefKey}
              />
            )}
            {verifyotp && verifyotp && (
              <DmrVrifyNewUser
                rem_mobile={mobile}
                getRemitterStatus={getRemitterStatus}
                view="moneyTransfer"
                verifyotp={verifyotp}
                setVerifyotp={setVerifyotp}
                apiEnd={
                  dmtValue == "dmt2"
                    ? ApiEndpoints.DMT2_REGISTER_REM
                    : ApiEndpoints.VALIDATE_OTP
                }
                otpRefId={otpRefId}
                setOtpRefId={setOtpRefId}
                dmtValue={dmtValue}
                dmr2RemRes={dmr2RemRes}
              />
            )}

            {openRemKyc && dmtValue == "dmt2" && (
              <RemitterKyc
                open={openRemKyc}
                onClose={handleCloseKycModal}
                remRefKey={remRefKey}
                rem_mobile={mobile}
                dmtValue={dmtValue}
                setVerifyotp={setVerifyotp}
                setDmr2RemRes={setDmr2RemRes}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MoneyTransferView;
