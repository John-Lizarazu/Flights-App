import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//This component will gather the inbound information from the user and set the api to retrieve what the user inputs
const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
}));

export default function InboundInfo ({
    InboundDate,handleInboundChange,
}) {
    const inboundclass = useStyles();

    return (
        <form className={inboundclass.container} noValidate>
            <TextField
                style={{width: "100%"}}
                id="date2"
                label="Inbound Date"
                type="date"
                value={InboundDate}
                onChange={(e) => handleInboundChange(e.target.value)}
                className={inboundclass.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    )
}