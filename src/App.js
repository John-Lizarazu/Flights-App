import React , { useState, useEffect } from "react";
import CurrencyInfo from "./components/CurrencyInfo";
import DestinationInfo from "./components/DestinationInfo";
import Dates from "./components/Dates";
import DateBox from "./components/DateBox";
import SearchInfo from "./components/SearchInfo";
import FormatRoutes from "./components/FormatRoutes";
import OriginInfo from "./components/OriginInfo";
import ToastInfo from "./components/ToastInfo";
import WarningMessage from "./components/WarningMessage"
import Navbar from "./components/Navbar";
import {Container} from "@material-ui/core";
import Load from "./components/Load";
import axios from "axios";
import "./App.css";
//import all the components to app in order for everything to work properly
//this app is then used to run the web app and API
//main component
export default function App() {
  const [ countries, setCountries] = useState([]);
  const [ currencies, setCurrencies] = useState([]);
  const [loading, setLoading]=useState(false);
  const [ currency, setCurrency] = useState("");
  const [ Open, setOpen]=useState(false);
  const [ toastText, setToastText] =useState("");
  const [ toastSeverity, setToastSeverity]=useState("");
  const [ destinationPlace, setDestinationPlace] = useState("");
  const [ destinationPlaces, setDestinationPlaces]=useState([]);
  const [ outboundDate, setOutboundDate] = useState("");
  const [ inboundDate,setInboundDate]=useState("");
  const [ anytime, setAnytime]=useState(true);
  const [ originPlace, setOriginPlace] = useState("");
  const [ originPlaces, setOriginPlaces] = useState([]);
  const [ routes,setRoutes] = useState([]);
  const [ places, setPlaces] = useState([]);
  const [ carriers, setCarriers] = useState([]);
  //this app function will execute when the user clicks on the search button
  const handleFlightOptions = async () => {
    // This if-statement checks if the user has enetered the following correctly
    if (!currency || !originPlace || !destinationPlace) {
      setToastText("Input required fields please")
      setToastSeverity("error");
      return setOpen(true);
    } else{
      // This if-statement checks if the user has selected their dates correctly
      if (!anytime && (!inboundDate || !outboundDate )) {
        setToastText(
          "Select the date from checkbox or enter the inbound date and outbound date!"
        );
        setToastSeverity("error");
        return setOpen(true);
      }
    }
    //uses the load component and will show that it is retrieving the data
    setLoading(true);
    // Grab origin place ID
    const originPlaceId = originPlaces.filter(
      (place) => place.PlaceName === originPlace
    )[0].PlaceId;
      // Grab destination place ID 
    const destinationPlaceId = destinationPlaces.filter(
      (place) => place.PlaceName === destinationPlace
    )[0].PlaceId;

      //if user clicks to show all dates then it will show routes for anytime. If not then it will just focus on the users inbound/outbound date.
    let apiUrl = anytime
      ? `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/${currency}/en-US/${originPlaceId}/${destinationPlaceId}/anytime/anytime`
      : `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/${currency}/en-US/${originPlaceId}/${destinationPlaceId}/${outboundDate}/${inboundDate}`;
      //API request

      //To implement your API key, just copy and paste it in between the quotation marks
      //DO NOT USE THE API KEY THAT IS ALREADY INPUTTED. switch it to your API key
    const { data } = await axios.get(apiUrl, {
      headers: {
        "x-rapidapi-key": "459b119038msh08814ff91df263ep16ed51jsn379cab344d53",         
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      },
    });
    //setting states to data from the API and finish loading
    setRoutes (data.Quotes);
    setCarriers(data.Carriers);
    setPlaces(data.Places);
    setLoading(false);
    //Shows the user how many flights were found using toast
    setToastText(`Successfully fetched ${data.Quotes.length} routes!`);
    setToastSeverity("success");
    setOpen(data.Quotes.length > 0 && true);
  };
  //if everything is working fine then useEffect will work

      //To implement your API key, just copy and paste it in between the quotation marks
      //DO NOT USE THE API KEY THAT IS ALREADY INPUTTED. switch it to your API key
  useEffect(() => {
    const options = {
      headers: {
        "x-rapidapi-key":"459b119038msh08814ff91df263ep16ed51jsn379cab344d53",
        "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        },
    };
    
    // Get the currencies from the API 
     const fetchCurrencies = async () => {
       const { data } = await axios.get(
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies",options
    
      );
        //set the currencies
       setCurrencies(data.Currencies);
     };
     //Grab all country options from the API
     const fetchCountries = async () => {
       const { data } = await axios.get(
           "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/en-US",options
         );
         //set the countries
         setCountries(data.Countries);
     };
        //Run functions
        fetchCurrencies();
       fetchCountries();
   }, []);
  
  return(
    <>
      <Navbar />
      <Container maxWidth="md">
        <CurrencyInfo
          currency={currency}
          currencies={currencies}
          handleChange={(curr) => setCurrency(curr)}
        />
        <DestinationInfo 
          currency={currency} 
          countries = {countries}
          destinationPlace={destinationPlace}
          handlePlaceChange={(place) => setDestinationPlace(place)}
          handlePlacesChange={(places) => setDestinationPlaces(places)}
        />
        <OriginInfo
          currency={currency}
          countries={countries}
          originPlace={originPlace}
          handlePlaceChange={(place)=>setOriginPlace(place)}
          handlePlacesChange={(places)=>setOriginPlaces(places)}
        />
        <Dates
          outboundDate={outboundDate}
          handleOutboundChange={(date) => setOutboundDate(date)}
          inboundDate={inboundDate}
          handleInboundChange={(date) => setInboundDate(date)}
        />
        <DateBox
          anytime={anytime}
          handleCheck={(e) => setAnytime(e.target.checked)}
        />
        <SearchInfo handleFlightOptions={handleFlightOptions} />
        {loading ? (
          <Load />
        ) : routes.length >0 ? (
          <FormatRoutes
            routes={routes}
            currency={currency}
            currencies={currencies}
            carriers={carriers}
            places={places}
          />
        ) : (
          <WarningMessage />
        )}
        <ToastInfo
          severity={toastSeverity}
          text={toastText}
          open={Open}
          handleClose={(e,r) => {
            if(r === "clickaway"){
              return;
            }
            setOpen(false);
          }}
        />
      </Container>
    </>
  );

}