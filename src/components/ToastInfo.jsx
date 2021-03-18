import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

//this component is used to show if the user has input or is miissing 
//input then this alert will pop up and will go away withn 12000 miliseconds
//using material-ui for its functionality
export default function ToastInfo ({ text, severity, open, handleClose }) {
    return(
        <Snackbar open={open} autoHideDuration={12000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    );
}