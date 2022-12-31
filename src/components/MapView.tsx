import { MapContext, PlacesContext } from "../context"
import { useContext, useLayoutEffect, useRef } from "react"
import { Loading } from "./Loading"
import { Map } from "mapbox-gl"

export const MapView = () => {

  const {isLoading, userLocation} = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if(!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: "mapbox://styles/mapbox/light-v10",
        center: userLocation as [number, number],
        zoom: 14
      });

      setMap(map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, userLocation])

  if(isLoading) {
    return (<Loading />)
  }

  return (
    <div ref={mapDiv}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0
      }}
    >
    </div>
  )
}
