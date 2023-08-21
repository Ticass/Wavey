import React from "react";
import Feed from "../components/homefeed/feed";
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
