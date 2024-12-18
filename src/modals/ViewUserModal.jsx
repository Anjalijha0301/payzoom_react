import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  TextField,
  Typography,
  IconButton,
  Box,
  Modal,
  Tooltip,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ApiEndpoints from "../network/ApiEndPoints";
import { get, postJsonData } from "../network/ApiController";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { PurpleOutline } from "../theme/Theme";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Controller, useForm } from "react-hook-form";
import Spinner from "../commons/Spinner";
import BankSearch from "../component/BankSearch";
import CommonSearchField from "../component/CommonSearchField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Mount from "../component/Mount";
import SpinnerMUI from "../component/SpinnerMUI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "Poppins",
  height: "max-content",
  overflowY: "scroll",
  p: 2,
};

const ViewUserModal = ({
  row,
  refresh,

  asmArray,
  adArray,
}) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const query = `id=${row && row.id}`;
  const [userDetails, setUserDetails] = useState([]);
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);
  const [showBankInfo, setshowBankInfo] = useState(false);
  const [showOtherInfo, setShowOtherInfo] = useState(false);
  const [securityInfo, setSecurityInfo] = useState(false);

  const [bankObjCallBack, setbankObjCallBack] = useState();
  const [bankSearchIfsc, setbankSearchIfsc] = useState();
  const [asmSearchVal, setAsmSearchVal] = useState({});
  const [adSearchVal, setAdSearchVal] = useState({});
  const [bcDropdown, setBcDropDown] = useState("");
  const [userRequest, setUserRequest] = useState(false);

  // console.log("userDetails", userDetails);
  // console.log("bcDropdown", bcDropdown);
  // console.log("adSearchVal", adSearchVal);

  const handleBankInfo = () => {
    setshowBankInfo(!showBankInfo);
  };
  const handleBusinessInfo = () => {
    setShowBusinessInfo(!showBusinessInfo);
  };
  const handleOtherInfo = () => {
    setShowOtherInfo(!showOtherInfo);
  };
  const handleSecurityInfo = () => {
    setSecurityInfo(!securityInfo);
  };

  const getuser = () => {
    get(
      ApiEndpoints.GET_USER_BY_ID,
      query,
      setUserRequest,
      (res) => {
        if (res && res.data && res.data) {
          setUserDetails(res.data.data);
          setBcDropDown(res?.data?.data.type);
          setOpen(true);
        } else setUserDetails();
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const updateUser = (data) => {
    data.id = row.id;
    data.ifsc = bankSearchIfsc ? bankSearchIfsc : userDetails.ifsc;
    data.parent = adSearchVal?.value;
    data.asm = asmSearchVal?.value;
    data.type = bcDropdown;
    // console.log("data", data);
    // event.preventDefault();
    // const form = event.currentTarget;
    // const data = {
    //   id: row.id,
    //   name: form.name.value,
    //   gender: form.gender.value,
    //   username: userDetails && userDetails.username,
    //   email: form.email.value,
    //   hold: form.hold.value,
    //   mpin_retries: form.mpin_retries.value,
    //   establishment: form.est.value,
    //   p_address: form.p_address.value,
    //   b_address: form.b_address.value,
    //   state: form.state.value,
    //   district: form.district.value,
    //   pincode: form.pincode.value,
    //   aadhar: form.aadhar.value,
    //   pan: form.pan.value,
    //   gstin: form.gstin.value,
    //   role: form.role.value,
    //   parent: form.parent.value,
    //   asm: form.asm.value,
    //   // dmt_slab1: form.dmt_slab1.value,
    //   // dmt_slab2: form.dmt_slab2.value,
    //   ip: form.ip.value,
    //   acc_name: form.acc_name.value,
    //   acc_number: form.acc_number.value,
    //   ifsc: form.ifsc.value,
    //   bank: form.bank.value,
    //   is_acc_verified: isAccVerified,
    // };
    postJsonData(
      ApiEndpoints.UPDATE_USER,
      data,
      setRequest,
      (res) => {
        okSuccessToast("User updated successfully");
        handleClose();
        if (refresh) {
          refresh();
        }
      },
      (error) => {
        apiErrorToast(error);
        if (refresh) {
          refresh();
        }
      }
    );
  };

  const handleOpen = () => {
    getuser();
  };

  const handleClose = () => {
    setOpen(false);
    handleBankInfo();
    handleBusinessInfo();
    handleOtherInfo();
    handleSecurityInfo();
  };

  const schema = yup.object().shape({
    payout_limit: yup
      .number()
      .min(10, "Payout limit cannot be less than 10")
      .max(100000, "Payout limit cannot be greater than 100000"),
    bc_rate: yup
      .number()
      .min(3, "Bc rate cannot be less than 3")
      .max(10, "Bc rate cannot be greater than 10"),
  });

  const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (!bankObjCallBack) setbankSearchIfsc(undefined);
  }, [bankObjCallBack]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      {userRequest ? (
        <IconButton variant="contained" style={{ marginLeft: "5px" }}>
          <SpinnerMUI loading={userRequest} size={22} />
        </IconButton>
      ) : (
        <Tooltip title="Edit User">
          <IconButton
            variant="contained"
            style={{ fontSize: "10px", marginLeft: "5px", color: "#e57373" }}
            onClick={handleOpen}
          >
            <DriveFileRenameOutlineIcon />
          </IconButton>
        </Tooltip>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {userDetails && (
          <Box sx={style} className="sm_modal">
            <Spinner loading={request} />
            <ModalHeader title="Edit User" handleClose={handleClose} />
            <Box
              component="form"
              id="edit-user"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(updateUser)}
              sx={{
                "& .MuiTextField-root": { m: 2 },
                objectFit: "contain",
                overflowY: "scroll",
                height: "60vh",
                marginTop: "24px",
              }}
            >
              {/* ##### personal details #####*/}
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  pt: 1,
                  fontSize: "15px",
                  color: "grey",
                  pl: 2,
                }}
              >
                Personal Details
              </Typography>
              <Grid container sx={{ pt: 1 }}>
                <Grid item md={4} xs={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Name"
                      id="name"
                      size="small"
                      required
                      defaultValue={userDetails && userDetails.name}
                      disabled
                      sx={{
                        "&:disabled": {
                          background: "#d1d1d1 !important",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={6}>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={userDetails?.gender?.toUpperCase()}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          label="Gender"
                          id="gender"
                          size="small"
                          required
                          select
                          defaultValue={userDetails?.gender?.toUpperCase()}
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        >
                          <MenuItem value="MALE">Male</MenuItem>
                          <MenuItem value="FEMALE">Female</MenuItem>
                          <MenuItem value="OTHER">Other</MenuItem>
                        </TextField>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      label="Username"
                      id="username"
                      size="small"
                      required
                      defaultValue={userDetails.username}
                      disabled
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {userDetails && userDetails.is_mobile_verified && (
                              <Tooltip title="Verified" placement="top">
                                <VerifiedIcon color="success" />
                              </Tooltip>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={6}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={userDetails.email}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          label="Email"
                          id="email"
                          size="small"
                          required
                          value={value}
                          defaultValue={userDetails.email}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      </FormControl>
                    )}
                  ></Controller>
                </Grid>
                <Grid item md={4} xs={6}>
                  <Controller
                    name="p_address"
                    control={control}
                    defaultValue={userDetails.p_address}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          label="Address"
                          id="p_address"
                          size="small"
                          required
                          defaultValue={userDetails.p_address}
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      </FormControl>
                    )}
                  ></Controller>
                </Grid>
                <Grid item md={4} xs={6}>
                  <Controller
                    name="aadhar"
                    control={control}
                    defaultValue={userDetails.aadhar}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          label="Aadhar"
                          id="aadhar"
                          size="small"
                          required
                          defaultValue={userDetails.aadhar}
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      </FormControl>
                    )}
                  ></Controller>
                </Grid>
                <Grid item md={4} xs={6}>
                  <Controller
                    name="pan"
                    control={control}
                    defaultValue={userDetails.pan}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          label="PAN"
                          id="pan"
                          size="small"
                          required
                          defaultValue={userDetails.pan}
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
              {/* ##### business details ##### */}
              <Box className="mt-4 mb-3">
                <Box
                  sx={{
                    pl: 2,
                  }}
                >
                  <PurpleOutline onClick={handleBusinessInfo}>
                    {!showBusinessInfo ? (
                      <AddCircleOutlineOutlinedIcon className="me-1" />
                    ) : (
                      <RemoveCircleOutlineRoundedIcon className="me-1" />
                    )}
                    Business Information
                  </PurpleOutline>
                </Box>

                {showBusinessInfo ? (
                  <Grid container sx={{ pt: 1, m: 0 }}>
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="establishment b"
                        control={control}
                        defaultValue={userDetails.establishment}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Establishment"
                              id="establishment"
                              size="small"
                              required
                              defaultValue={userDetails?.establishment}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                        rules={{ required: "First name required" }}
                      />
                    </Grid>
                    {/* <Grid item md={4} xs={6}>
                      <Controller
                        name="bname"
                        control={control}
                        defaultValue={userDetails.name}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Business Name"
                              id="bname"
                              size="small"
                              required
                              defaultValue={userDetails.name}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid> */}
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="b_address"
                        control={control}
                        defaultValue={userDetails?.b_address}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Address"
                              id="b_address"
                              size="small"
                              required
                              defaultValue={userDetails?.b_address}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="state"
                        control={control}
                        defaultValue={userDetails?.state}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="State"
                              id="state"
                              size="small"
                              required
                              defaultValue={userDetails?.state}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="district"
                        control={control}
                        defaultValue={userDetails?.district}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="District"
                              id="district"
                              size="small"
                              required
                              defaultValue={userDetails?.district}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="pincode"
                        control={control}
                        defaultValue={userDetails?.pincode}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Pincode"
                              id="pincode"
                              size="small"
                              required
                              defaultValue={userDetails?.pincode}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    {/* <Grid item md={4} xs={6}>
                      <Controller
                        name="pan"
                        control={control}
                        defaultValue={userDetails.pan}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="PAN"
                              id="pan"
                              size="small"
                              required
                              defaultValue={userDetails.pan}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid> */}
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="gstin"
                        control={control}
                        defaultValue={userDetails?.gstin}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="GSTIN"
                              id="gstin"
                              size="small"
                              required
                              defaultValue={userDetails?.gstin}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="mpin_retries"
                        control={control}
                        defaultValue={userDetails?.mpin_retries}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="MPIN Retries"
                              id="mpin_retries"
                              size="small"
                              required
                              defaultValue={userDetails?.mpin_retries}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="role"
                        control={control}
                        defaultValue={
                          userDetails?.role && userDetails?.role === "Ret"
                            ? "RETAILER"
                            : userDetails?.role && userDetails?.role === "Ad"
                            ? "AREA DISTRIBUTER"
                            : userDetails?.role && userDetails?.role === "Api"
                            ? "CORPORATES"
                            : userDetails?.role && userDetails?.role === "Asm"
                            ? "SALES MANAGER"
                            : userDetails?.role && userDetails?.role === "Dd"
                            ? "DIRECT DEALER"
                            : ""
                        }
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Role"
                              id="role"
                              size="small"
                              required
                              defaultValue={
                                userDetails?.role && userDetails?.role === "Ret"
                                  ? "RETAILER"
                                  : userDetails?.role &&
                                    userDetails?.role === "Ad"
                                  ? "AREA DISTRIBUTER"
                                  : userDetails?.role &&
                                    userDetails?.role === "Api"
                                  ? "CORPORATES"
                                  : userDetails?.role &&
                                    userDetails?.role === "Asm"
                                  ? "SALES MANAGER"
                                  : userDetails?.role &&
                                    userDetails?.role === "Dd"
                                  ? "DIRECT DEALER"
                                  : ""
                              }
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    {/* <Grid item md={4} xs={6}>
                      <Controller
                        name="parent"
                        control={control}
                        defaultValue={userDetails?.parent}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Parent"
                              id="parent"
                              size="small"
                              required
                              defaultValue={userDetails?.parent}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid> */}
                    <Grid item md={4} xs={6}>
                      <CommonSearchField
                        label="Change Parent"
                        placeholder="Parent"
                        list={adArray}
                        labelKey="name"
                        valKey="id"
                        valueGetter={setAdSearchVal}
                        defaultVal={userDetails?.parent}
                      />
                    </Grid>
                    {/* <Grid item md={4} xs={6}>
                      <Controller
                        name="asm"
                        control={control}
                        defaultValue={userDetails.asm}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="ASM"
                              id="asm"
                              size="small"
                              required
                              defaultValue={userDetails.asm}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid> */}
                    <Grid item md={4} xs={6}>
                      <CommonSearchField
                        label=" Change ASM"
                        placeholder="ASM"
                        list={asmArray}
                        labelKey="name"
                        valKey="id"
                        valueGetter={setAsmSearchVal}
                        defaultVal={userDetails?.asm}
                        // asmArray={}
                      />
                    </Grid>
                    {/* <Grid item md={4} xs={6}>
                      <Controller
                        name="dmt_slab1"
                        control={control}
                        defaultValue={userDetails?.dmt_slab1}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="DMT slab1"
                              id="dmt_slab1"
                              size="small"
                              required
                              defaultValue={userDetails?.dmt_slab1}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid> */}
                    {/* <Grid item md={4} xs={6}>
                      <Controller
                        name="dmt_slab2"
                        control={control}
                        defaultValue={userDetails?.dmt_slab2}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="DMT slab2"
                              id="dmt_slab2"
                              size="small"
                              required
                              defaultValue={userDetails?.dmt_slab2}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid> */}
                  </Grid>
                ) : null}
              </Box>
              {/* ##### Bank details ##### */}
              <Box className="mt-3 mb-3">
                <Box sx={{ pl: 2 }}>
                  <PurpleOutline onClick={handleBankInfo}>
                    {!showBankInfo ? (
                      <AddCircleOutlineOutlinedIcon className="me-1" />
                    ) : (
                      <RemoveCircleOutlineRoundedIcon className="me-1" />
                    )}
                    Bank Information
                  </PurpleOutline>
                </Box>
                {showBankInfo ? (
                  <Grid container sx={{ pt: 1 }}>
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="acc_name"
                        control={control}
                        defaultValue={userDetails.acc_name}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Account Name"
                              id="acc_name"
                              size="small"
                              required
                              defaultValue={userDetails.acc_name}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <BankSearch
                        fromProfile={true}
                        label="Bank Name"
                        endpt={ApiEndpoints.GET_BANK_DMR}
                        bankObj={(bank) => {
                          setbankObjCallBack(bank);
                        }}
                        ifscObj={(ifsc) => {
                          setbankSearchIfsc(ifsc);
                        }}
                      />
                      {/* <Controller
                        name="bank"
                        control={control}
                        defaultValue={userDetails.bank}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Bank Name"
                              id="bank"
                              size="small"
                              required
                              defaultValue={userDetails.bank}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller> */}
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="acc_number"
                        control={control}
                        defaultValue={userDetails.acc_number}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Account number"
                              id="acc_number"
                              size="small"
                              required
                              defaultValue={userDetails.acc_number}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          label="IFSC Code"
                          id="ifsc"
                          size="small"
                          required
                          // defaultValue={
                          //   bankSearchIfsc
                          //     ? bankSearchIfsc
                          //     : userDetails.ifsc
                          // }
                          value={
                            bankSearchIfsc ? bankSearchIfsc : userDetails.ifsc
                          }
                          onChange={(e) => setbankSearchIfsc(e.target.value)}
                          focused={bankSearchIfsc}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Controller
                        name="is_acc_verified"
                        control={control}
                        defaultValue={userDetails.is_acc_verified}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Account Verified"
                              id="is_acc_verified"
                              size="small"
                              required
                              select
                              defaultValue={userDetails.is_acc_verified}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            >
                              <MenuItem value="0">In-Active</MenuItem>
                              <MenuItem value="1">Active</MenuItem>
                            </TextField>
                          </FormControl>
                        )}
                      ></Controller>
                      {/* <ActiveInActiveTextFied
                        defaultVal={userDetails.is_acc_verified}
                        lable="Is Account Verified"
                        onChangeValue={(e) => {
                          setIsAccVerified(e.target.value);
                        }}
                      /> */}
                    </Grid>
                  </Grid>
                ) : null}
              </Box>
              {/* ##### Other details ##### */}
              <Box className="mt-3 mb-3">
                <Box sx={{ pl: 2 }}>
                  <PurpleOutline onClick={handleOtherInfo}>
                    {!showOtherInfo ? (
                      <AddCircleOutlineOutlinedIcon className="me-1" />
                    ) : (
                      <RemoveCircleOutlineRoundedIcon className="me-1" />
                    )}
                    Other Information
                  </PurpleOutline>
                </Box>
                {showOtherInfo ? (
                  <Grid container sx={{ pt: 1 }}>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="hitback"
                        control={control}
                        defaultValue={userDetails.hitback}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Callback"
                              id="hitback"
                              size="small"
                              required
                              defaultValue={userDetails.hitBack}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                      {/* <FormControl sx={{ width: "100%" }}>
                        <TextField
                          label="Callback"
                          id="callback"
                          size="small"
                          required
                          defaultValue={userDetails.hitBack}
                          onChange={(e) => {
                            checkHitbackValid(e.target.value);
                          }}
                          error={!isCbValid}
                          helperText={!isCbValid && "Enter a valid URL"}
                        />
                      </FormControl> */}
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="ip"
                        control={control}
                        defaultValue={userDetails.ip}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="IP"
                              id="ip"
                              size="small"
                              required
                              defaultValue={userDetails.ip}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="hold"
                        control={control}
                        defaultValue={userDetails.hold}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Hold"
                              id="hold"
                              size="small"
                              required
                              defaultValue={userDetails.hold}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="matm_serial"
                        control={control}
                        defaultValue={userDetails?.matm_serial}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="MATM Serial"
                              id="matm_serial"
                              size="small"
                              required
                              defaultValue={userDetails?.matm_serial}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="payout_limit"
                        control={control}
                        defaultValue={userDetails?.payout_limit}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Payout limit"
                              id="payout_limit"
                              size="small"
                              required
                              defaultValue={userDetails?.payout_limit}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              type="number"
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="type"
                        control={control}
                        defaultValue={userDetails?.type}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="User Type"
                              id="type"
                              size="small"
                              select
                              defaultValue={userDetails?.type}
                              value={bcDropdown}
                              onChange={(e) => setBcDropDown(e.target.value)}
                              // error={!!error}
                              // helperText={error ? error.message : null}
                            >
                              <MenuItem value="BC">BC</MenuItem>
                              <MenuItem value="NONBC">NON-BC</MenuItem>
                            </TextField>
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Mount visible={bcDropdown === "BC"}>
                      <Grid item md={3} xs={6}>
                        <Controller
                          name="bc_rate"
                          control={control}
                          defaultValue={userDetails?.bc_rate}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <FormControl sx={{ width: "100%" }}>
                              <TextField
                                label="BC Rate"
                                id="bc_rate"
                                size="small"
                                defaultValue={userDetails?.bc_rate}
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                type="number"
                                helperText={error ? error.message : null}
                              />
                            </FormControl>
                          )}
                        ></Controller>
                      </Grid>
                    </Mount>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="csp"
                        control={control}
                        defaultValue={userDetails?.csp}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="Nepal CSP Code"
                              id="csp"
                              size="small"
                              defaultValue={userDetails?.csp}
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          </FormControl>
                        )}
                      ></Controller>
                    </Grid>

                    {/* here */}
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="irctc"
                        control={control}
                        defaultValue={userDetails?.csp}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              label="IRCTC login id"
                              id="irctc"
                              size="small"
                              defaultValue={userDetails?.irctc}
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
                ) : null}
              </Box>
              {/* ##### Security details ##### */}

              <Box sx={{ pl: 2 }}>
                <PurpleOutline onClick={handleSecurityInfo}>
                  {!securityInfo ? (
                    <AddCircleOutlineOutlinedIcon className="me-1" />
                  ) : (
                    <RemoveCircleOutlineRoundedIcon className="me-1" />
                  )}
                  Security Information
                </PurpleOutline>
              </Box>
              {securityInfo ? (
                <Grid container sx={{ pt: 1 }}>
                  <Grid item md={4} xs={6}>
                    <Controller
                      name="two_factor"
                      control={control}
                      defaultValue={userDetails.two_factor}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            label="Login Type"
                            id="two_factor"
                            size="small"
                            required
                            defaultValue={userDetails.two_factor}
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
              ) : null}
              <ModalFooter form="edit-user" request={request} btn="Save User" />
            </Box>
          </Box>
        )}
      </Modal>
    </Box>
  );
};
export default ViewUserModal;
