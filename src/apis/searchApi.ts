import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token:
      "pk.eyJ1IjoiZWR5am9lbCIsImEiOiJjbGM5cWJuMTYydXM2M3Fsa2Q1Y2Q4ZWtpIn0.SP0EcK9E_bdBhM7QvAUyug",
  },
});

export default searchApi;