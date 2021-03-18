import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//using material-ui to better format and display the date
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
//This component connects with the API and sets its value
export default function OutboundInfo ({
    outboundDate, handleOutboundChange,
}) {
    const outboundclass = useStyles();

    return (
        <form className={outboundclass.container} noValidate>
            <TextField
                style={{width: "100%"}}
                label="Outbound Date"
                id="date"
                type="date"
                value={outboundDate}
                onChange={(e) => handleOutboundChange(e.target.value)}
                className={outboundclass.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    )
}