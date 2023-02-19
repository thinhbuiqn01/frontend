import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
import "./index.css";
import Router from "./router/Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={Router} />
    </ContextProvider>
  </React.StrictMode>
);
