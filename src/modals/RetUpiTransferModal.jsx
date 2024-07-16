import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { useState } from "react";
import PinInput from "react-pin-input";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
import { postJsonData } from "../network/ApiController";
import ResetMpin from "./ResetMpin";
import CallMadeIcon from "@mui/icons-material/CallMade";
import useCommonContext from "../store/CommonContext";

const RetUpiTransferModal = ({ ben, rem_number }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const { getRecentData } = useCommonContext();
  const [mpin, setMpin] = useState("");
  const [err, setErr] = useState();

  const authCtx = useContext(AuthContext);
  const loc = authCtx.location && authCtx.location;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    fontFamily: "Poppins",
    height: "max-content",
    overflowY: "scroll",
    p: 2,
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mpin !== "") {
      const data = {
        vpa: ben.bene_acc,
        latitude: loc.lat,
        longitude: loc.long,
        number: rem_number && rem_number,
        pf: "WEB",
        mpin: mpin,
        amount: document.getElementById("amount").value,
        name: ben.bene_name,
      };
      setRequest(true);
      postJsonData(
        ApiEndpoints.UPI_PAY,
        data,
        setRequest,
        (res) => {
          okSuccessToast(res.data.message);
          getRecentData();
          handleClose();
        },
        (error) => {
          getRecentData();
          if (error && error) {
            if (error.response.data.message === "Invalid M Pin") {
              setErr(error.response.data);
            } else {
              setErr("");
              handleClose();
              apiErrorToast(error);
            }
          }
        }
      );
    } else {
      setErr("");
      setMpin("");
      const error = {
        message: "MPIN required",
      };
      setErr(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      {/* <Button
        className="button-green-outline"
        size="small"
        sx={{ fontSize: "13px", py: 0.5, px: 1, borderRadius: "4px" }}
        onClick={handleOpen}
      >
        <CallMadeIcon sx={{ fontSize: "16px" }} />
        PAY
      </Button> */}
      <Tooltip title="Pay">
        <CallMadeIcon
          className="circle-green"
          fontSize="medium"
          sx={{
            ml: 0.8,
            mb: 0.2,
          }}
          onClick={handleOpen}
        />
      </Tooltip>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="sm_modal">
            <ModalHeader title="UPI Transfer" handleClose={handleClose} />
            <Box
              component="form"
              id="expMoneyTransfer"
              validate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
            >
              <Grid container sx={{ pt: 1 }}>
                <Grid
                  item
                  md={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <table className="mt-table">
                    <tr>
                      <td>Name</td>
                      <td>:</td>
                      <td style={{ textAlign: "right" }}>{ben.bene_name}</td>
                    </tr>
                    <tr>
                      <td>Account </td>
                      <td>:</td>
                      <td style={{ textAlign: "right" }}>{ben.bene_acc}</td>
                    </tr>
                  </table>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormControl sx={{ width: "90%" }}>
                    <TextField
                      label="Enter Amount"
                      id="amount"
                      size="small"
                      type="number"
                      required
                      inputProps={{
                        form: {
                          autocomplete: "off",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                >
                  <FormControl>
                    <Typography
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      Enter M-PIN
                    </Typography>
                    <PinInput
                      length={6}
                      focus
                      type="password"
                      onChange={(value, index) => {
                        if (err !== "") {
                          setErr("");
                        }
                        setMpin(value);
                      }}
                      regexCriteria={/^[0-9]*$/}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  sx={{ display: "flex", justifyContent: "end", pr: 16 }}
                >
                  <ResetMpin variant="text" />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  {err && err && (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                        fontSize: "12px",
                        px: 2,
                        color: "#DC5F5F",
                      }}
                    >
                      {err.message && err.message && (
                        <div>{err && err.message}</div>
                      )}

                      {err.data && err.message === "Invalid M Pin" && (
                        <div className="blink_text">
                          Attempts remaining:{err && 5 - Number(err.data)}
                        </div>
                      )}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
            <ModalFooter
              form="expMoneyTransfer"
              request={request}
              btn="Proceed"
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};
export default RetUpiTransferModal;
