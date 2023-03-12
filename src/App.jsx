import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import { useStateContext } from "./context/ContextProvider";

function App() {
  const { currentUser } = useStateContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-full">
        <Header currentUser={currentUser} />
        <Outlet />
      </div>
    </>
  );
}

export default App;
