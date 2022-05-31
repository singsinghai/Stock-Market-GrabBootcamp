import React from "react";
import { GuardSpinner } from "react-spinners-kit";

export const Loading = ({ height, width }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height, width }}>

            <GuardSpinner size={30} color="#686769" loading={true} />
            &nbsp;&nbsp;&nbsp;Data is loading...

        </div>
    )
}