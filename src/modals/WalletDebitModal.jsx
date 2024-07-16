import React from "react";
import { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Spinner from "../commons/Spinner";
import ModalHeader from "./ModalHeader";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import ModalFooter from "./ModalFooter";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "Poppins",
  height: "max-content",
  overflowY: "scroll",
  p: 2,
};

const WalletDebitModal = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [walletType, setWalletType] = useState("w1");
  const [type, setType] = useState("DR");

  const context = useContext(AuthContext);
  const userLat = context.location.lat && context.location.lat;
  const userLong = context.location.long && context.location.long;

  const schema = yup.object().shape({
    amount: yup.number().required("Please enter amount"),
    remark: yup.string().required("Please enter remark"),
  });

  const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const walletDebit = (data) => {
    data.pf = "WEB";
    data.latitude = userLat;
    data.longitude = userLong;
    data.user_id = row.id;
    data.type = type;
    data.wallet = walletType;

    postJsonData(
      ApiEndpoints.WALLET_DEBIT,
      data,
      setRequest,
      (res) => {
        okSuccessToast(res?.data?.message);
        handleClose();
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
      <Tooltip title="Wallet Debit">
        <IconButton variant="contained" onClick={handleOpen}>
          <CurrencyRupeeIcon
            size="small"
            sx={{ color: "#1976D2", fontSize: "22px" }}
          />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <Spinner loading={request} />
          <ModalHeader title="Wallet Debit" handleClose={handleClose} />

          <Box
            component="form"
            id="edit-user"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(walletDebit)}
            sx={{
              "& .MuiTextField-root": { m: 2 },
              objectFit: "contain",
              overflowY: "scroll",
            }}
          >
            <Grid container sx={{ pt: 1 }}>
              <Grid item md={12} xs={12}>
                <Controller
                  name="amount"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        id="amount"
                        size="small"
                        required
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Controller
                  name="wallet"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Wallet"
                        id="wallet"
                        name="wallet"
                        size="small"
                        select
                        value={walletType}
                        onChange={(e) => setWalletType(e.target.value)}
                      >
                        <MenuItem value="w1">Wallet 1</MenuItem>
                        <MenuItem value="w2">Wallet 2</MenuItem>
                      </TextField>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Controller
                  name="type"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Type"
                        name="type"
                        id="type"
                        size="small"
                        select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <MenuItem value="CR">Credit</MenuItem>
                        <MenuItem value="DR">Debit</MenuItem>
                      </TextField>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Controller
                  name="remark"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Remark"
                        name="remark"
                        id="remark"
                        size="small"
                        required
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    </FormControl>
                  )}
                ></Controller>
              </Grid>
            </Grid>
            <ModalFooter form="edit-user" request={request} btn="Submit" />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default WalletDebitModal;
