import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import Navbar from "./Navbar";
import App from "./App";
import KeypairList from "./KeypairList";
import DnsServerList from "./DnsServerList";
import VpnNetworkList from "./VpnNetworkList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <div className="flex overflow-hidden h-screen">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/keypairs" element={<KeypairList />} />
              <Route path="/dns_servers" element={<DnsServerList />} />
              <Route path="/vpn_networks" element={<VpnNetworkList />} />
              {/* <Route path="/clients" element={<KeypairList />} /> */}
              {/* <Route path="/servers" element={<KeypairList />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);