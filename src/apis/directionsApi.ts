import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: false,
    language: "es",
    access_token:
      "pk.eyJ1IjoiZWR5am9lbCIsImEiOiJjbGM5cWJuMTYydXM2M3Fsa2Q1Y2Q4ZWtpIn0.SP0EcK9E_bdBhM7QvAUyug",
  },
});

export default directionsApi;