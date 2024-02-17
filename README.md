# backend

This service handles all business logic related to equati game generations and serving.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Database CLI operations

**Note:** The database does not synchronize (read: create) the schema by itself when the service starts
unless you have the environmental variable `MODE=dev` set.

in your shell which will run the migrations from the _src/database/migrations_ folder from past to now. Also, whenever
you make changes to the database schema, make sure to either create a new _init_ migration or to create an incremental
migration by running
```shell
npm run migrate:generate
```
in your shell.

### Synchronization

In your shell, run
```shell
yarn run schema:sync
```
to manually synchronize the schema. Note that you shouldn't use this command in production!
If you plan to use this command in production or in automations in production-ish environments,
make sure that the command is only executed once in the beginning when there is no database schema.
Using synchronize in production is officially discouraged ([see this link](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#how-migrations-work)).

Otherwise, refer to the next section on how to do database schema migrations.

### Migrations

To generate a migration towards the new entities in your code, run the following in your shell:
```
yarn run migration:generate <migration-name>
```
which will generate a file in `src/database/migrations/` which is prefixed with your current timestamp.

Subsequently, you can run either
```shell
yarn run migration:up
```
to execute all pending migrations or
```shell
yarn run migration:down
```
to revert all migrations.


## Owner
Thomas Faust
