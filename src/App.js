import React , { useState, useEffect } from "react";
import CurrencyInfo from "./components/CurrencyInfo";
import DestinationInfo from "./components/DestinationInfo";
import OriginInfo from "./components/OriginInfo";
import Navbar from "./components/Navbar";
import {Button, Container} from "@material-ui/core";
import axios from "axios";

export default function App() {
  const [ countries, setCountries] = useState([]);
  const [ currencies, setCurrencies] = useState([]);
  const [ currency, setCurrency] = useState("");

  const fetchCurrencies = async () => {
    const { data } = await axios.get(
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies",
      {
        headers: {
          "x-rapidapi-key": process.env.API_REACT_KEY,
          "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        },
      }
    );

    console.log(data);
    setCurrencies(data.Currencies);
    };

    const fetchCountries = async () => {
      const { data } = await axios.get(
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/en-US",
        {
          headers: {
            "x-rapidapi=key": process.env.API_REACT_KEY,
            "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          },
        }
      );
      console.log(data);
      setCountries(data.Countries);
    };

    useEffect(()=> {
      fetchCurrencies();
      fetchCountries();
    }, []);
  
      return(
        <>
          <Navbar />
          <Container maxWidth="sm">
            <CurrencyInfo
              currency={currency}
              currencies={currencies}
              handleChange={(curr) => setCurrency(curr)}
            />
            <DestinationInfo currency={currency} countries = {countries} />
            <Button variant="contained" color="secondary">
              Search
            </Button>
          </Container>
        </>
      );
    
  
  
}