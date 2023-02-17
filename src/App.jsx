import { Outlet } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";

 

 
function App() {
 
  return (
    <>
      <div className="min-h-full">
        <Header/>
        <Outlet />
      </div>
    </>
  );
}

export default App;
