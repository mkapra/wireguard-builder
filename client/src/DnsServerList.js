import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

import Table from "./Table";
import Searchbar from "./Searchbar";
import NewDnsServer from "./NewDnsServer";
import Error from "./Error";

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
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className="text-3xl mb-4">DNS Servers</h2>
      {error && <Error error={error} />}

      {!error && (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="mb-4 float-right flex space-x-2 bg-blue-500 items-center justify-center py-2 px-4 rounded-full text-blue-100 hover:bg-orange-400 hover:text-gray-800 transition delay-75"
          >
            <span>New DNS Server</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <div className="space-y-2">
            <Searchbar
              search={search}
              setSearch={setSearch}
              placeholder="Search for name or ip address..."
            />

            <Table
              headings={["ID", "Name", "Description", "IP Address"]}
              data={data.dnsServers.filter((dnsServer) => {
                return (
                  dnsServer.name.toLowerCase().includes(search.toLowerCase()) ||
                  dnsServer.ip_address
                    .toLowerCase()
                    .includes(search.toLowerCase())
                );
              })}
            />
          </div>

          {isOpen && <NewDnsServer setIsOpen={setIsOpen} />}
        </>
      )}
    </>
  );
};

export default DnsServerList;
export { GET_DNS_SERVERS };
