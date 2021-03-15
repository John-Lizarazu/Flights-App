import React, { useState } from "react";
import Routes from "./Routes";
import { Grid, MenuItem, FormControl, Select} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin:theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function FormatRoutes({
    routes,currency,currencies,carriers,places,
}) {
    const classes = useStyles();

    const [sortBy, setSortBy] = useState(-1);

    let Symbol;
    if (currency.length > 0) {
        Symbol=currencies.filter((curr) => curr.Code === currency)[0].Symbol;
    } else {
        Symbol="";
    }

    if(sortBy === -1) {
        routes.sort((a,b) => (a.QuoteId > b.QuoteId ? 1 : -1));
    } else {
        routes.sort ((a, b) => (a.QuoteId < b.QuoteId ? 1 : -1));
    }

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
    

}