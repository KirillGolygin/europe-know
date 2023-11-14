import { Routes, Route } from "react-router";

import Main from "./pages/Main/Main";
import CountryDetail from "./pages/CountryDetail/CountryDetail";
import MyCountries from "./pages/MyCountries/MyCountries";

import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details" element={<CountryDetail />} />
        <Route path="/my-countries" element={<MyCountries />} />
      </Routes>
    </>
  );
}

export default App;
