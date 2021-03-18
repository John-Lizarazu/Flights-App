import React from "react";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
//This component is used to search and retrieve the data the user is requesting
//using material-ui to add features
export default function SearchInfo({ handleFlightOptions }) {
    return (
        <Tooltip title="Search">
            <Button variant="contained" color="default" onClick={handleFlightOptions} style={{ marginBottom: "1.5rem", marginTop:"1.5rem"}}>
                Search
            </Button>
        </Tooltip>
    )
}