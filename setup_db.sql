CREATE TABLE keys (
  id INTEGER NOT NULL PRIMARY KEY,
  priv_key VARCHAR NOT NULL,
  pub_key VARCHAR NOT NULL
);

CREATE TABLE dns_servers (
  id INTEGER NOT NULL PRIMARY KEY,
  ip VARCHAR NOT NULL UNIQUE
);

CREATE TABLE allowed_ips (
  id INTEGER NOT NULL PRIMARY KEY,
  ip VARCHAR NOT NULL,
  description VARCHAR
);

CREATE TABLE vpn_nets (
  id INTEGER NOT NULL PRIMARY KEY,
  address VARCHAR NOT NULL,
  subnetmask INTEGER NOT NULL,
  interface VARCHAR NOT NULL UNIQUE,
  port INTEGER NOT NULL UNIQUE
);

CREATE TABLE vpn_ips (
  id INTEGER NOT NULL,
  address VARCHAR NOT NULL,
  net_id INTEGER NOT NULL,

  PRIMARY KEY (id, address, net_id)
  FOREIGN KEY(net_id) REFERENCES vpn_nets(id)
);

CREATE TABLE clients (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR,
  dns_server_id INTEGER NOT NULL,
  keepalive INTEGER,
  key_id INTEGER NOT NULL,
  ip_id INTEGER NOT NULL,

  FOREIGN KEY(dns_server_id) REFERENCES dns_servers(id),
  FOREIGN KEY(key_id) REFERENCES keys(id),
  FOREIGN KEY(ip_id) REFERENCES vpn_ips(id)
);


CREATE TABLE server (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR,
  forward_interface VARCHAR,
  net_id INTEGER NOT NULL,
  key_id INTEGER NOT NULL,

  FOREIGN KEY(net_id) REFERENCES vpn_nets(id),
  FOREIGN KEY(key_id) REFERENCES keys(id)
);


CREATE TABLE client_allowed_ips (
  allowed_ip_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,

  PRIMARY KEY (allowed_ip_id, client_id),
  FOREIGN KEY(allowed_ip_id) REFERENCES allowed_ips(id),
  FOREIGN KEY(client_id) REFERENCES clients(id)
);
