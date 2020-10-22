import React, { useState } from "react";
import Weather from "./components/Weather";
import SearchBar from "./components/SearchBar";

function App() {
  const [city, setCity] = useState("London");

  const changeCity = (city) => {
    setCity(city);
  };

  return (
    <div className="App">
      <SearchBar city={city} changeCity={changeCity} />
      <Weather city={city} changeCity={changeCity} />
    </div>
  );
}

export default App;
