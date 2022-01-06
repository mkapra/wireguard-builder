const process = require("process");
const { DB_NAME, DB_PORT, DB_HOST } = require("./config");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || DB_HOST,
    port: process.env.DB_PORT || DB_PORT,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || DB_NAME,
  },
});

// Keypairs
//
// * `id`: primary key
// * `public_key`: public key
// * `private_key`: private key
const createKeypairs = async () => {
  await knex.schema.hasTable("keypairs").then((exists) => {
    if (!exists) {
      console.log("Table keypairs does not exist. Creating...");

      return knex.schema
        .createTable("keypairs", (table) => {
          table.increments("id").primary();
          table.string("public_key").notNullable();
          table.string("private_key").notNullable();

          table.unique(["private_key", "public_key"]);
        })
        .then(() => {
          console.log("Table keypairs created");
        })
        .catch((err) => {
          console.log("Error creating keypairs table: ", err);
        });
    } else {
      console.log("Table keypairs already exists. Not creating...");
    }
  });
};

// DNS Servers
//
// * `id`: ID of the dns server
// * `name`: name of the dns server
// * `ip_address`: IP address of the dns server
// * `description`: description of the dns server
// Check if the table exists and created it if it doesn't
const createDnsServers = async () => {
  await knex.schema.hasTable("dns_servers").then((exists) => {
    if (!exists) {
      console.log("Table dns_servers does not exist. Creating...");

      return knex.schema
        .createTable("dns_servers", (table) => {
          table.increments("id").primary();
          table.string("name").notNullable();
          table.string("ip_address").notNullable();
          table.string("description");

          table.unique(["name", "ip_address"]);
        })
        .then(() => {
          console.log("Table dns_servers created");
        })
        .catch((err) => {
          console.log("Error creating dns_servers table: ", err);
        });
    } else {
      console.log("Table dns_servers already exists. Not creating...");
    }
  });
};

// VPN Networks
//
// * `id`: ID of the vpn network
// * `name`: name of the vpn network
// * `description`: description of the vpn network
// * `ip_address`: IP address of the vpn network
// * `subnetmask`: subnetmask of the vpn network
// * `port`: The port that should be used by the server in the vpn network
// * `interface`: The interface that should be used by the server in the vpn network
// Check if the table exists and created it if it doesn't
const createVpnNetworks = async () => {
  await knex.schema.hasTable("vpn_networks").then((exists) => {
    if (!exists) {
      console.log("Table vpn_networks does not exist. Creating...");

      return knex.schema
        .createTable("vpn_networks", (table) => {
          table.increments("id").primary();
          table.string("name").notNullable();
          table.string("description");
          table.string("ip_address").notNullable();
          table.integer("subnetmask").defaultTo(24);
          table.integer("port").notNullable();
          table.string("interface").notNullable();

          table.unique(["name", "ip_address", "port", "interface"]);
        })
        .then(async () => {
          console.log("Table vpn_networks created");

          await createServers();
          await createVpnIpAddresses();
        })
        .catch((err) => {
          console.log("Error creating vpn_networks table: ", err);
        });
    } else {
      console.log("Table vpn_networks already exists. Not creating...");
    }
  });
};

// Servers
//
// * `id`: ID of the server
// * `name`: name of the server
// * `description`: description of the server
// * `ip_address`: IP address of the server in the vpn network
// * `forward_interface`: The interface where all traffic should be forwarded to if no other route is found
// * `vpn_network_id`: The ID of the vpn network where the server is located
// * `keypair_id`: The ID of the keypair that should be used by the server
// Check if the table exists and created it if it doesn't
const createServers = async () => {
  await knex.schema.hasTable("servers").then((exists) => {
    if (!exists) {
      console.log("Table servers does not exist. Creating...");

      return knex.schema
        .createTable("servers", (table) => {
          table.increments("id").primary();
          table.string("name").notNullable();
          table.string("description");
          table.string("ip_address").notNullable();
          table.string("forward_interface").notNullable();
          table.integer("vpn_network_id").notNullable();
          table.integer("keypair_id").notNullable();

          table
            .foreign("vpn_network_id")
            .references("id")
            .inTable("vpn_networks");
          table
            .foreign("keypair_id")
            .references("id")
            .inTable("keypairs")
            .onDelete("CASCADE");
        })
        .then(() => {
          console.log("Table servers created");
        })
        .catch((err) => {
          console.log("Error creating servers table: ", err);
        });
    } else {
      console.log("Table servers already exists. Not creating...");
    }
  });
};

