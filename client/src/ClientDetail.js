import React from "react";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import parse from "html-react-parser";

import Modal from "./Modal";
import Codebox from "./Codebox";

const GET_CLIENT = gql`
  query Query($id: ID!) {
    client(id: $id) {
      name
      config
    }
  }
`;

const ClientDetail = ({ setIsOpen, clientId }) => {
  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  });

  if (loading) {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    );
  }
  if (error) {
    toast.error("Could not fetch data from API: " + error.message, {
      toastId: "query-error",
    });
    return null;
  }

  return (
    <Modal
      setIsOpen={setIsOpen}
      heading={
        <span>
          Detail for <span className="text-blue-500">{data.client.name}</span>
        </span>
      }
    >
      <h3 className="text-xl">Configuration</h3>
      <Codebox value={parse(data.client.config)} />

      <p className="font-semibold">
        Or scan the QR code with the wireguard app:
      </p>
      <div className="flex justify-center">
        <QRCode value={parse(data.client.config)} />
      </div>
    </Modal>
  );
};

// Prop types validation
ClientDetail.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  setClientId: PropTypes.func.isRequired,
};

export default ClientDetail;
