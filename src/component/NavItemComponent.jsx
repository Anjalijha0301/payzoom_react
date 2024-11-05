import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SideBarContext from "../store/SideBarContext";
import { whiteColor } from "../theme/setThemeColor";
import { Box } from "@mui/material";

const NavItemComponent = ({
  item,
  open,
  index,
  setOpen,
  handleDrawerToggle,
  mobileOpen,
}) => {
  const sidebarCtx = useContext(SideBarContext);
  const setActiveIndex = sidebarCtx.setActiveIndex;
  const location = useLocation();
  const currentPath = location.pathname;
  let isCurrentActive = currentPath === item?.to;

  if (
    currentPath.includes("/admin/accountStatement") &&
    item?.to === "/admin/accounts"
  ) {
    isCurrentActive = true;
  } else if (
    currentPath.includes("/admin/bankStatement") &&
    item?.to === "/admin/banks"
  ) {
    isCurrentActive = true;
  }

  return (
    <div>
      <ListItem
        key={item.title}
        disablePadding
        sx={{
          display: "block",
          // "&:hover": {
          //   color: "#fff",
          //   "& .menu-title": {
          //     color: whiteColor(),
          //   },
          // },
        }}
        onClick={() => {
          setActiveIndex({
            index: index,
            subIndex: -1,
          });
          if (mobileOpen) {
            handleDrawerToggle();
          } else setOpen(false);
        }}
      >
        <NavLink
          to={item.to}
          key={item.to}
          target={item.title === "IRCTC" && "_blank"}
          style={({ isActive }) => {
            return {
              display: "block",
              margin: "0.2rem 0",
              color: isActive ? "#1e845a" : "black",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
              padding: open ? "0px 8px 0px 8px" : "0px 8px 0px 8px",
            };
          }}
        >
          <ListItemButton
            sx={{
              justifyContent: open ? "initial" : "center",
              // backgroundColor: isCurrentActive ? `${primaryLight()}90` : "",
              backgroundColor: isCurrentActive ? `#022e6b` : "",
              backdropFilter: isCurrentActive ? "blur(5px)" : "",
              border: isCurrentActive
                ? "1px solid rgba(159, 134, 192, 0.3)"
                : "",
              "&:hover": {
                backgroundColor: "red",
              },
              borderRadius: "4px",
              // boxShadow: isCurrentActive
              //   ? "0px 8px 37.5px rgba(55, 69, 87, 0.1)"
              //   : whiteColor(),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                mr: open ? 2 : "auto",
                justifyContent: "center",
              }}
            >
              {isCurrentActive ? (
                <img width="26px" src={item.icon} alt="" />
              ) : (
                <img width="26px" src={item.icon} alt="" />
              )}
            </Box>

            <ListItemText
              className="menu-title"
              primary={item.title}
              disableTypography
              sx={{
                opacity: open ? 1 : 0,
                color: isCurrentActive ? "#fff" : "#000",
                fontSize: "16px",
                fontStyle: "italic",
              }}
            />
          </ListItemButton>
        </NavLink>
      </ListItem>
    </div>
  );
};

export default NavItemComponent;
