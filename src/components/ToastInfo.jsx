import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


export default function ToastInfo ({ text, severity, open, handleClose }) {
    return(
        <Snackbar open={open} autoHideDuration={12000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    );
}