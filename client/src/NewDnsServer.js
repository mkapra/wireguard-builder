import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { GET_DNS_SERVERS } from "./DnsServerList";
import Button from "./Button";

const CREATE_DNS_SERVER = gql`
  mutation CreateDnsServer($name: String!, $ip: String!, $description: String) {
    createDnsServer(name: $name, ip: $ip, description: $description) {
      id
    }
  }
`;

const NewDnsServer = ({ setIsOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  const [createDnsServer] = useMutation(CREATE_DNS_SERVER, {
    refetchQueries: [{ query: GET_DNS_SERVERS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createDnsServer({
      variables: {
        name,
        description,
        ip: ipAddress,
      },
    })
      .catch((err) => {
        toast.error(err.message, { toastId: "new-dns-server-error" });
      })
      .then(() => {
        toast.success("DNS Server created successfully!", {
          toastId: "new-dns-server-success",
        });
        setIsOpen(false);
      });
  };

  // setIsOpen(false) if escape button is pressed
  const handleEscape = (e) => {
    if (e.keyCode === 27) {
      setIsOpen(false);
    }
  };

  // close modal if user clicks outside of modal
  const handleClick = (target) => {
    if (!target.id && target.type !== "submit") setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      onClick={(e) => handleClick(e.target)}
      className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-40 flex items-center justify-center"
    >
      <div id="modal" className="w-1/2 bg-gray-100 shadow-lg p-4 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Create new DNS Server</h2>
          <Button onClick={() => setIsOpen(false)}>
            <div className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </Button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="name"
              className="text-gray-500 text-xs font-extrabold uppercase"
            >
              Name
            </label>
            <input
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor="description"
              className="text-gray-500 text-xs font-extrabold uppercase"
            >
              Description
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-64"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor="ipAddress"
              className="text-gray-500 text-xs font-extrabold uppercase"
            >
              IP-Address
            </label>
            <input
              id="ipAddress"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="IP-Address"
            />
          </div>

          <input
            type="submit"
            className="float-right bg-blue-500 items-center justify-center py-2 px-4 rounded-full text-blue-100 hover:bg-orange-400 hover:text-gray-800 transition delay-75"
            value="Create DNS Server"
          />
        </form>
      </div>
    </div>
  );
};

// Props validation
NewDnsServer.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default NewDnsServer;
