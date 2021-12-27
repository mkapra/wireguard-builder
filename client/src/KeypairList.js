import { useQuery, gql } from "@apollo/client";

import Table from "./Table";

const GET_KEYPAIRS = gql`
  query Query {
    keypairs {
      id
      public_key
    }
  }
`;

const KeypairList = () => {
  const { loading, error, data } = useQuery(GET_KEYPAIRS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2 className="text-3xl mb-4">Keypairs</h2>
      <Table
        headings={["ID", "Public Key"]}
        data={data.keypairs}
        actions={true}
      />
    </div>
  );
};

export default KeypairList;
