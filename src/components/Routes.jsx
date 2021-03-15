import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, Typography, CardContent, CardActions} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth:250,
    },
    bullet:{
        display:"inline-block",
        margin: " 0 2px",
        transform: "scale(0.8",
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
    const routeclass=useStyles();

    const departureDateOutbound = new Date(route.OutboundLeg.DepartureDate);
    const departureDateInbound = new Date(route.InboundLeg.DepartureDate);
    const qouteDate = new Date ( route.QouteDateTime);
    const outboundCarriers = carriers.filter(
        (carr) => carr.CarrierId === Number(route.OutboundLeg.CarrierIds[0])
    )[0];
    const inboundCarrier = carriers.filter(
        (carr) => carr.CarrierId ===Number(route.InboundLeg.CarrierIds[0])
    )[0];
    const outboundPlaces = places.filter(
        (pl) =>pl.PlaceId ===route.OutboundLeg.OriginId
    )[0];
    const inboundPlaces = places.filter(
        (pl) => pl.PlaceId === route.OutboundLeg.DestinationId
    )[0];


    return(
        <Card className={routeclass.root} variant="outlined">
            <CardContent>
                <Typography
                    className={routeclass.title}
                    color="secondary"
                    gutterBottom
                >
                    {`Route #${route.QouteId}`}
                </Typography>
                <Typography className={routeclass.pos} color="secondary">
                    {`${route.Direct ? "Direct Flight" : "Non-direct Flight"}`}
                </Typography>
                <Typography variant="h5" component="h2">
                    Outbound
                </Typography>
                <Typography variant="body1" component="p">
                    <strong>Origin:</strong> {" "}
                    {outboundPlaces
                    ? `${outboundPlaces.Name} ${outboundPlaces.Type}`
                    : "Loading.."}
                    <br />
                </Typography>
                <Typography variant="body1" component="p">
                    <strong>Carrier: </strong>{" "}
                    {outboundCarriers ? `${outboundCarriers.Name}` 
                    : "Loading.."}
                    <br />
                </Typography>
                <Typography variant="body1" component="p">
                    <strong>Departure datee: </strong> {`${departureDateOutbound}`}
                    <br />
                </Typography>
                <Typography variant="h5" component="h2">
                    Inbound
                </Typography>
                <Typography variant="body1" component="p">
                    <strong>Destination: </strong> {" "}
                    {inboundPlaces
                    ? `${inboundPlaces.Name} ${inboundPlaces.Type}`
                    : "Loading.."}
                    <br />
                </Typography>
                <Typography variant="body1" component="p">
                    <strong>Carrier: </strong>{" "}
                    {inboundCarrier ? `${inboundCarrier.Name}` : "Loading..."}
                    <br />
                </Typography>
                <Typography variant="body1" component="p">
                    <strong>Departure date: </strong> {`${departureDateInbound}`}
                    <br />
                    <br />
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                    <strong>Qoute date: </strong> {`${qouteDate}`}
                </Typography>
            </CardContent>
            <CardActions>
                {cheap ? (
                    <Button
                        size="small"
                        variant="contained"
                        style={{ backgroundColor: "blue" , color: "white"}}>
                        {`Route min. price: ${Symbol} ${route.MinPrice}`}
                    </Button>
                ) : (
                    <Button size="small">{`Route min price: ${Symbol} ${route.MinPrice}`}</Button>
                )}
            </CardActions>
        </Card>
    );
}