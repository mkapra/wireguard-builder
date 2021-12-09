# Wireguard API
This project has the aim to provide an interface for coniguring a wireguard vpn network.
With the corresponding [Client](https://github.com/mkapra/wireguard-client) it will be possible
to use this interface.

## Development
### Preparation
You will need a PostgreSQL database with the tables of [setup_db.sql](./server/setup_db.sql).

### config.js
The code depends on the module `config.js` in the project root. This file is in the [.gitignore](./.gitignore) because it stores values like a secret key which is used for the `JWT-Token` generation. Example content of this file:
```js
DB_CACHE_DURATION = 60;
DB_HOST = 'localhost';
DB_PORT = '5432';
DB_NAME = 'postgres';
```