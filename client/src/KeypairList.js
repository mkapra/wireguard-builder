import { useQuery, useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";

import Table from "./Table";

const GET_KEYPAIRS = gql`
  query Query {
    keypairs {
      id
      public_key
    }
  }
`;

const GENERATE_KEYPAIR = gql`
  mutation Mutation {
    generateKeypair {
      id
    }
  }
`;

const KeypairList = () => {
  const {
    loading: listLoading,
    error: listError,
    data: listData,
  } = useQuery(GET_KEYPAIRS);
  const [
    generateKeypair,
    {
      data: generateData,
      loading: generateLoading,
      error: generateError,
      reset: generateReset,
    },
  ] = useMutation(GENERATE_KEYPAIR, {
    refetchQueries: [{ query: GET_KEYPAIRS }],
  });

  if (listLoading) return <p>Loading...</p>;
  if (listError) return <p>Error :(</p>;
  if (generateLoading) return <p>Generate Keypair...</p>;
  if (generateError) return <p>Error :(</p>;

  const successGeneratedKeypair = (id) => {
    toast.success(`Keypair with id ${id} created successfully`, { toastId: id });
  };

  return (
    <div>
      {generateData &&
        generateReset &&
        successGeneratedKeypair(generateData.generateKeypair.id)}

      <h2 className="text-3xl mb-4">Keypairs</h2>

      <button
        onClick={() => generateKeypair()}
        className="mb-4 float-right flex space-x-2 bg-blue-500 items-center justify-center py-2 px-4 rounded-full text-blue-100 hover:bg-orange-400 hover:text-gray-800 transition delay-75"
      >
        <span>Generate Keypair</span>
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
      <Table
        headings={["ID", "Public Key"]}
        data={listData.keypairs}
        actions={true}
      />
    </div>
  );
};

export default KeypairList;
