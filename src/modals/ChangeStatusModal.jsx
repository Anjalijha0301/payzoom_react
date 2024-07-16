import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import ApiEndpoints from "../network/ApiEndPoints";
import { postFormData } from "../network/ApiController";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "Poppins",
  height: "auto",
  overflowY: "scroll",
  p: 2,
};

const ChangeStatusModal = ({ row, refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [status, setStatus] = useState("");

  const changeStatus = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    postFormData(
      ApiEndpoints.CHANGE_STATUS,
      {
        id: row.id,
        op_id: form.msg.value,
        status: status,
      },
      setRequest,
      (res) => {
        handleClose();
        // okSuccessToast(res);
        Swal.fire(res.data.message);
        if (refresh) {
          refresh();
        }
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
        justifyContent: "flex-start",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {row.status && row.status === "SUCCESS" ? (
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Refund">
              <ReplayIcon
                className="hover-red"
                onClick={() => {
                  handleOpen();
                  setStatus("REFUND");
                }}
              />
            </Tooltip>
            <Tooltip title="Fail">
              <ClearIcon
                className="hover-red ms-2"
                onClick={() => {
                  handleOpen();
                  setStatus("FAIL");
                }}
              />
            </Tooltip>
          </Box>
        ) : row.status && row.status === "PENDING" ? (
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Success">
              <CheckIcon
                className="hover-red"
                onClick={() => {
                  handleOpen();
                  setStatus("SUCCESS");
                }}
              />
            </Tooltip>
            <Tooltip title="Refund">
              <ReplayIcon
                className="hover-red ms-2"
                onClick={() => {
                  handleOpen();
                  setStatus("REFUND");
                }}
              />
            </Tooltip>
            <Tooltip title="Fail">
              <ClearIcon
                className="hover-red ms-2"
                onClick={() => {
                  handleOpen();
                  setStatus("FAIL");
                }}
              />
            </Tooltip>
          </Box>
        ) : row.status && row.status === "FAILED" ? (
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Rollback">
              <RefreshIcon
                className="hover-red"
                onClick={() => {
                  handleOpen();
                  setStatus("ROLLBACK");
                }}
              />
            </Tooltip>
          </Box>
        ) : (
          ""
        )}
      </Box>

      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="sm_modal">
            <ModalHeader title="Change Status" handleClose={handleClose} />
            <Box
              component="form"
              id="changeStatus"
              noValidate
              autoComplete="off"
              onSubmit={changeStatus}
              sx={{
                "& .MuiTextField-root": { m: 2 },
                objectFit: "contain",
              }}
            >
              <Grid item lg={12} md={12} xs={12}>
                <FormControl fullWidth>
                  <TextField label="Message" id="msg" size="small" required />
                </FormControl>
              </Grid>
            </Box>
            <ModalFooter
              form="changeStatus"
              request={request}
              btn="change status"
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};
export default ChangeStatusModal;
