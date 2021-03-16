import React from "react";
import { CircularProgress } from "@material-ui/core";

export default function Load() {
    return(
        <div style={{textAlign:"center"}}>
            <CircularProgress size={100} thickness={1.5} />
        </div>
    );
}