import React from "react";
import { logOut } from "../../../models/firebase/auth";


function Dashboard():JSX.Element {


    return(
        <>
            Dashboard

            <span onClick={logOut}>Logout</span>
        </>
    )
}

export default Dashboard;