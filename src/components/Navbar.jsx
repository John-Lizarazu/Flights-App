import React from "react";
import { Toolbar, Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root:{
        FlexGrow:2,
    },
    menuButton:{
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

export default function Navbar() {
    const navclass = useStyles();

    return(
        <AppBar position="static" color="secondary">
            <Toolbar>
                <Typography variant="h5" className={navclass.title}>
                    Find Flights
                </Typography>
            </Toolbar>
        </AppBar>
    );
}