# Contributing

## Development environment
### config.js
The code depends on the module `config.js` in the project root. It stores some default values that are required by the
server. If you want to change these values set them as environment variables or change this file.

### Prerequisites
* PostgreSQL instance

### Setup database for development
1. Create database: First a database needs to be created
```SQL
CREATE DATABASE wireguardbuilder;
```

2. Run initial migrations on database
```bash
DB_NAME="wireguardbuilder" cd server && node setupDatabase.js
```

There are a few environment variables to be able to specify the connection details for the database:

* `DB_HOST`: The hostname of the database to connect to
* `DB_PORT`: The port where the database is listening
* `DB_USER`: The username that has access to the created database from Step 1
* `DB_PASSWORD`: The password that is required to connect to the database
* `DB_NAME`: The name of the database that should be used

These variables are optional. If none of them are set the defaults from [config.js](./server/config.js) will be used.