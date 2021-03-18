import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
//This component captures the inputs from the user and creates their origin info
export default function OriginInfo ({
    countries,
    currency,
    originPlace,
    handlePlaceChange,
    handlePlacesChange,
  }) {
    //State for storing user input and API data
    const [originCity, setOriginCity] = useState("");
    const [originCountry, setOriginCountry] = useState("");
    const [originPlaces, setOriginPlaces] = useState([]);
  
    
    useEffect(() => {
     //Fetch the places bases on user input
      const fetchPlaces = async () => {
        // the if statement is used to ensure that the user has entered everything correctly
        if(originCity.length >=2 && currency.length >0){

          //To implement your API key, just copy and paste it in between the quotation marks
          //DO NOT USE THE API KEY THAT IS ALREADY INPUTTED. switch it to your API key
          const { data } = await axios.get(
              `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/${currency}/en-US/`,
            {
              params: { query: originCity },
              headers: {
                "x-rapidapi-key": "459b119038msh08814ff91df263ep16ed51jsn379cab344d53",
                "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
              },
            }
          );
  
         //set states to places
          setOriginPlaces(data.Places);
          handlePlacesChange(data.Places);
        }
      };
  
      //call the function
      fetchPlaces();
      // eslint-disable-next-line
    }, [originCity, originCountry, currency, countries]);
  
    return (
      <>
        <Grid container spacing={1}>
          <Grid className="d-flex" item form="maincomponent" xs>
            <TextField
              style={{ width: "100%" }}
              label="Origin city/state"
              margin="normal"
              variant="outlined"
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
            />
          </Grid>
          <Grid className="d-flex" item form="maincomponent" xs>
            <Autocomplete
              freeSolo
              options={countries.map((item) => item.Name)}
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
              onChange={(e) => handlePlaceChange(e.target.innerHTML)}
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
  