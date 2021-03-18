import React from "react";
import { Toolbar, Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//This component is for the nav bar and displays the Title of the Web.App

//using material-ui styles to adjust the nav bar
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
//Setting the navbar and implementing the title
export default function Navbar() {
    const navclass = useStyles();

    return(
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h5" align='center' className={navclass.title}>
                    Find Flights
                </Typography>
            </Toolbar>
        </AppBar>
    );
}