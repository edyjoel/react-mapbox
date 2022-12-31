//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { useContext, useEffect, useReducer } from "react";
import { PlacesContext } from "../";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers?: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers?.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `<h6>${place.text_es}</h6><p>${place.place_name_es}</p>`
      );

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    dispatch({
      type: "setMarkers",
      payload: newMarkers,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(
      "<h1>My Location</h1><p>En algun lugar</p>"
    );

    new Marker({
      color: "#61DAFB",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({
      type: "setMap",
      payload: map,
    });
  };

  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {

    const resp = await directionsApi.get<DirectionsResponse>(`${start.join(',')};${end.join(',')}`);
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;

    let kms = distance / 1000;
      kms = Math.round(kms * 100);
      kms = kms / 100;

    let minutes = Math.floor(duration / 60);
    console.log({kms, minutes});

    const bounds = new LngLatBounds(
      start,
      start
    );

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 100,
    });

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    }

    if(state.map?.getLayer("RouteString")) {
      state.map?.removeLayer("RouteString");
      state.map?.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourceData);

    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#61DAFB",
        "line-width": 4,
      },
    });
  }

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
