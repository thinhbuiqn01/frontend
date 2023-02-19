import { Outlet } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import { useStateContext } from "./context/ContextProvider";

function App() {
  const { currentUser } = useStateContext();

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
