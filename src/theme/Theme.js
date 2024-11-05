import { Button, createTheme, styled } from "@mui/material";
import { primaryColor, getEnv, secondaryColor, getSecondaryColor } from "./setThemeColor";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#9f86c0",
    },
    secondary: {
      main: "#DC5F5F",
    },
    theme_green: {
      main: "#00BF78",
    },
  },
});

//buttons
export const PrimaryButton = styled(Button)(() => ({
  backgroundColor: primaryColor(),
  width: getEnv() === "MoneyOddr" ? "15rem" : "12rem",
  height: "3rem",
  "&:hover": {
    backgroundColor: primaryColor(),
  },
}));
export const SecondaryButton = styled(Button)(() => ({
  backgroundColor: getSecondaryColor(),
  width: "12rem",
  height: "3rem",
  "&:hover": {
    backgroundColor: getSecondaryColor(),
  },
}));

export const PurpleOutline = styled(Button)(({ theme }) => ({
  color: "#9f86c0",
  backgroundColor: "#fff",
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 16,
  paddingRight: 16,
  border: "1px dashed #314259",
  "&:hover": {
    backgroundColor: "#d6d6d6",
  },
}));
