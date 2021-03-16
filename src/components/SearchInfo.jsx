import React from "react";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

export default function SearchInfo({ handleFlightOptions }) {
    return (
        <Tooltip title="Search">
            <Button variant="contained" color="secondary" onClick={handleFlightOptions} style={{ marginBottom: "1.5rem", marginTop:"1.5rem"}}>
                Search
            </Button>
        </Tooltip>
    )
}