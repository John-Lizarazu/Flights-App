import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Routes from "./Routes";
import { Grid, MenuItem, FormControl, Select, InputLabel} from "@material-ui/core";

//This component will give the routes a cetrain format to be better organized 
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin:theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
    //this is what functions the sorting and displaying the routes
export default function FormatRoutes({
    routes,currency,currencies,carriers,places,
}) {
    const classes = useStyles();

    const [sortBy, setSortBy] = useState(-1);
    //retrieves the money symbol
    let Symbol;
    if (currency.length > 0) {
        Symbol=currencies.filter((curr) => curr.Code === currency)[0].Symbol;
    } else {
        Symbol="";
    }
    //This sort dropdown makes it either ascending or descending
    if(sortBy === -1) {
        routes.sort((a,b) => (a.QuoteId > b.QuoteId ? 1 : -1));
    } else {
        routes.sort ((a, b) => (a.QuoteId < b.QuoteId ? 1 : -1));
    }
    //Sorts the routes in ascending order
    const sortedList = [...routes].sort((a, b) =>
        a.QuoteId > b.QuoteId ? 1 : -1 
    );

    // To find the cheap route we would have to compare their lengths using if statements
    let cheap;
    if (sortedList.length >=3) {
        cheap = [
            sortedList[0].MinPrice,
            sortedList[1].MinPrice,
            sortedList[2].MinPrice
        ];
    } else if (sortedList.length >=2){
        cheap=[sortedList[0].MinPrice, sortedList[1].MinPrice];
    } else if (sortedList.length >=1) {
        cheap= [sortedList[0].MinPrice];
    }

    return (
        <>
            <Grid container justify="center" style={{marginBottom: "2rem"}}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <MenuItem value={-1}>Price low to high</MenuItem>
                        <MenuItem value={1}>Price high to low</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid container justify="center" spacing={4}>
                {routes.map((route) => (
                    <Grid item key={route.QuoteId} xs={12} sm={6} md={4}>
                        <Routes
                            route={route}
                            Symbol={Symbol}
                            carriers={carriers}
                            places={places}
                            cheap={true ? cheap.includes(route.MinPrice) : false}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );

}