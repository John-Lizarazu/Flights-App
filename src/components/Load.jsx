import React from "react";
import { CircularProgress } from "@material-ui/core";

//this component will show the user a loading circle while the api retrieves their results
export default function Load() {
    return(
        <div style={{textAlign:"center"}}>
            <CircularProgress size={100} thickness={1.5} />
        </div>
    );
}