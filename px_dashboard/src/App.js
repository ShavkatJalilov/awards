import "./App.css";

import { Link, Route, Routes } from "react-router-dom";

import { useState, useContext, useEffect } from "react";
import LoginUser from "./pages/Login/Login";
import UpdateContext, { userContext } from "./components/context/userContext";
import BazaAdmin from "./pages/BAZA-ADMIN/BazaAdmin";
import OptionInput from "./pages/Option/OptionInput";
import { BosIndex } from "./pages/BosBaza/bosIndex";
import Statistika from "./pages/Statistika/Statistika";
import Arxiv from "./pages/Arxiv/arxiv";
function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
    }, 1000 * 60 * 60 * 12);
    return () => clearTimeout(timer);
  }, []);

  const [states, useStates] = useState("");
  const [passwords, usePasswords] = useState("");
  const [PPxbaza, setPPXbaza] = useState(true);

  const [TokenPPS, setTokenPPS] = useState();
  const [tres, setTrues] = useState(0);
  const [CollepsOzgar, setCollepsOzgar] = useState();

  let NomRols = "";
  async function LogRend() {
   
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: states,
          password: passwords,
        }),
      });
      const data = await res.json();
      setTokenPPS(data.name);

      NomRols = data.roles;
      localStorage.setItem("Nom", data.roles);

      let dataIDpps = data.id;
      localStorage.setItem("idPPS", dataIDpps);
      let accessToken = data.token;

      localStorage.setItem("tokenPPS", accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  // loopga tushib   qolish hafi bor agar loopga tushib qolsa ifni ucirib tefada  tres useStateni 1 qilib qoy
  if (tres) {
    // useEffect(() => {
    LogRend();
    console.log("useEffect");
    // }, [tres]);
  }

  if (passwords && states) {
    LogRend();
  }
  const parol = localStorage.getItem("tokenPPS");

  let localName = localStorage.getItem("Nom");

  // parol &&  localName == "ADMIN"

  if (parol &&  localName == "ADMIN") {
    return (
      <>
        <Routes>
          <Route path='/' element={<BazaAdmin />} />
          <Route path='Arxiv' element={<Arxiv />} />
          <Route path='Statistika' element={<Statistika />} />
          <Route path='BazaAdmin' element={<BosIndex />} />
        </Routes>
      </>
    );
  }

  //   parol deb if ni shartiga qoyasan   kesa kiritadi.
  else if (parol) {
    return (
      <OptionInput
        tres={tres}
        setTrues={setTrues}
        setPPXbaza={setPPXbaza}
        PPxbaza={PPxbaza}
      />
    );
  } else if (!parol) {
    return (
      <>
        <userContext.Provider
          value={{ states, useStates, passwords, usePasswords }}
        >
          <LoginUser />
        </userContext.Provider>
      </>
    );
  } else {
    console.log("bekor");
  }
}
console.clear();

export default App;
