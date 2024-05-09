import { useEffect, useState } from "react";
import Nave from "./Navy";
import List from "./List";
import "./App.css";
import supabase from "./Client";
import Authe from "./Auth";
import Signup from "./Signup";
import LanderPage from "./Lander";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const key = import.meta.env.VITE_ENCRYPT_KEY;
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LanderPage />} />
          <Route path="/login" element={<Authe />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/list"
            element={
              <>
                <List />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
