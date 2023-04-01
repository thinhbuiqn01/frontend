import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
import "./index.css";
import Router from "./router/Router";
import store from "./redux/store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={Router} />
      </ContextProvider>
    </React.StrictMode>
  </Provider>
);
