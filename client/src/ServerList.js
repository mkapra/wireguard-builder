import { useQuery, useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";

import Table from "./Table";
import Error from "./Error";

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
        public_key
      }
      vpn_network {
        id
        name
        ip_address
      }
    }
  }
`;

const ServerList = () => {
  const { loading, error, data } = useQuery(GET_SERVERS);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className="text-3xl mb-4">Servers</h2>
      {error && <Error error={error} />}
      {!error && (
        <div>
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
            data={data.servers}
          />
        </div>
      )}
    </>
  );
};

export default ServerList;
