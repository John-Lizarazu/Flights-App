import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

export default function DestinationInfo({ countries,currency, destinationPlace,handlePlaceChange,handlePlacesChange,}) {
    const [ destinationCountry, setDestinationCountry] = useState("");
    const [ destinationCity, setDestinationCity] = useState("");
    const [ destinationPlaces, setDestinationPlaces] = useState([]);


  useEffect(() => {
        const fetchPlaces = async () => {
            const country = countries.filter(
                (item) => item.Name === destinationCountry
            );

            if (
                country.length > 0 &&
                destinationCity.length >= 2 &&
                currency.length > 0
            ) {
                const { data } = await axios.get(
                `https://skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/${currency}/en-US/`,
                {
                    params: { query: destinationCity },
                    headers: {
                    "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                    },
                }
            );
                setDestinationPlaces(data.Places);
                handlePlacesChange(data.Places);
            }
        };

        fetchPlaces();
    }, [destinationCity, destinationCountry, currency, countries]);

  return (
        <>
            <Grid container spacing={1}>
                <Grid className="d-flex" item form="maincomponent" xs>
                    <TextField
                        style={{ width: "100%" }}
                        label="Destination city"
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