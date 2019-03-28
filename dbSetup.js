const { Pool } = require('pg');
const pool = new Pool({
    //Single line
    connectionString: process.env.DATABASE_URL || "postgres://me:password@localhost:5432/clientinfo"
    
    //OR Multiline:
    /*
        user: 'me',
        host: 'localhost',
        database: 'clientinfo',
        password: 'password',
        port: 5432,
    */
})


const psqlSetup = () => {
    const createQuery =
    `CREATE TABLE IF NOT EXISTS
    Client(
        ClientId SERIAL PRIMARY KEY,
        Name VARCHAR(64) NOT NULL,
        Surname VARCHAR(64) NOT NULL,
        Email VARCHAR(128) NOT NULL,
        PhoneNumber VARCHAR(32) NOT NULL,
        Address character varying(224)NOT NULL,
        Active BOOLEAN NOT NULL
    )`;

    pool.query(createQuery)
    .then((res) => {
            console.log("[Postgres Connection]: Client Table Found");
            pool.end();
    })
    .catch((err) => {
        console.log("[Postgres Connection]: Created Client Table from Schema");
            console.log(err);
            pool.end();
    });
}

module.exports = {
    psqlSetup
};
