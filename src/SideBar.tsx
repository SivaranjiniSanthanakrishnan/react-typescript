import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

import { type SideBarPropType, type UrlList } from "./types/Course";

export const SideBar = ({ toggleDrawer }: SideBarPropType): ReactNode => {
  const list: UrlList[] = [
    { menuName: "View User", url: "/" },
    { menuName: "Manage User", url: "/manage-user" },
  ];
  return (
    <>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => toggleDrawer(false)}>
        <br /> <br /> <br />
        <Divider />
        <List>
          {list.map((l, index) => (
            <Link to={l.url} style={{ textDecoration: "none", color: "black" }}>
              <ListItem key={l.menuName} disablePadding>
                <ListItemButton>
                  <ListItemText primary={l.menuName} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Box>
    </>
  );
};
