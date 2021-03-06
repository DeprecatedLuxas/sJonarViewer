import * as path from 'path';
import config from "../../../config.json";
import knex from "knex";
const databaseFilePath = path.resolve(__dirname, `../../../../../${config.database.fileName}`)

const database = knex({
    client: "sqlite3",
    connection: {
        filename: databaseFilePath
    },
    useNullAsDefault: true
});

database.schema
    .hasTable(config.database.table)
    .then((exists: boolean) => {
        if (!exists) {
            console.error(`The table ${config.database.table} does not exist in the database file`)
        }
    })
    .then(() => {
        console.log("Database was set up correctly.")
    })
    .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`);
    })



export = database;
