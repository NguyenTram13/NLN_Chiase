import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./assets/css/sb-admin-2.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./config/common.js";
import { AdvertisingProvider, AdvertisingSlot } from "react-advertising";
const config = {
  slots: [
    {
      id: "banner-ad",
      path: "/6355419/Travel/Europe/France/Paris",
      sizes: [[300, 250]],
    },
  ],
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <AdvertisingProvider config={config}> */}
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </AdvertisingProvider> */}

    {/* </React.StrictMode> */}
  </Provider>
);
