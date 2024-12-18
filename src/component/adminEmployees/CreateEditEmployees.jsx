/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";

import {
  FormControl,
  Grid,
  TextField,
  Button,
  Tooltip,
  IconButton,
  Modal,
  // MenuItem,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Spinner from "../../commons/Spinner";
import ModalHeader from "../../modals/ModalHeader";
import ModalFooter from "../../modals/ModalFooter";
// import { useState } from "react";
// import { patchJsonData, postJsonData } from "../../network/ApiController";
// import ApiEndpoints from "../../network/ApiEndPoints";
// import { apiErrorToast, okSuccessToast } from "../../utils/ToastUtil";
// import { useEffect } from "react";
import { whiteColor } from "../../theme/setThemeColor";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  handleChangeEmployees,
  resetDataEmployees,
  setEmployeesData,
  updateEmployee,
} from "../../features/allUsers/allUsersSlice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { yyyymmdd } from "../../utils/DateUtils";
import { PATTERNS } from "../../utils/ValidationUtil";

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

const CreateEditEmployees = ({ refresh, edit = false, row }) => {
  const [open, setOpen] = React.useState(false);
  const { employees, employeesLoading } = useSelector(
    (store) => store.allUsers
  );
  const {
    name,
    role,
    dob,
    basic_pay,
    hra,
    ta,
    bank,
    ifsc,
    acc_number,
    target,
    joining_date,
  } = employees;
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
    if (row) dispatch(setEmployeesData(row));
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(resetDataEmployees());
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeEmployees({ name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      try {
        // patch request
        await dispatch(
          updateEmployee({ ...employees, user_id: row?.id })
        ).unwrap();
        handleClose();
      } catch (error) {}
    } else {
      try {
        // post request
        await dispatch(addEmployee(employees)).unwrap();
        if (refresh) refresh();
        handleClose();
      } catch (error) {}
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      {" "}
      {edit ? (
        <Tooltip title="Edit Account">
          <IconButton onClick={handleOpen}>
            <Icon
              icon="basil:edit-solid"
              style={{ fontSize: "24px" }}
              className="refresh-icon-risk"
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add Account">
          <Button
            variant="outlined"
            // className="button-transparent"
            className="refresh-icon-risk"
            onClick={handleOpen}
            startIcon={
              <IconButton
                sx={{
                  p: 0,
                  color: whiteColor(),
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            }
            sx={{ py: 0.3 }}
          >
            Employee
          </Button>
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
            <Box
              sx={{
                height: { md: "max-content", sm: "70vh", xs: "70vh" },
                overflowY: "scroll",
              }}
            >
              <Spinner loading={employeesLoading} />
              <ModalHeader
                title={edit ? `Edit Employee` : `Create Employee`}
                handleClose={handleClose}
              />
              <Box
                component="form"
                id="employees"
                validate
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{
                  "& .MuiTextField-root": { m: 2 },
                }}
              >
                <Grid container sx={{ pt: 1 }}>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Name"
                        id="name"
                        name="name"
                        size="small"
                        required
                        value={name}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Joining Date"
                          value={joining_date}
                          onChange={(newValue) => {
                            dispatch(
                              handleChangeEmployees({
                                name: "joining_date",
                                value: yyyymmdd(newValue),
                              })
                            );
                          }}
                          renderInput={(params) => (
                            <TextField {...params} size="small" error={false} />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Role"
                        id="role"
                        name="role"
                        size="small"
                        required
                        value={role}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date of birth"
                          value={dob}
                          onChange={(newValue) => {
                            dispatch(
                              handleChangeEmployees({
                                name: "dob",
                                value: yyyymmdd(newValue),
                              })
                            );
                          }}
                          renderInput={(params) => (
                            <TextField {...params} size="small" error={false} />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Basic pay"
                        id="basic_pay"
                        name="basic_pay"
                        size="small"
                        type="number"
                        required
                        value={basic_pay}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="HRA"
                        id="hra"
                        name="hra"
                        type="number"
                        size="small"
                        required
                        value={hra}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="TA"
                        id="ta"
                        name="ta"
                        size="small"
                        type="number"
                        required
                        value={ta}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Target"
                        id="target"
                        name="target"
                        size="small"
                        type="number"
                        required
                        value={target}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Bank"
                        id="bank"
                        name="bank"
                        size="small"
                        required
                        value={bank}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="IFSC"
                        id="ifsc"
                        name="ifsc"
                        size="small"
                        required
                        value={ifsc}
                        onChange={handleChange}
                        // inputProps={{
                        //   pattern: "/^[A-Za-z]{4}[0-9a-zA-Z]{7}$/",
                        // }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        label="Account Number"
                        id="acc_number"
                        name="acc_number"
                        size="small"
                        required
                        value={acc_number}
                        onChange={handleChange}
                        // inputProps={{
                        //   pattern: `${PATTERNS.ACCOUNT_NUMBER}`,
                        // }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <ModalFooter
              form="employees"
              type="submit"
              btn="Submit"
              disable={employeesLoading}
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};
export default CreateEditEmployees;
