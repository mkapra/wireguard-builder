import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

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

      <button className="mb-4 float-right flex space-x-2 bg-blue-500 items-center justify-center py-2 px-4 rounded-full text-blue-100 hover:bg-orange-400 hover:text-gray-800 transition delay-75">
        <span>Generate Keypair</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      <Table
        headings={["ID", "Public Key"]}
        data={data.keypairs}
        actions={true}
      />
    </div>
  );
};

export default KeypairList;
