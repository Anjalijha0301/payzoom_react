import React, { useState } from "react";
import {
  FormControl,
  Grid,
  TextField,
  IconButton,
  Box,
  Modal,
  Tooltip,
} from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ApiEndpoints from "../network/ApiEndPoints";
import { postJsonData } from "../network/ApiController";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "Poppins",
  p: 2,
  height: "max-content",
  overflowY: "scroll",
};

const EditOperator = ({ row, refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      id: row?.id,
      admin_comm: form.admin_comm.value,
      ret_comm: form.ret_comm.value,
      ad_comm: form.ad_comm.value,
      dd_comm: form.dd_comm.value,
    };
    postJsonData(
      ApiEndpoints.UPDATE_OPERATOR,
      data,
      setRequest,
      (res) => {
        okSuccessToast("operator updated successfully");
        if (refresh) refresh();
        handleClose();
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Tooltip title="Edit Operator">
        <IconButton
          variant="contained"
          style={{ fontSize: "10px", marginLeft: "5px" }}
          onClick={handleOpen}
        >
          <DriveFileRenameOutlineIcon />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <ModalHeader title="Operator" handleClose={handleClose} />
          <Box
            component="form"
            id="edit-operator"
            noValidate
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
                    label="Admin Commision"
                    id="admin_comm"
                    size="small"
                    defaultValue={Number(row.admin_comm).toFixed(2)}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Retailer Commision"
                    id="ret_comm"
                    size="small"
                    defaultValue={Number(row.ret_comm).toFixed(2)}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Area Distributer Commision"
                    id="ad_comm"
                    size="small"
                    defaultValue={Number(row.ad_comm).toFixed(2)}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Direct Dealer Commision"
                    id="dd_comm"
                    size="small"
                    defaultValue={Number(row.dd_comm).toFixed(2)}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            <ModalFooter form="edit-operator" request={request} btn="Proceed" />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default EditOperator;
