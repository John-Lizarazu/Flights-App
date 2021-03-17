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

  const handleFlightOptions = async () => {
    if (!currency || !originPlace || !destinationPlace) {
      setToastText("Input required fields please")
      setToastSeverity("error");
      return setOpen(true);
    } else{
      if (!anytime && (!inboundDate || !outboundDate )) {
        setToastText(
          "Select the date from checkbox or enter the inbound date and outbound date!"
        );
        setToastSeverity("error");
        return setOpen(true);
      }
    }

    setLoading(true);

    const originPlaceId = originPlaces.filter(
      (place) => place.PlaceName === originPlace
    )[0].PlaceId;

    const destinationPlaceId = destinationPlaces.filter(
      (place) => place.PlaceName === destinationPlace
    )[0].PlaceId;


    let apiUrl = anytime
      ? `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/${currency}/en-US/${originPlaceId}/${destinationPlaceId}/anytime/anytime`
      : `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/${currency}/en-US/${originPlaceId}/${destinationPlaceId}/${outboundDate}/${inboundDate}`;

    const { data } = await axios.get(apiUrl, {
      headers: {
        "x-rapidapi-key": "459b119038msh08814ff91df263ep16ed51jsn379cab344d53",         
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      },
    });

    setRoutes (data.Quotes);
    setCarriers(data.Carriers);
    setPlaces(data.Places);
    setLoading(false);
    setToastText(`Successfullt fetched ${data.Quotes.length} routes!`);
    setToastSeverity("success");
    setOpen(data.Quotes.length > 0 && true);
  };

  useEffect(() => {
    const options = {
      headers: {
        "x-rapidapi-key":"459b119038msh08814ff91df263ep16ed51jsn379cab344d53",
        "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        },
    };
    

     const fetchCurrencies = async () => {
       const { data } = await axios.get(
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies",options
    
      );

       setCurrencies(data.Currencies);
     };

     const fetchCountries = async () => {
       const { data } = await axios.get(
           "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/en-US",options

         );
         setCountries(data.Countries);
     };
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