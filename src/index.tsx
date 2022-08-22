import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Provider from "./context/UserProvider";
import ModalContext from "./context/ModalProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <ModalContext>
          <App />
        </ModalContext>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
