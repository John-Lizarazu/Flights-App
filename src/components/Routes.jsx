import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth:250,
    },
    bullet:{
        display:"inline-block",
        margin: " 0 2px",
    },
    title: { 
        fontSize: 12,
    },
    pos:{
        marginBottom:12,
    },
});

export default function Route({
    route,Symbol,carriers,places,cheap,
}) {
    const routeclass=useStyle();

    const departureDateOutbound = new Date(route.OutboundLeg.DepartureDate);
    const departureDateInbound = new Date(route.InboundLeg.DepartureDate);
    const qouteDate = new Date ( route.QouteDateTime);
    const outboundCarriers = carriers.filter(
        (carr) => carr.CarrierId === Number(route.OutboundLeg.CarrierIds[0])
    )[0];
    const outboundPlaces = places.filter(
        (pl) =>pl.PlaceId ===route.OutboundLeg.OriginId
    )[0];
    const inboundPlaces = places.filter(
        (pl) => pl.PlaceId === route.OutboundLeg.DestinationId
    )[0];
}