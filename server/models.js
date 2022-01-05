const { ApolloError } = require("apollo-server");
const { exec } = require("child_process");
const { SQLDataSource } = require("datasource-sql");

class Database extends SQLDataSource {
  // Return promise with stdout of command
  async executeCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout) => {
        if (err) {
          reject(err);
        }

        resolve(stdout.trim());
      });
    });
  }

  /** Keypairs */
  async getKeypairs() {
    return this.knex.from("keypairs").select("*");
  }

  async getKeypairById(id) {
    return this.knex.first().from("keypairs").select("*").where("id", id);
  }

  async createKeypair() {
    const privKey = await this.executeCommand("wg genkey").then((res) => res);
    const pubKey = await this.executeCommand(
      `echo '${privKey}' | wg pubkey`
    ).then((res) => res);

    return this.knex("keypairs")
      .returning(["id", "private_key", "public_key"])
      .insert({
        private_key: privKey,
        public_key: pubKey,
      })
      .then((res) => res[0]);
  }

  async deleteKeypair(id) {
    return this.knex("keypairs").where("id", id).del();
  }

  /** DNS Servers */
  async getDnsServers() {
    return this.knex.from("dns_servers").select("*");
  }

  async getDnsServerById(id) {
    return this.knex.first().from("dns_servers").select("*").where("id", id);
  }

  async createDnsServer(dnsServer) {
    return this.knex("dns_servers")
      .returning(["id", "name", "ip_address", "description"])
      .insert(dnsServer)
      .then((res) => res[0])
      .catch(() => {
        throw new ApolloError(
          "Error while creating the dns server. Maybe a DNS server with the given ip " +
            "address or name already exists?",
          "DNS_SERVER_CREATION_ERROR"
        );
      });
  }

  async updateDnsServer(id, dnsServer) {
    return this.knex("dns_servers")
      .returning(["id", "name", "ip_address", "description"])
      .where("id", id)
      .update(dnsServer)
      .then((res) => res[0])
      .catch((err) => {
        throw new ApolloError(
          "Error while updating the dns server: " + err,
          "DNS_SERVER_UPDATE_ERROR"
        );
      });
  }

  /** VPN Networks */
  async getVpnNetworks() {
    return this.knex.from("vpn_networks").select("*");
  }

  async getVpnNetworkById(id) {
    return this.knex.first().from("vpn_networks").select("*").where("id", id);
  }

  async createVpnNetwork(vpnNetwork) {
    return this.knex("vpn_networks")
      .returning([
        "id",
        "name",
        "description",
        "ip_address",
        "subnetmask",
        "port",
        "interface",
      ])
      .insert(vpnNetwork)
      .then((res) => res[0])
      .catch(() => {
        throw new ApolloError(
          "Error while creating the vpn network. Maybe a VPN network with the given ip " +
            "address or name already exists?",
          "VPN_NETWORK_CREATION_ERROR"
        );
      });
  }

  async updateVpnNetwork(id, vpnNetwork) {
    return this.knex("vpn_networks")
      .returning([
        "id",
        "name",
        "description",
        "ip_address",
        "subnetmask",
        "port",
        "interface",
      ])
      .where("id", id)
      .update(vpnNetwork)
      .then((res) => res[0])
      .catch((err) => {
        throw new ApolloError(
          "Error while updating the vpn network: " + err,
          "VPN_NETWORK_UPDATE_ERROR"
        );
      });
  }

  /** Servers */
  async getServerByKeypair(keypairId) {
    return this.knex
      .first()
      .from("servers")
      .select("*")
      .where("keypair_id", keypairId);
  }

  async getServers() {
    return this.knex.from("servers").select("*");
  }

  async getServerById(id) {
    return this.knex.first().from("servers").select("*").where("id", id);
  }

  async createServer(server) {
    return this.knex("servers")
      .returning([
        "id",
        "name",
        "description",
        "forward_interface",
        "vpn_network_id",
        "keypair_id",
        "ip_address",
      ])
      .insert(server)
      .then((res) => res[0])
      .catch((err) => {
        throw new ApolloError(
          `Error while creating the server. Maybe a server with the given ip " +
                    "address or name already exists? ${err}`,
          "SERVER_CREATION_ERROR"
        );
      });
  }

  async updateServer(id, server) {
    return this.knex("servers")
      .returning([
        "id",
        "name",
        "description",
        "forward_interface",
        "vpn_network_id",
        "keypair_id",
        "ip_address",
      ])
      .where("id", id)
      .update(server)
      .then((res) => res[0])
      .catch((err) => {
        throw new ApolloError(
          `Error while updating the server: ${err}`,
          "SERVER_UPDATE_ERROR"
        );
      });
  }

  /** Clients */
  async getClients() {
    return this.knex.from("clients").select("*");
  }

  async getClientById(id) {
    return this.knex.first().from("clients").select("*").where("id", id);
  }

  async createClient(client) {
    return this.knex("clients")
      .returning([
        "id",
        "name",
        "description",
        "dns_server_id",
        "keepalive",
        "keypair_id",
        "vpn_ip_id",
      ])
      .insert(client)
      .then((res) => res[0])
      .catch((err) => {
        throw new ApolloError(
          `Error while creating the client. Maybe a client with the given ip " +
                    "address or name already exists? ${err}`,
          "CLIENT_CREATION_ERROR"
        );
      });
  }

  async createVpnIp(vpnIp) {
    return this.knex("vpn_ip_addresses")
      .returning(["id", "address", "vpn_network_id"])
      .insert(vpnIp)
      .then((res) => res[0])
      .catch((err) => {
        throw new ApolloError(
          `Error while creating the vpn ip. Maybe a vpn ip with the given ip " +
                    "address or name already exists? ${err}`,
          "VPN_IP_CREATION_ERROR"
        );
      });
  }

  async getVpnIpById(id) {
    return this.knex
      .first()
      .from("vpn_ip_addresses")
      .select("*")
      .where("id", id);
  }
}

module.exports = Database;
