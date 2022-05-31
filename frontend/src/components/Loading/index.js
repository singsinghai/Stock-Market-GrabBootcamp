import React from "react";
import { GuardSpinner } from "react-spinners-kit";

export const Loading = ({ height }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height, margin: 'auto'}}>

            <GuardSpinner size={30} color="#686769" loading={true} />
            &nbsp;&nbsp;&nbsp;Data is loading...

        </div>
    )
}