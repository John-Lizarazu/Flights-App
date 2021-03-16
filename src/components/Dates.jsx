import React from "react";
import { Grid } from "@material-ui/core";
import OutboundInfo from "./OutboundInfo";
import InboundInfo from "./InboundInfo";

export default function Dates ({
    outboundDate,handleOutboundChange,inboundDate,handleInboundChange,
}) {
    return (
        <Grid container spacing={1} style={{ marginTop: "2rem" }}>
            <Grid className ="a-flex" item form="maincomponent" xs>
                <OutboundInfo
                    outboundDate={outboundDate}
                    handleOutboundChange={handleOutboundChange}
                />
            </Grid>
            <Grid className="a-flex" item form="maincomponent" xs>
                <InboundInfo
                    inboundDate={inboundDate}
                    handleInboundChange={handleInboundChange}
                />
            </Grid>
        </Grid>
    );
}