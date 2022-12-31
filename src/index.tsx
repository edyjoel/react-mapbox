import React from 'react';
import ReactDOM from 'react-dom/client';
import MapsApp from './MapsApp';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZWR5am9lbCIsImEiOiJjbGM5cWJuMTYydXM2M3Fsa2Q1Y2Q4ZWtpIn0.SP0EcK9E_bdBhM7QvAUyug';

if(!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
