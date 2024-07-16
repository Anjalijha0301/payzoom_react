/* eslint-disable react-hooks/exhaustive-deps */
import { TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useDebounce from "../utils/Debounce";
import ApiEndpoints from "../network/ApiEndPoints";
import Autocomplete from "@mui/material/Autocomplete";
import { get } from "../network/ApiController";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { apiErrorToast } from "../utils/ToastUtil";

const OperatorSearch = ({
  className = "",
  obj,
  endpt = ApiEndpoints.GET_OPERATOR,
  label = "",
  placeholder = "",
  size = "small",
  variant = "outlined",
  inputRef,
}) => {
  const [value, setValue] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [operatorList, setOperatorList] = React.useState([]);
  const debouncedValue = useDebounce(value, 500);
  const getOperator = () => {
    get(
      endpt,
      "",
      null,
      (res) => {
        setOperatorList(res.data.data);
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };
  useEffect(() => {
    getOperator();
    return () => {};
  }, []);

  const handleChange = (e) => {
    if (e.target.value) {
      setValue(e.target.value);
    } else {
      setValue(e.target.value);
      setSearchResult([]);
    }
  };

  useEffect(() => {
    if (debouncedValue && typeof debouncedValue !== "object") {
      console.log("debounce call");
      if (operatorList && operatorList.length > 0) {
        console.log("operatorList passed");
        if (debouncedValue) {
          console.log(`debounced value found ${debouncedValue}`);
          const arr =
            operatorList &&
            operatorList
              .filter((operator) => {
                // console.log("filter=>", operator.name);
                return (
                  operator &&
                  operator.name &&
                  operator.name
                    .toLowerCase()
                    .includes(debouncedValue && debouncedValue?.toLowerCase())
                );
              })
              .map((operator) => {
                // console.log("operator=>", operator);
                return operator.name ? `${operator.name}` : `${operator.name}`;
              });
          // console.log(`match found=>`, JSON.stringify(arr));
          setSearchResult(arr);
        } else {
          setSearchResult(operatorList);
        }
      }
    }
  }, [debouncedValue]);

  return (
    <>
      {operatorList && (
        <Autocomplete
          className={className}
          id="search_particular"
          freeSolo
          size="small"
          options={searchResult ? searchResult : ""}
          value={value}
          sx={{
            width: "93.2%",
            fontFamily: "Poppins",
            fontSize: "13px",
          }}
          onChange={(event, newValue) => {
            if (operatorList && operatorList) {
              for (let i = 0; i < operatorList.length; i++) {
                const operator = operatorList[i];
                if (operator.name === newValue) {
                  if (obj) {
                    obj(operator);
                  }
                  break;
                }
              }
            }
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // className="filter-input"
              size={size}
              variant={variant}
              // multiline
              label={label ? label : ""}
              placeholder={placeholder ? placeholder : ""}
              sx={{
                fontFamily: "Poppins",
                fontSize: "13px",
              }}
              // maxRows={10}
              value={value}
              inputRef={inputRef}
              onChange={handleChange}
              required
            />
          )}
          clearIcon={
            <BackspaceIcon
              sx={{ fontSize: "15px", ml: 0 }}
              onClick={() => {
                setValue({ label: "", value: null });
                setSearchResult([]);
                if (obj) {
                  obj(null);
                }
              }}
            />
          }
        />
      )}
    </>
  );
};

export default OperatorSearch;
