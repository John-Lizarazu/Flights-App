import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export default function CurrencyInfo ({
    currencies,
    currency,
    handleChange
}) {
    return(
        <Grid container spacing={1}>
        <Grid className="grid-curr" item form="maincomponent" xs>
          <Autocomplete
          freesolo
          options={currencies.map((item) => item.Code)}
          onChange={(e) => handleChange(e.target.innerHTML)}
          value={currency}
          renderInput={(params)=> (
            <TextField
            {...params}
            label="Select the currency"
            margin="normal"
            variant="outlined"
            />
          )}
          />
        </Grid>
      </Grid>
    );
}