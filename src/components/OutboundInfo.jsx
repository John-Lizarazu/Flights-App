import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

export default function OutboundInfo ({
    outboundDate, handleOutboundChange,
}) {
    const outboundclass = useStyles();

    return (
        <form className={outboundclass.container} noValidate>
            <TextField
                style={{width: "100%"}}
                id="date"
                label="Outbound Date"
                type="date"
                value={outboundDate}
                onChange={(e) => handleOutboundChange(e.target.value)}
                className={outboundclass.textField}
                inputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    )
}