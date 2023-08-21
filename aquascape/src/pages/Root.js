import React from "react";
import { Outlet } from "react-router-dom";
import SidebarWithHeader from "../components/header/header";

const Root = () => {
    return (
        <SidebarWithHeader>
          <Outlet /> {/* This will render child routes, replacing the feed */}
        </SidebarWithHeader>
    );
}

export default Root;
