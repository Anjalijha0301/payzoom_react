/* eslint-disable react-hooks/exhaustive-deps */
// ###########################################################################
// USE THIS COMPONENT TO DISPLAY <RightNavbar /> ANYWHERE IN THE PROJECT
// ###########################################################################
// IMPORTED ADDED BY ANKUR
// COMMENTS ADDED BY ANKUR DHARMOSHT.... CONTACT ME FOR ANY QUERY.......
// DO NOT DELETE THE COMMENTS IN THE FILE.....

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  TextField,
  FormControl,
  Typography,
  Button,
  Card,
} from "@mui/material";
import AuthContext from "../store/AuthContext";
import { postFormData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import SendMoneyModal from "../modals/SendMoneyModal";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { upiWeb } from "../iconsImports";
import QRCode from "react-qr-code";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Spinner from "../commons/Spinner";
import { numberSetter } from "../utils/Currencyutil";
import WalletTransfer from "../modals/WalletTransfer";
import useCommonContext from "../store/CommonContext";
import OutletRegistration from "./OutletRegistration";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import QRWarningModal from "../modals/QRWarningModal";
import { validateApiCall } from "../utils/LastApiCallChecker";
import Mount from "./Mount";
import RefreshComponent from "./RefreshComponent";
import RecentHistory from "./right_sidenav/RecentHistory";
import BankTransfer from "./right_sidenav/BankTransfer";
import AddBalanceViaPG from "../modals/AddBalanceViaPG";
import { Icon } from "@iconify/react";
import CMSModal from "../modals/CMSModal";

const RightNavbar = () => {
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const userLat = authCtx.location && authCtx.location.lat;
  const userLong = authCtx.location && authCtx.location.long;
  const [showQr, setShowQr] = useState(false);
  const [open, setOpen] = useState(false);
  const [showWalletTransfer, setShowWalletTransfer] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const instId = user && user.instId;
  const [walletTransferErrMsg, setWalletTransferErrMsg] = useState("");
  const [request, setRequest] = useState(false);
  const { getRecentData, refreshUser, userRequest } = useCommonContext();
  const [err, setErr] = useState();

  const selfqrValue =
    instId && instId
      ? `upi://pay?pa=ipay.133876.` +
        instId +
        "@icici" +
        `&pn=${user && user.establishment}` +
        "&cu=INR"
      : "";

  // ######################################
  // W2 TO W1 TRANSFER API CALL ...........
  // ######################################
  const handleW2ToW1Transfer = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      amount: form.w2_amount.value,
      pf: "WEB",
      latitude: userLat,
      longitude: userLong,
    };

    if (validateApiCall()) {
      postFormData(
        ApiEndpoints.W2TOW1_TRANSFER,
        data,
        setRequest,
        (res) => {
          okSuccessToast(res.data.message);
          setWalletTransferErrMsg("");
          document.getElementById("w2_amount").value = "";
          document.getElementById("w2_amount").focused = "off";
          refreshUser();
          getRecentData();
          setErr("");
        },
        (err) => {
          setErr("");
          if (
            err.response.data.message.amount &&
            err.response.data.message.amount
          ) {
            setWalletTransferErrMsg(err.response.data.message.amount);
          } else {
            setWalletTransferErrMsg("");
            apiErrorToast(err);
            refreshUser();
            getRecentData();
          }
        }
      );
    } else {
      setErr("");
      const error = {
        message: "Kindly wait some time before another request",
      };
      setErr(error);
    }
  };

  useEffect(() => {
    getRecentData();
  }, []);

  const handleOpen = () => {
    // const timer = setTimeout(() => {
    if (authCtx?.isLoggedIn) refreshUser();
    // }, 30000);
    // return () => clearTimeout(timer);
  };

  // ############################################
  // TRANSFER CARDS COMPONENT HANDLING FUNCTIONS
  // ############################################
  const handleWalletTransfer = () => {
    if (showWalletTransfer && showWalletTransfer) {
      setShowWalletTransfer(!showWalletTransfer);
    }
  };
  const handleBankTransfer = () => {
    if (showBankTransfer && showBankTransfer) {
      setShowBankTransfer(!showBankTransfer);
    }
  };

  return (
    <Box component="div" className="right-nav">
      {/* ################################## */}
      {/* XXXXXXXX W1 BALANCE CARD XXXXXXXXX */}
      {/* ################################## */}
      <Box className={user.w1 / 100 < 1000 ? "animate cards" : "cards"}>
        <Box
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginRight: "15px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "start",
                  fontWeight: "bolder",
                }}
              >
                Wallet 1 Balance
                <RefreshComponent
                  refresh={userRequest}
                  onClick={() => {
                    refreshUser();
                  }}
                />
              </div>
            </div>

            <div
              style={{
                fontSize: "35px",
                fontWeight: "bolder",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <span
                style={{ fontSize: "16px", display: "contents" }}
                className="diff-font"
              >
                ₹
              </span>
              {numberSetter(user.w1 / 100)}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                fontSize: "10px",
              }}
            >
              Main Wallet
            </div>
            {user.w1 / 100 < 1000 && (
              <div style={{ textAlign: "left", fontSize: "12px" }}>
                Your Wallet Balance is low <br />
                Kindly recharge.
              </div>
            )}
            {user.hold && user.hold > 0 ? (
              <div
                style={{
                  textAlign: "left",
                  color: "#F5F5F5",
                  fontSize: "12px",
                }}
                className="diff-font"
              >
                hold amount &#8377; {user.hold}
              </div>
            ) : (
              ""
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <SendMoneyModal />
            <AddBalanceViaPG />
            {/* qr here   for ad login in this qr is in first card */}
            {user && user.role === "Ad"
              ? user &&
                user.instId &&
                selfqrValue !== "" &&
                user.upi_qr === 1 && (
                  <>
                    <Box sx={{ mt: 2 }}>
                      <Tooltip title="My QR">
                        <IconButton
                          className="hover-zoom"
                          sx={{
                            display: "contents",
                            color: "#fff",
                          }}
                          onClick={() => {
                            setOpen(true);
                          }}
                        >
                          <QrCode2Icon className="hover-zoom hover-white" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <OutletRegistration
                      btn={
                        <div className="hover-zoom">
                          <Tooltip title="My QR" placement="left">
                            <IconButton
                              className="hover-zoom hover-white"
                              sx={{ display: "contents", color: "#fff" }}
                            >
                              <QrCode2Icon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      }
                    />
                  </>
                )
              : ""}
            {user.role !== "Ad" &&
            user.role !== "Api" &&
            user &&
            user.instId ? (
              <WalletTransfer />
            ) : (
              user.role !== "Ad" &&
              user.role !== "Api" && (
                <OutletRegistration
                  btn={
                    <div className="hover-zoom">
                      <Tooltip title="Paytm Transfer" placement="left">
                        <IconButton
                          onClick={handleOpen}
                          sx={{ display: "contents", mt: 2 }}
                        >
                          <LocalParkingIcon
                            className="hover-white hover-zoom"
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  }
                />
              )
            )}
          </div>
        </Box>
        {/* <section
          style={{
            display: "flex",
            justifyContent: "start",
            marginTop: "12px",
          }}
        >
          <CMSModal />
        </section> */}
      </Box>

      {/* ################################## */}
      {/* XXXXXXXX W2 BALANCE CARD XXXXXXXXX */}
      {/* ################################## */}
      <Mount visible={user.role !== "Ad" || user.role !== "Api"}>
        <Box
          className="cards"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* ################################## */}
          {/* W2 BALANCE */}
          {/* ################################## */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginRight: "15px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "start",
                  fontWeight: "bolder",
                  // color: "#000",
                }}
              >
                Wallet 2 Balance
                <RefreshComponent
                  refresh={userRequest}
                  onClick={() => {
                    refreshUser();
                  }}
                />
              </div>
            </div>

            <div
              style={{
                fontSize: "35px",
                fontWeight: "bolder",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <span
                className="diff-font"
                style={{ fontSize: "16px", display: "contents" }}
              >
                &#8377;{" "}
              </span>
              {numberSetter(user.w2 / 100)}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                fontSize: "10px",
              }}
            >
              Collection Wallet
            </div>
          </div>

          {/* ################################## */}
          {/* QR MODAL BUTTON */}
          {/* ################################## */}
          <div style={{ display: "grid" }}>
            <Mount
              visible={
                user && user.instId && selfqrValue !== "" && user.upi_qr === 1
              }
            >
              <div className="hover-zoom">
                <IconButton
                  className="hover-zoom"
                  sx={{ display: "contents", color: "#fff" }}
                  onClick={() => {
                    setOpen(true);
                    handleWalletTransfer();
                    handleBankTransfer();
                  }}
                >
                  <Tooltip title="QR" placement="left">
                    <QrCode2Icon className="hover-white" />
                  </Tooltip>
                </IconButton>
              </div>
            </Mount>

            {/* ################################## */}
            {/* OUTLET REGISTRATION MODAL BUTTON */}
            {/* ################################## */}
            <Mount visible={!user.instId}>
              <OutletRegistration
                btn={
                  <div className="hover-zoom">
                    <IconButton
                      className="hover-zoom"
                      sx={{ display: "contents", color: "#fff" }}
                    >
                      <Tooltip title="QR" placement="left">
                        <QrCode2Icon className="hover-white" />
                      </Tooltip>
                    </IconButton>
                  </div>
                }
              />
            </Mount>

            {/* ################################## */}
            {/* BANK TRANSFER MODAL BUTTON */}
            {/* ################################## */}
            <div className="hover-zoom">
              <IconButton
                className="hover-zoom"
                sx={{ display: "contents", color: "#fff" }}
                onClick={() => {
                  setShowBankTransfer(!showBankTransfer);
                  handleWalletTransfer();
                }}
              >
                <Tooltip title="Bank Transfer" placement="left">
                  <AccountBalanceIcon className="hover-white" sx={{ mt: 1 }} />
                </Tooltip>
              </IconButton>
            </div>

            {/* ################################## */}
            {/* W2 TO W1 TRANSFER MODAL BUTTON */}
            {/* ################################## */}
            <div className="hover-zoom">
              <IconButton
                sx={{ display: "contents", color: "#fff" }}
                onClick={() => {
                  setShowWalletTransfer(!showWalletTransfer);
                  handleBankTransfer();
                }}
              >
                <Tooltip title="W2 to W1 Transfer" placement="left">
                  <AccountBalanceWalletIcon
                    className="hover-white"
                    sx={{ mt: 1 }}
                  />
                </Tooltip>
              </IconButton>
            </div>
          </div>
        </Box>
      </Mount>

      {/* ######################################## */}
      {/* ## QR CODE MAIN CARD COMPONENT ## */}
      {/* ######################################## */}
      <Mount visible={showQr}>
        <Card
          id="qrDrop"
          sx={{
            mt: 2,
            p: { md: 1, sm: 1, xs: 2 },
            width: "100%",
          }}
          className="position-relative"
        >
          <IconButton className="top-right-position">
            <HighlightOffRoundedIcon
              className="hover-red"
              onClick={() => setShowQr(false)}
            />
          </IconButton>

          <div style={{ fontWeight: "bold" }}>{user.name}</div>

          <div style={{ fontSize: "10px" }}>{selfqrValue}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            <QRCode value={selfqrValue} size={156} />
          </div>
          <div style={{ fontWeight: "bold" }}>Scan this code & pay me</div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            <img src={upiWeb} alt="upi apps" />
          </div>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "11px",
              fontWeight: "600",
              color: "#676970",
              p: 2.2,
              pb: 0,
            }}
          >
            *Note: This Payment will be added to W2
          </Typography>
        </Card>
      </Mount>

      {/* ######################################## */}
      {/* ## W2 TO W1 MAIN CARD COMPONENT ## */}
      {/* ######################################## */}
      <Mount visible={showWalletTransfer}>
        <Grid
          id="qrDrop"
          sx={{
            marginTop: "12px",
            px: 2,
            pt: 2,
            backgroundColor: "#ffffff",
          }}
          className="position-relative card-css"
        >
          <IconButton className="top-right-position">
            <HighlightOffRoundedIcon
              className="hover-red"
              onClick={() => {
                setShowWalletTransfer(false);
                setErr("");
                setWalletTransferErrMsg("");
              }}
            />
          </IconButton>
          <Spinner loading={request} circleBlue />
          <Typography
            sx={{ fontWeight: "bold", width: "100%", textAlign: "left" }}
          >
            W2 to W1 Transfer
          </Typography>
          <Box
            component="form"
            id="walletTransfer"
            validate
            autoComplete="off"
            onSubmit={handleW2ToW1Transfer}
          >
            <FormControl sx={{ width: "100%", mt: 1 }}>
              <TextField
                label="Enter Amount"
                id="w2_amount"
                type="number"
                sx={{ backgroundColor: "#fff" }}
                onChange={() => {
                  setWalletTransferErrMsg("");
                }}
                required
                size="small"
                onKeyDown={(e) => {
                  if (e.key === "+" || e.key === "-") {
                    e.preventDefault();
                  }
                }}
              />
            </FormControl>
          </Box>
          <Box sx={{ width: "100%", textAlign: "right" }}>
            {err && (
              <Typography sx={{ fontSize: "12px", color: "#4E5555" }}>
                {err?.message}
              </Typography>
            )}
            {walletTransferErrMsg && (
              <Typography sx={{ fontSize: "12px", color: "#4E5555" }}>
                {walletTransferErrMsg}
              </Typography>
            )}

            <Button
              variant="contained"
              sx={{
                fontSize: "12px",
                my: 1,
                textTransform: "capitalize",
                mt: 1,
                // backgroundColor: "#E87204",
                // "&:hover": {
                //   backgroundColor: "#E87204",
                // },
              }}
              className="otp-hover-purple"
              form="walletTransfer"
              type="submit"
              disabled={request}
            >
              Proceed
            </Button>
          </Box>
        </Grid>
      </Mount>

      {/* ######################################## */}
      {/* ## BANK TRANSFER MAIN CARD COMPONENT ## */}
      {/* ######################################## */}
      <Mount visible={showBankTransfer}>
        <BankTransfer
          showBankTransfer={showBankTransfer}
          setShowBankTransfer={setShowBankTransfer}
        />
      </Mount>

      {/* ######################################## */}
      {/* ## RECENT HISTORY MAIN CARD COMPONENT ## */}
      {/* ######################################## */}
      <RecentHistory />

      {/* ######################################## */}
      {/* ###### QR WARNING MODAL ######### */}
      {/* DISPLAYED ON QR CLICK THE FIRST TIME */}
      {/* ######################################## */}
      <QRWarningModal
        open={open}
        showQr={showQr}
        setOpen={setOpen}
        setShowQr={setShowQr}
      />
    </Box>
  );
};

export default RightNavbar;
