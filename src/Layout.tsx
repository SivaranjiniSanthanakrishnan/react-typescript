import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box sx={{ backgroundColor: "#eaecee" }}>
      <Header />
      <Outlet />
    </Box>
  );
}
