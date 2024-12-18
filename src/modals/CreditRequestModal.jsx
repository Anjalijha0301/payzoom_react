import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  TextField,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import ApiEndpoints from "../network/ApiEndPoints";
import { postJsonData } from "../network/ApiController";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import numWords from "num-words";
import { useState } from "react";
import PinInput from "react-pin-input";
import ResetMpin from "./ResetMpin";
import { secondaryColor } from "../theme/setThemeColor";

const CreditRequestModal = ({ row, action = "status", refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [mpin, setMpin] = useState("");
  const [remarkVal, setRemarkVal] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
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
  // console.log(remarkVal);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      id: row.id,
      amount: form.amt.value,
      // remark: form.remarks.value,
      remark: remarkVal && remarkVal,
      action: action,
      mpin: mpin,
    };

    setRequest(true);

    // if (validateApiCall()) {
    postJsonData(
      ApiEndpoints.CRED_REQ_APPROVE,
      data,
      setRequest,
      (res) => {
        if (data.action === "REJECT") {
          okSuccessToast("Request cancelled successfully");
          handleClose();
          if (refresh) refresh();
        } else {
          okSuccessToast("Request Processed successfully");
          handleClose();
          if (refresh) refresh();
        }
      },
      (error) => {
        apiErrorToast(error);
      }
    );
    // } else {
    //   setErr("");
    //   const error = {
    //     message: "Kindly wait some time before another request",
    //   };
    //   setErr(error);
    // }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      {action && action === "APPROVE" && (
        <Tooltip title="approve">
          <IconButton
            onClick={() => {
              handleOpen();
            }}
          >
            <DoneAllIcon style={{ color: "green" }} />
          </IconButton>
        </Tooltip>
      )}
      {action && action === "REOPEN" && (
        <Tooltip title="Reopen">
          <Button
            className="button-red"
            sx={{ fontSize: "10px", background: secondaryColor() }}
            variant="contained"
            // onClick={handleOpen}
          >
            Reopen
          </Button>
        </Tooltip>
      )}
      {action && action === "REJECT" && (
        <Tooltip title="reject">
          <IconButton
            onClick={() => {
              handleOpen();
            }}
          >
            <CloseIcon style={{ color: "red" }} />
          </IconButton>
        </Tooltip>
      )}
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="sm_modal">
            <ModalHeader
              title={`${action} (${row.name})`}
              handleClose={handleClose}
            />
            {action && action !== "APPROVE" ? (
              <Box
                component="form"
                id="cred_req"
                validate
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{
                  "& .MuiTextField-root": { m: 2 },
                  objectFit: "contain",
                  overflowY: "scroll",
                }}
              >
                <Grid container sx={{ pt: 1 }}>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Amount"
                        defaultValue={row.amount}
                        id="amt"
                        size="small"
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Amount in Words"
                        id="inWords"
                        defaultValue={numWords(row.amount)}
                        size="small"
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Remarks"
                        id="remarks"
                        size="small"
                        required
                        onChange={(e) => {
                          setRemarkVal(e.target.value);
                        }}
                        className="new-password"
                        autoComplete="off"
                        inputProps={{
                          autoFocus: "off",
                          form: {
                            autoComplete: "off",
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <FormControl>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        M-PIN
                      </div>
                      <PinInput
                        length={6}
                        focus
                        type="password"
                        onChange={(value, index) => {
                          setMpin(value);
                        }}
                        inputMode="text"
                        autoSelect={false}
                        regexCriteria={/^[0-9]*$/}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      mt: 2,
                      pr: 2,
                    }}
                  >
                    <ResetMpin variant="text" />
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box
                component="form"
                id="cred_req"
                autoComplete="off"
                validate
                onSubmit={handleSubmit}
                sx={{
                  "& .MuiTextField-root": { m: 2 },
                  objectFit: "contain",
                  overflowY: "scroll",
                }}
              >
                <Grid container sx={{ pt: 1 }}>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Amount"
                        defaultValue={row.amount}
                        id="amt"
                        size="small"
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Amount in Words"
                        id="inWords"
                        defaultValue={numWords(row.amount)}
                        size="small"
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Remarks"
                        id="remarks"
                        size="small"
                        onChange={(e) => {
                          setRemarkVal(e.target.value);
                        }}
                        required
                        autoComplete="off"
                        inputProps={{
                          autoFocus: "off",
                          form: {
                            autoComplete: "off",
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <FormControl>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        M-PIN
                      </div>
                      <PinInput
                        length={6}
                        type="password"
                        onChange={(value, index) => {
                          setMpin(value);
                        }}
                        inputMode="text"
                        regexCriteria={/^[0-9]*$/}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "end" }}
                  >
                    <ResetMpin variant="text" />
                  </Grid>
                </Grid>
              </Box>
            )}

            <ModalFooter form="cred_req" type="submit" request={request} />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};
export default CreditRequestModal;
