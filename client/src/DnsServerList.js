import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

import Table from "./Table";

const GET_DNS_SERVERS = gql`
  query Query {
    dnsServers {
      id
      name
      description
      ip_address
    }
  }
`;

const DnsServerList = () => {
  const { loading, error, data } = useQuery(GET_DNS_SERVERS);
  const [search, setSearch] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2 className="text-3xl mb-4">DNS Servers</h2>

      <div className="space-y-2">
        <input
          className="p-2 border w-full"
          type="text"
          placeholder="Search DNS Servers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table
          headings={["ID", "Name", "Description", "IP Address"]}
          data={data.dnsServers.filter((dnsServer) => {
            return dnsServer.name
              .toLowerCase()
              .includes(search.toLowerCase()) || dnsServer.ip_address.toLowerCase().includes(search.toLowerCase());
          })}
          actions={true}
        />
      </div>
    </div>
  );
};

export default DnsServerList;
