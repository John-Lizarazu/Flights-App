import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

// This component will capture the input from the user and will use the api to find and assign their destination place
export default function DestinationInfo({ countries,currency, destinationPlace,handlePlaceChange,handlePlacesChange,}) {
    const [ destinationCountry, setDestinationCountry] = useState("");
    const [ destinationCity, setDestinationCity] = useState("");
    const [ destinationPlaces, setDestinationPlaces] = useState([]);

    // fetching the api and assigning consts to certain data
  useEffect(() => {
        const fetchPlaces = async () => {
            const country = countries.filter(
                (item) => item.Name === destinationCountry
            );
                //This if statement is implied when everything is entered correctly 
            if (
                country.length > 0 &&
                destinationCity.length >= 2 &&
                currency.length > 0
            ) {

                //To implement your API key, just copy and paste it in between the quotation marks
                //DO NOT USE THE API KEY THAT IS ALREADY INPUTTED. switch it to your API key
                const { data } = await axios.get(
                `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/${currency}/en-US/`,
                {
                    params: { query: destinationCity },
                    headers: {
                        "x-rapidapi-key": "459b119038msh08814ff91df263ep16ed51jsn379cab344d53",
                        "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    },
                 }
                );
                setDestinationPlaces(data.Places);
                handlePlacesChange(data.Places);
         }
        };
        //call the function
        fetchPlaces();
        // eslint-disable-next-line
    }, [destinationCity, destinationCountry, currency, countries]);

  return (
        <>  
            <Grid container spacing={1}>
                <Grid className="d-flex" item form="maincomponent" xs>
                    <TextField
                        style={{ width: "100%" }}
                        label="Destination city/state"
                        margin="normal"
                        variant="outlined"
                        value={destinationCity}
                        onChange={(e) => setDestinationCity(e.target.value)}
                    />
                </Grid>
                <Grid className="d-flex" item form="maincomponent" xs>
                    <Autocomplete
                        freeSolo
                        options={countries.map((item) => item.Name)}
                        onChange={(e) => setDestinationCountry(e.target.innerHTML)}
                        value={destinationCountry}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Destination country"
                                margin="normal"
                                variant="outlined"
                            />
                        )}
                    />
                </Grid>
            </Grid>
            {destinationCity.length > 0 &&
                    destinationPlaces &&
                    destinationPlaces.length > 0 && (
                        <Grid className="d-flex" item form="maincomponent" xs>
                                <Autocomplete
                                    freeSolo
                                    options={destinationPlaces.map((item) => item.PlaceName)}
                                    onChange={(e) => handlePlaceChange(e.target.innerHTML)}
                                    value={destinationPlace.name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select destination place"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    )}
                                />
                        </Grid>
                    )}
        </>
  );
}