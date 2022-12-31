import { BtnMyLocation, ReactLogo, MapView, SearchBar } from "../components"

export const HomeScreen = () => {
  return (
    <div>
      <MapView />
      <BtnMyLocation />
      <ReactLogo />
      <SearchBar />
    </div>
  )
}