// VPN IP Addresses
//
// * `id`: ID of the vpn ip address
// * `address`: IP address of the vpn ip address
// * `vpn_network_id`: The ID of the vpn network which the vpn ip address is associated with
const createVpnIpAddresses = async () => {
  await knex.schema.hasTable("vpn_ip_addresses").then((exists) => {
    if (!exists) {
      console.log("Table vpn_ip_addresses does not exist. Creating...");

      return knex.schema
        .createTable("vpn_ip_addresses", (table) => {
          table.increments("id").primary();
          table.string("address").notNullable();
          table.integer("vpn_network_id").notNullable();

          table
            .foreign("vpn_network_id")
            .references("id")
            .inTable("vpn_networks");

          table.unique(["address", "vpn_network_id"]);
        })
        .then(async () => {
          console.log("Table vpn_ip_addresses created");
          await createClients();
        })
        .catch((err) => {
          console.log("Error creating vpn_ip_addresses table: ", err);
        });
    } else {
      console.log("Table vpn_ip_addresses already exists. Not creating...");
    }
  });
};

// Clients
//
// * `id`: ID of the client
// * `name`: name of the client
// * `description`: description of the client
// * `dns_server_id`: ID of the dns server that the client should use
// * `vpn_network_id`: ID of the vpn network that the client is assigned to
// * `keypair_id`: ID of the keypair that should be used by the client
// * `keepalive`: The keepalive interval in seconds
// * `vpn_ip_id`: The IP address of the client
const createClients = async () => {
  await knex.schema.hasTable("clients").then((exists) => {
    if (!exists) {
      console.log("Table clients does not exist. Creating...");

      return knex.schema
        .createTable("clients", (table) => {
          table.increments("id").primary();
          table.string("name").notNullable();
          table.string("description");
          table.integer("keepalive").defaultTo(300);
          table.integer("dns_server_id").notNullable();
          table.integer("keypair_id").notNullable();
          table.integer("vpn_ip_id").notNullable();

          table
            .foreign("dns_server_id")
            .references("id")
            .inTable("dns_servers");
          table
            .foreign("keypair_id")
            .references("id")
            .inTable("keypairs")
            .onDelete("CASCADE");
          table
            .foreign("vpn_ip_id")
            .references("id")
            .inTable("vpn_ip_addresses")
            .onDelete("CASCADE");

          table.unique(["keypair_id", "vpn_ip_id"]);
        })
        .then(() => {
          console.log("Table clients created");
        })
        .catch((err) => {
          console.log("Error creating clients table: ", err);
        });
    } else {
      console.log("Table clients already exists. Not creating...");
    }
  });
};

const main = async () => {
  await createKeypairs();
  await createDnsServers();
  await createVpnNetworks();

  // Close connection when all finished
  await knex.destroy();
};

main();

// CREATE TABLE IF NOT EXISTS allowed_ips (
//   id INTEGER NOT NULL PRIMARY KEY,
//   ip VARCHAR NOT NULL,
//   description VARCHAR
// );

// CREATE TABLE IF NOT EXISTS client_allowed_ips (
//   allowed_ip_id INTEGER NOT NULL,
//   client_id INTEGER NOT NULL,

//   PRIMARY KEY (allowed_ip_id, client_id),
//   FOREIGN KEY(allowed_ip_id) REFERENCES allowed_ips(id),
//   FOREIGN KEY(client_id) REFERENCES clients(id)
// );
