import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import { Provider } from "react-redux";
import { persistor, store } from "./Pages/redux/features/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      </PersistGate>
      <Toaster />
    </Provider>
  </StrictMode>
);
