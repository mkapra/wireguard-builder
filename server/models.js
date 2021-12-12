const { ApolloError } = require('apollo-server');
const { exec } = require('child_process');
const { SQLDataSource } = require('datasource-sql');

const { DB_CACHE_DURATION } = require('./config');

class Database extends SQLDataSource {
    // Return promise with stdout of command
    async executeCommand(command, cb) {
        return new Promise((resolve, reject) => {
            exec(command, (err, stdout, _) => {
                if (err) {
                    reject(err);
                }

                resolve(stdout.trim());
            });
        });
    }

    /** Keypairs */
    async getKeypairs() {
        return this.knex
            .from('keypairs')
            .select('*')
            .cache(DB_CACHE_DURATION);
    }

    async getKeypairById(id) {
        return this.knex
            .first()
            .from('keypairs')
            .select('*')
            .where('id', id)
            .cache(DB_CACHE_DURATION);
    }

    async createKeypair() {
        const privKey = await this.executeCommand('wg genkey').then(res => res);
        const pubKey = await this.executeCommand(`echo '${privKey}' | wg pubkey`).then(res => res);

        return this.knex('keypairs').returning(['id', 'private_key', 'public_key']).insert({
            private_key: privKey,
            public_key: pubKey,
        }).then(res => res[0]);
    }

    async deleteKeypair(id) {
        return this.knex('keypairs')
            .where('id', id)
            .del();
    }

    /** DNS Servers */
    async getDnsServers() {
        return this.knex
            .from('dns_servers')
            .select('*')
            .cache(DB_CACHE_DURATION);
    }

    async getDnsServersById(id) {
        return this.knex
            .first()
            .from('dns_servers')
            .select('*')
            .where('id', id)
            .cache(DB_CACHE_DURATION);
    }

    async createDnsServer(dnsServer) {
        return this.knex('dns_servers')
            .returning(['id', 'name', 'ip_address', 'description'])
            .insert(dnsServer)
            .then(res => res[0])
            .catch(_ => {
                throw new ApolloError("Error while creating the dns server. Maybe a DNS server with the given ip " +
                    "address or name already exists?", "DNS_SERVER_CREATION_ERROR");
            });
    }

    async updateDnsServer(id, dnsServer) {
        return this.knex('dns_servers')
            .returning(['id', 'name', 'ip_address', 'description'])
            .where('id', id)
            .update(dnsServer)
            .then(res => res[0])
            .catch(err => {
                throw new ApolloError("Error while updating the dns server: " + err, "DNS_SERVER_UPDATE_ERROR");
            });
    }

    /** VPN Networks */
    async getVpnNetworks() {
        return this.knex
            .from('vpn_networks')
            .select('*')
            .cache(DB_CACHE_DURATION);
    }

    async getVpnNetwork(id) {
        return this.knex
            .first()
            .from('vpn_networks')
            .select('*')
            .where('id', id)
            .cache(DB_CACHE_DURATION);
    }

    async createVpnNetwork(vpnNetwork) {
        return this.knex('vpn_networks')
            .returning(['id', 'name', 'description', 'ip_address', 'subnetmask', 'port', 'interface'])
            .insert(vpnNetwork)
            .then(res => res[0])
            .catch(_ => {
                throw new ApolloError("Error while creating the vpn network. Maybe a VPN network with the given ip " +
                    "address or name already exists?", "VPN_NETWORK_CREATION_ERROR");
            });
    }

    async updateVpnNetwork(id, vpnNetwork) {
        return this.knex('vpn_networks')
            .returning(['id', 'name', 'description', 'ip_address', 'subnetmask', 'port', 'interface'])
            .where('id', id)
            .update(vpnNetwork)
            .then(res => res[0])
            .catch(err => {
                throw new ApolloError("Error while updating the vpn network: " + err, "VPN_NETWORK_UPDATE_ERROR");
            });
    }
}

module.exports = Database;