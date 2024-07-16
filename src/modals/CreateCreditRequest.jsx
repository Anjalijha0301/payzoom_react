import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  TextField,
  Tooltip,
  IconButton,
  MenuItem,
} from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { get, postJsonData } from "../network/ApiController";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { yyyymmdd } from "../utils/DateUtils";
import { creditReqGuidelinesImg } from "../iconsImports";

const CreateCreditRequest = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [bank, setBank] = useState("");
  const [mode, setMode] = useState("");
  const [bankList, setBankList] = useState([]);
  const [modeList, setModeList] = useState([]);
  // const [pendingTxnList, setPendingTxnList] = useState();

  const getCredDataList = () => {
    get(
      ApiEndpoints.GET_BANK_CREDIT_REQ,
      "",
      setRequest,
      (res) => {
        if (res && res.data) {
          setBankList(res.data.data.banks);
          setModeList(res.data.data.modes);
          setOpen(true);
        } else {
          // setPendingTxnList();
        }
      },
      (error) => {
        apiErrorToast("error=> ", error);
      }
    );
  };

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
    getCredDataList();
  };
  const handleClose = () => {
    setDateValue("");
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      bank_name: bank,
      mode: mode,
      bank_ref_id: form.ref_id.value,
      date: yyyymmdd(dateValue),
      amount: form.amt.value,
    };
    setRequest(true);
    postJsonData(
      ApiEndpoints.CREDIT_REQ,
      data,
      setRequest,
      (res) => {
        okSuccessToast("Request Created successfully");
        handleClose();
        if (refresh) refresh();
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Tooltip title="Credit Request">
        <IconButton
          aria-label="addAccount"
          color="success"
          onClick={handleOpen}
        >
          <AddCircleOutlineIcon className="refresh-purple" />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <ModalHeader
            title="Create Credit Request"
            handleClose={handleClose}
          />
          <Box
            component="form"
            id="createCreditReq"
            validate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <Grid container sx={{ pt: 1 }}>
              <Grid item md={12} xs={12}>
                <img
                  src={creditReqGuidelinesImg}
                  alt="disclaimer"
                  width="100%"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    select
                    value={bank && bank}
                    onChange={(e) => {
                      setBank(e.target.value);
                    }}
                    id="bank"
                    label="Select Bank"
                    size="small"
                    required
                  >
                    <MenuItem dense value="select">
                      Select
                    </MenuItem>
                    {bankList &&
                      bankList.map((item, index) => {
                        return (
                          <MenuItem
                            dense
                            key={index}
                            value={item.name}
                            sx={{ fontSize: "12px" }}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    select
                    value={mode && mode}
                    onChange={(e) => {
                      setMode(e.target.value);
                    }}
                    id="mode"
                    label="Select Mode"
                    size="small"
                    required
                  >
                    <MenuItem dense value="select">
                      Select
                    </MenuItem>
                    {modeList &&
                      modeList.map((item, index) => {
                        return (
                          <MenuItem
                            dense
                            key={index}
                            value={item}
                            sx={{ fontSize: "12px" }}
                          >
                            {item}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Refrence Id"
                    id="ref_id"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={dateValue}
                      onChange={(newValue) => {
                        setDateValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size="small" error={false} />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Amount"
                    id="amt"
                    size="small"
                    type="number"
                    InputProps={{
                      inputProps: {
                        max: 10000000,
                        min: 500,
                      },
                    }}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <ModalFooter form="createCreditReq" request={request} btn="Save" />
        </Box>
      </Modal>
    </Box>
  );
};
export default CreateCreditRequest;
