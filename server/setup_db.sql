CREATE TABLE IF NOT EXISTS keypairs (
  id SERIAL NOT NULL PRIMARY KEY,
  private_key VARCHAR NOT NULL,
  public_key VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS dns_servers (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  ip_address VARCHAR NOT NULL UNIQUE,
  description VARCHAR
);

CREATE TABLE IF NOT EXISTS vpn_networks (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  description VARCHAR,
  ip_address VARCHAR NOT NULL,
  subnetmask INTEGER NOT NULL,
  port INTEGER NOT NULL UNIQUE,
  interface VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS servers (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR,
  forward_interface VARCHAR,
  net_id SERIAL NOT NULL,
  key_id SERIAL NOT NULL,
  ip_address VARCHAR NOT NULL,

  CONSTRAINT servers_net_id_fkey FOREIGN KEY (net_id)
      REFERENCES vpn_networks (id) ON DELETE CASCADE,
  CONSTRAINT servers_key_id_fkey FOREIGN KEY (key_id)
      REFERENCES keypairs (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clients (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR,
  dns_server_id SERIAL NOT NULL,
  keepalive INTEGER,
  key_id SERIAL NOT NULL,
  ip_id SERIAL NOT NULL,

  CONSTRAINT clients_dns_server_id_fkey FOREIGN KEY (dns_server_id)
      REFERENCES dns_servers (id) ON DELETE CASCADE,
  CONSTRAINT clients_key_id_fkey FOREIGN KEY (key_id)
      REFERENCES keypairs (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vpn_ips (
  id SERIAL NOT NULL PRIMARY KEY,
  address VARCHAR NOT NULL UNIQUE,
  net_id INTEGER NOT NULL UNIQUE,

  CONSTRAINT vpn_ips_net_id_fkey FOREIGN KEY (net_id)
      REFERENCES vpn_networks (id) ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS allowed_ips (
--   id INTEGER NOT NULL PRIMARY KEY,
--   ip VARCHAR NOT NULL,
--   description VARCHAR
-- );


-- CREATE TABLE IF NOT EXISTS client_allowed_ips (
--   allowed_ip_id INTEGER NOT NULL,
--   client_id INTEGER NOT NULL,

--   PRIMARY KEY (allowed_ip_id, client_id),
--   FOREIGN KEY(allowed_ip_id) REFERENCES allowed_ips(id),
--   FOREIGN KEY(client_id) REFERENCES clients(id)
-- );
