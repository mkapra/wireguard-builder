import { React, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import Table from "./Table";
import Error from "./Error";
import Searchbar from "./Searchbar";

const GET_SERVERS = gql`
  query Query {
    clients {
      id
      name
      description
      dns_server {
        id
      }
      vpn_network {
        id
      }
      ip_address
      keepalive_interval
      keypair {
        id
      }
    }
  }
`;

const ServerList = () => {
  const { loading, error, data } = useQuery(GET_SERVERS);
  const [search, setSearch] = useState("");

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className="text-3xl mb-4">Clients</h2>
      {error && <Error error={error} />}
      {!error && (
        <div className="space-y-2">
          <Searchbar
            search={search}
            setSearch={setSearch}
            placeholder="Search for name, ip address, description or keepalive interval..."
          />
          <Table
            headings={[
              "ID",
              "Name",
              "Description",
              "DNS-Server",
              "VPN Network",
              "IP-Address",
              "Keepalive Interval",
              "Keypair",
            ]}
            data={data.clients.filter((client) => {
              return (
                client.name.toLowerCase().includes(search.toLowerCase()) ||
                (client.description &&
                  client.description
                    .toLowerCase()
                    .includes(search.toLowerCase())) ||
                client.ip_address
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                client.keepalive_interval
                  .toLowerCase()
                  .includes(search.toLowerCase())
              );
            })}
          />
        </div>
      )}
    </>
  );
};

export default ServerList;
