import { React, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import Table from "./Table";
import Error from "./Error";
import Searchbar from "./Searchbar";

const GET_SERVERS = gql`
  query Query {
    servers {
      id
      name
      description
      ip_address
      forward_interface
      keypair {
        id
      }
      vpn_network {
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
      <h2 className="text-3xl mb-4">Servers</h2>
      {error && <Error error={error} />}
      {!error && (
        <div className="space-y-2">
          <Searchbar
            search={search}
            setSearch={setSearch}
            placeholder="Search for name, ip address, description or forward interface..."
          />
          <Table
            headings={[
              "ID",
              "Name",
              "Description",
              "IP-Address",
              "Forward Interface",
              "Keypair",
              "VPN Network",
            ]}
            data={data.servers.filter((server) => {
              return (
                server.name.toLowerCase().includes(search.toLowerCase()) ||
                (server.description &&
                  server.description
                    .toLowerCase()
                    .includes(search.toLowerCase())) ||
                server.ip_address
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                server.forward_interface
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
