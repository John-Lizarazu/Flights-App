import React from "react";
import { Grid, FormControlLabel, Checkbox } from "@material-ui/core";

export default function DateBox ({anytime, handleCheck}) {
    return (
        //create a grid to allow the users to view multiple dates from anytime or focus on their desired arrival and departure date
        <Grid container spacing={1} style={{ marginTop: "2rem"}}>
            <Grid className="a-flex" item form="maincomponent" xs>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={anytime}
                            onChange={handleCheck}
                            name="checkedB"
                            color="default"
                        />
                    }
                    label="View All Dates"
                />
            </Grid>
        </Grid>
    );
}