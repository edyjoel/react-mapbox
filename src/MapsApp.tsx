import "./styles.css";
import { MapProvider, PlacesProvider } from "./context";
import { HomeScreen } from "./screens";

const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  );
};

export default MapsApp;
