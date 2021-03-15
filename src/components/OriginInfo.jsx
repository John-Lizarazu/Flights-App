import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

export default function OriginInfo ({countries,currency,originPlace,handlePlaceChange,handlePlacesChange,}) {
    const [originPlaces, setOriginPlaces] = useState([]);
    const [originCity, setOriginCity] = useState("");
    const [originCountry, setOriginCountry] = useState("");

    useEffect(() => {
        const fetchPlaces = async () => {
          const country = countries.filter((item) => item.Name === originCountry);

          if (country.length > 0 && originCity.length >=2 && currency.length > 0) {
              const { data } = await axios.get(
                `https://skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/${currency}/en-US/`,
                {
                    params: { query: originCity},
                    headers: {
                        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                        "x-rapidapi-host": "skyscanner-flight-search-v1.p.rapidapi.com",
                    },
                }
              );
            
              setOriginPlaces(data.Places);
              handlePlacesChange(data.Places);
          }
        };

        fetchPlaces();
        // eslint-disable-next-line
    }, [originCountry,originCity,countries,currency]);

    return (

        <>
            <Grid container spacing={1}>
                <Grid className="a-flex" item form ="maincomponent" xs>
                    <TextField
                    style={{width:"100%"}}
                    label="From city"
                    margin="normal"
                    variant="outlined"
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value)}
                    />
                </Grid>
                <Grid className="a-flex" item form="maincomponent" xs>
                    <Autocomplete
                        options={countries.map((item) => item.Name)} 
                        onChange={(e) => setOriginCountry(e.target.innerHTML)}
                        value={originCountry}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="From Country"
                                margin="normal"
                                variant="outlined"
                            />
                        )}
                    />
                </Grid>
            </Grid>
            {originCity.length > 0 && originPlaces && originPlaces.length > 0 &&(
                <Grid className="a-flex" item form ="maincomponent" xs>
                    <Autocomplete
                    options={originPlaces.map((item) => item.PlaceName)}
                    onChange={(e) => handlePlaceChange(e.target.innerHTML)}
                    value={originPlace}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Origin Place"
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />
                </Grid>
            )}
      </>
    )
        
}
