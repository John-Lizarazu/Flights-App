import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

export default function OriginInfo ({countries,currency}) {
    const [originPlace, setOriginPlace] = useState("");
    const [originPlaces, setOriginPlaces] = useState([]);
    const [originCity, setOriginCity] = useState("");
    const [originCountry, setOriginCountry] = useState("");

    useEffect(() => {
        const fetch = async () => {
          const country = countries.filter((item) => item.Name === originCountry);

          if (country.length > 0 && originCity.length >=2 && currency.length > 0) {
              const { data } = await axios.get(
                `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${country[0].Code}/${currency}/en-US/`,
                {
                    params: { query: originCity},
                    headers: {
                        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    },
                }
              );
          }
        
}})}
