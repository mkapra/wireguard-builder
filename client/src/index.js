import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import "./index.css";
import App from "./App";
import KeypairList from "./KeypairList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/keypairs" element={<KeypairList />} />
            <Route path="/dns_servers" element={<KeypairList />} />
            <Route path="/vpn_networks" element={<KeypairList />} />
            <Route path="/clients" element={<KeypairList />} />
            <Route path="/servers" element={<KeypairList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
