/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Box,
  // CircularProgress,
  FormControl,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

import useDebounce from "../utils/Debounce";
// import Spinner from "../commons/Spinner";
import SpinnerMUI from "./SpinnerMUI";

const CommonSearchField = ({
  list,
  label,
  placeholder,
  labelKey,
  valKey,
  valueGetter,
  defaultVal = "",
  filterCardStyle = false,
  onFocus,
  loading = false,
}) => {
  // console.log("defaultVal", defaultVal);
  // console.log("list", list);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option[labelKey],
  });

  const [value, setValue] = useState({ label: "", value: null });

  const debouncedValue = useDebounce(value?.label, 500);
  // console.log("debouncedValue", debouncedValue);

  const [searchResult, setSearchResult] = useState([]);

  // console.log("searchResult", searchResult);

  useEffect(() => {
    if (onFocus) onFocus();
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      // console.log("debounce call");
      if (list && list.length > 0) {
        // console.log("bankList passed");
        if (debouncedValue) {
          // console.log(`debounced value found ${debouncedValue}`);
          const arr =
            list &&
            list
              .filter((item) => {
                // console.log("filter=>", bank.name);
                return (
                  item &&
                  item.name &&
                  item.name
                    .toLowerCase()
                    .includes(debouncedValue && debouncedValue.toLowerCase())
                );
              })
              .map((item) => {
                // console.log("bank=>", bank);
                return { id: item.id, name: item.name };
              });
          // console.log(`match found=>`, JSON.stringify(arr));
          setSearchResult(arr);
        } else {
          setSearchResult(list);
        }
      }
    }
  }, [debouncedValue]);

  const handleChange = (e) => {
    if (e.target.value) {
      setValue({ ...value, label: e.target.value, value: e.target.value });
      valueGetter({ ...value, label: e.target.value, value: e.target.value });
    } else {
      setValue({ label: "", value: null });
      valueGetter({ label: "", value: null });
    }
  };

  return (
    <div className="position-relative">
      <div
        style={{
          position: "absolute",
          right: "10px",
          top: "-3px",
          fontSize: "13px",
          fontWeight: "600",
        }}
        hidden={defaultVal === "" || defaultVal === null}
      >
        {`${placeholder}`}: {defaultVal ? defaultVal : ""}
      </div>
      <FormControl
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        {list && (
          <Autocomplete
            loading={loading}
            filterOptions={filterOptions}
            className={filterCardStyle ? "filter-autocomplete" : ""}
            id="search_particular"
            freeSolo
            size="small"
            options={
              list.length < 100 ? list : searchResult ? searchResult : ""
            }
            sx={{
              width: "100%",
              fontFamily: "Poppins",
              fontSize: "13px",
            }}
            value={value}
            onChange={(event, newValue) => {
              if (newValue) {
                setValue({
                  ...value,
                  label: newValue[labelKey],
                  value: newValue[valKey],
                });
                valueGetter({
                  ...value,
                  label: newValue[labelKey],
                  value: newValue[valKey],
                });
              } else {
                setValue({ label: "", value: null });
                valueGetter({ label: "", value: null });
                // valueGetter(null);
              }
            }}
            // THIS IS JUST TO SHOW THE TEXT IN THE FIELD AS WE ARE USING THE VALUE HOOK AS A OBJECT THAT CANT BE RENDERED
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{
                  "& > img": { mr: 2, flexShrink: 0 },
                  fontSize: "12px",
                }}
                {...props}
              >
                <Typography>{option[labelKey]}</Typography>
              </Box>
            )}
            //  END OF TEXT RENDER
            renderInput={(params) => (
              <FormControl fullWidth>
                {/* <Spinner loading={loading} size="small" /> */}
                <TextField
                  {...params}
                  size="small"
                  variant={filterCardStyle ? "standard" : "outlined"}
                  multiline
                  label={label}
                  // DONT USE ONfOCUS
                  // onFocus={onFocus}
                  placeholder={placeholder}
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "13px",
                  }}
                  maxRows={5}
                  value={value}
                  onChange={handleChange}
                  // this InputProps is just for loading
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <SpinnerMUI loading={loading} params={params} />
                    ),
                    //  (
                    //   <React.Fragment>
                    //     {loading ? (
                    //       <CircularProgress color="inherit" size={20} />
                    //     ) : null}
                    //     {params.InputProps.endAdornment}
                    //   </React.Fragment>
                    // ),
                  }}
                />
              </FormControl>
            )}
            clearIcon={
              <BackspaceIcon
                sx={{ fontSize: "15px", ml: 0 }}
                onClick={() => {
                  setValue({ label: "", value: null });
                }}
              />
            }
          />
        )}
      </FormControl>
    </div>
  );
};

export default CommonSearchField;
