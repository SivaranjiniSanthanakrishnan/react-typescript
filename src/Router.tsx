import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import ManageUser from "./ManageUser";

export default function ReactRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/manage-user/:id" element={<ManageUser />} />
            <Route path="/manage-user" element={<ManageUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
