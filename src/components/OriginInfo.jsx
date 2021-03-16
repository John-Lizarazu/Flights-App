import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

export default function OriginInfo ({
    countries,
    currency,
    originPlace,
    handleOriginPlaceChange,
    handleOriginPlacesChange,
  }) {
    
    const [originCity, setOriginCity] = useState("");
    const [originCountry, setOriginCountry] = useState("");
    const [originPlaces, setOriginPlaces] = useState([]);
  
    
    useEffect(() => {
     
      const fetchPlaces = async () => {
        
  
        
          const { data } = await axios.get(
              `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/${currency}/en-US/`,
            {
              params: { query: originCity },
              headers: {
                "x-rapidapi-key": process.env.API_REACT_KEY,
                "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
              },
            }
          );
  
         
          setOriginPlaces(data.Places);
          handleOriginPlacesChange(data.Places);
        }
      
  
      
      fetchPlaces();
      // eslint-disable-next-line
    }, [originCity, originCountry, currency, countries]);
  
    return (
      <>
        <Grid container spacing={1}>
          <Grid className="d-flex" item form="maincomponent" xs>
            <TextField
              style={{ width: "100%" }}
              label="Origin city"
              margin="normal"
              variant="outlined"
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
            />
          </Grid>
          <Grid className="d-flex" item form="maincomponent" xs>
            <Autocomplete
              freeSolo
              onChange={(e) => setOriginCountry(e.target.innerHTML)}
              value={originCountry}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Origin country"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
        {originCity.length > 0 && originPlaces && originPlaces.length > 0 && (
          <Grid className="d-flex" item form="maincomponent" xs>
            <Autocomplete
              freeSolo
              options={originPlaces.map((item) => item.PlaceName)}
              onChange={(e) => handleOriginPlaceChange(e.target.innerHTML)}
              value={originPlace}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select origin place"
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
  