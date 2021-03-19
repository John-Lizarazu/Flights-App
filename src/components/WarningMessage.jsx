import React from "react";
import { Alert } from "@material-ui/lab";
//This component is used to display a warning message, letting the user know
//that they should input their data in order for the app to work
//using material-ui for alert functionality
export default function WarningMessage() {
    return (
        <Alert severity="info"> 
            Please fill out everything before searching.
        </Alert>
    );
}