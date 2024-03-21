# WELCOME TO GATE SYSTEM

I've developed this Gate System utilizing advanced technology, including:

- Express.js for the server-side functionality,
- TypeORM for efficient object-relational mapping,
- PostgreSQL as the database, known for its robustness.

## Steps to run this project🚀🚀

To run your locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Create `.env`

Then, configure your `.env` with your postgresql credentials :

```env
TYPEORM_HOST="?"
TYPEORM_PORT=?
TYPEORM_USERNAME="?"
TYPEORM_PASSWORD="?"
TYPEORM_DATABASE="?"
```

Create your schema (creating migration)

```sh
npm run migration:migration
```

And than, push schema to your database (migrating schema to your database) :

```sh
npm run migration:run
```

Afterwards, start the Express.js development server like so:

```sh
npm start
```
