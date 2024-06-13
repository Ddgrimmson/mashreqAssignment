// src/App.tsx
import React from "react";
import { AppRoutes } from "./config/Routes";
import { Provider } from "react-redux";
import store from "./store/store";
import Loader from "./components/Loader";
import { I18nextProvider } from "react-i18next";
import i18n from "./config/i18n";
import Appbar from "./components/Appbar";
import ErrorDisplay from "./components/ErrorDisplay";

const App: React.FC = () => {


  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Appbar />
          <ErrorDisplay />
          <Loader />
          <AppRoutes />
        </Provider>
      </I18nextProvider>
    </div>
  );
};

export default App;
