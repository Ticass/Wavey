import React from "react";
import Feed from "../components/homefeed/feed";
import SidebarWithHeader from "../components/header/header";

const Layout = () => {
    return (
        <>
         <SidebarWithHeader>
         <Feed/>
         </SidebarWithHeader>

        </>


    )
}

export default Layout;