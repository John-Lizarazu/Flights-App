import React from "react";
import { Alert } from "@material-ui/lab";

export default function WarningMessage() {
    return (
        <Alert severity="warning">
            Nothing to display at the moment! 
            Double check your information for any mistakes.
        </Alert>
    );
}