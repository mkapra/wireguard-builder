import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import Table from "./Table";
import Searchbar from "./Searchbar";

const GET_VPN_NETWORKS = gql`
  query Query {
    vpnNetworks {
      id
      name
      description
      ip_address
      subnetmask
      port
      interface
    }
  }
`;

const VpnNetworkList = () => {
  const { loading, error, data } = useQuery(GET_VPN_NETWORKS);
  const [search, setSearch] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const matches = (vpnNetwork) => {
    return (
      vpnNetwork.name.toLowerCase().includes(search.toLowerCase()) ||
      vpnNetwork.description.toLowerCase().includes(search.toLowerCase()) ||
      vpnNetwork.ip_address.toLowerCase().includes(search.toLowerCase()) ||
      vpnNetwork.interface.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="space-y-2">
      <h2 className="text-3xl mb-4">VPN Networks</h2>
      <Searchbar search={search} setSearch={setSearch} />
      <Table
        headings={[
          "ID",
          "Name",
          "Description",
          "IP-Address",
          "Subnetmask",
          "Port",
          "Interface",
        ]}
        data={data.vpnNetworks.filter((network) => matches(network, search))}
      />
    </div>
  );
};

export default VpnNetworkList;
