import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export default function CurrencyInfo ({
    Currencies,
    Currency,
    handleChange
}) {
    return(
        <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    )
}