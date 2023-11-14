import { Routes, Route } from "react-router";

import Main from "./pages/Main/Main";
import CountryDetail from "./pages/CountryDetail/CountryDetail";
import MyCountries from "./pages/MyCountries/MyCountries";

import Layout from "./components/Layout/Layout";

import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/details" element={<CountryDetail />} />
          <Route path="/my-countries" element={<MyCountries />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
