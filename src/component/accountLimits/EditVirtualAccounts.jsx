import React, { useState } from "react";
import Box from "@mui/material/Box";
import { FormControl, Grid, TextField, Tooltip, IconButton, Modal } from "@mui/material";
import Spinner from "../../commons/Spinner";
import ModalHeader from "../../modals/ModalHeader";
import ModalFooter from "../../modals/ModalFooter";
import { postJsonData } from "../../network/ApiController";
import ApiEndpoints from "../../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../../utils/ToastUtil";
import { Icon } from "@iconify/react";

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

const EditVirtualAccounts = ({ refresh, row }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    if (refresh) refresh();
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    let data = {
      allowed_accounts: form.va.value,
      id: row.id,
    };

    postJsonData(
      ApiEndpoints.VIRTUAL_ACCS,
      data,
      setRequest,
      (res) => {
        okSuccessToast(res?.data?.message);
        if (refresh) refresh();
        handleClose();
      },
      (err) => {
        apiErrorToast(err);
        if (refresh) refresh();
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
      <Tooltip title="Edit Virtual Account">
        <IconButton onClick={handleOpen}>
          <Icon
            icon="basil:edit-solid"
            style={{ fontSize: "24px" }}
            className="refresh-icon-risk"
          />
        </IconButton>
      </Tooltip>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="sm_modal">
            <Spinner loading={request} />
            <ModalHeader
              title={`Edit Virtual Account`}
              handleClose={handleClose}
            />
            <Box
              component="form"
              id="accountlimit"
              validate="true"
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { m: 2 },
              }}
            >
              <Grid container sx={{ pt: 1 }}>
                <Grid item md={12} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Virtual Accounts"
                      id="va"
                      name="va"  // Add the name attribute to ensure form submission works correctly
                      size="small"
                      required
                      multiline
                      rows={4}
                      defaultValue={row?.virtual_accounts}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <ModalFooter
              form="accountlimit"
              type="submit"
              btn="Submit"
              disable={request}
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default EditVirtualAccounts;
