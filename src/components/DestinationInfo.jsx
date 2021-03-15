import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

export default function DestinationInfo({ country,currency}) {
    const [ destinationCountry, setDestinationCountry] = useState("");
    const [ destinationCity, setDestinationCity] = useState("");

}

useEffect(() => {
    const fetch = async () => {
        const country = country.filter(
            (item) => item.name === destinationCountry
        );

        if (
            destinationCity.length >=2 &&
            country.length > 0 
        ){
            const {data} = await axios.get(
                `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${country[0].Code}/${currency}/en-US/`,
                {
                    params: { query:destinationCity },
                    headers: {
                        "x-rapidapi-key":process.env.API_REACT_KEY,
                        "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    },
                }
            );
            console.log(data);
        }
    }
})