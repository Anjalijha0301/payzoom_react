/* eslint-disable no-unused-vars */
import {
  Box,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { createRef, useState } from "react";
import ModalHeader from "./ModalHeader";

// import VisibilityIcon from "@mui/icons-material/Visibility";
import { Icon } from "@iconify/react/dist/iconify.js";
import ModalFooter from "./ModalFooter";
import { get, postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import SpinnerMUI from "../component/SpinnerMUI";
import { createFileName, useScreenshot } from "use-react-screenshot";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "Poppins",
  p: 2,
  height: "max-content",
  // overflowY: "scroll",
};

const AdminCreateVirtualAcct = ({ row, refresh }) => {
  //   console.log("row", row);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [vaData, setVaData] = useState({ vaRes: {}, vaCreated: false });

  const handleOpen = () => {
    get(
      ApiEndpoints.GET_VIRTUAL_ACC,
      `user_id=${row.id}`,
      setLoading,
      (res) => {
        // console.log("res", res.data);
        setVaData({ vaRes: res?.data?.data, vaCreated: true });
        setOpen(true);
      },
      (err) => {
        // console.log("err", err);
        setVaData({ vaRes: {}, vaCreated: false });
        setOpen(true);
      }
    );
    // setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const createVirtualAcct = () => {
    postJsonData(
      ApiEndpoints.CREATE_VA,
      { user_id: row?.id },
      setLoading,
      (res) => {
        okSuccessToast("Virtual Account created");
        if (refresh) refresh();
        handleClose();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  const [image, takeScreenshot] = useScreenshot({
    type: "image/png",
    quality: 1.0,
  });

  const download = (
    image,
    { name = "virtual Acct", extension = "png" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const ref = createRef(null);
  const downloadScreenshot = () => {
    takeScreenshot(ref.current).then(download);
  };

  return (
    <>
      <Tooltip title="Create Virtual Account" placement="bottom">
        <IconButton onClick={handleOpen} className="shadow-effect">
          {loading ? (
            <SpinnerMUI loading={loading} size={22} />
          ) : (
            <Icon
              icon="mdi:card-account-mail-outline"
              style={{ fontSize: "25px", color: "#9F86C0" }}
            />
          )}
        </IconButton>
      </Tooltip>
      {/* modal */}
      <Modal open={open}>
        <Box sx={style} className="sm_modal">
          <ModalHeader title="Virtual Account" handleClose={handleClose} />
          <Grid container ref={ref}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
              hidden={!vaData?.vaCreated}
            >
              <Tooltip title="Download">
                <IconButton sx={{ mx: 2 }} onClick={downloadScreenshot}>
                  <Icon
                    icon="lucide:download"
                    style={{ fontSize: "24px", color: "#1877F2" }}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <Grid item md={12} sm={12} sx={{ my: 3 }}>
              <Typography sx={{ textAlign: "center", fontSize: "30px" }}>
                {vaData?.vaCreated
                  ? "Virtual Account present"
                  : `Create Virtual Account`}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "25px",
                  mt: 0,
                  color: "#5E548E",
                }}
              >
                {vaData?.vaCreated ? `${vaData?.vaRes?.va}` : row.name}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  mt: 0.5,
                  fontSize: "18px",
                  color: "#5E548E",
                }}
              >
                {vaData?.vaCreated && "RATN0000500"}
              </Typography>
            </Grid>
          </Grid>
          {!vaData?.vaCreated && (
            <ModalFooter btn="create" onClick={createVirtualAcct} />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AdminCreateVirtualAcct;
