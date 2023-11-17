import { Routes, Route } from "react-router";

import ProtectedRoute from "./hoc/ProtectedRoute";

import { useAppSelector } from "./redux/hooks/redux-hooks";
import { selectCurrentUser } from "./redux/users-slice";

import Main from "./pages/Main/Main";
import CountryDetail from "./pages/CountryDetail/CountryDetail";
import MyCountries from "./pages/MyCountries/MyCountries";

import Layout from "./components/Layout/Layout";

import "./App.scss";

function App() {
  const user = useAppSelector(selectCurrentUser);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/details" element={<CountryDetail />} />

          <Route
            path="/my-countries"
            element={
              <ProtectedRoute role={user} to="/">
                <MyCountries />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
