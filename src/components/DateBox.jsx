import React from "react";
import { Grid, FormControlLabel, Checkbox } from "@material-ui/core";

export default function DateBox ({anytime, handleCheck}) {
    return (
        <Grid container spacing={1} style={{ marginTop: "2rem"}}>
            <Grid className="a-flex" item form="maincomponent" xs>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={anytime}
                            onChange={handleCheck}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="View All Dates"
                />
            </Grid>
        </Grid>
    );
}