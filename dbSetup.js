const { Pool } = require('pg');


const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://me:password@localhost:5432/clientinfo"    
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
     );

    CREATE TABLE IF NOT EXISTS AuditLog(
     timestamp_ TIMESTAMP NOT NULL, 
     activity text NOT NULL,
     ClientID INTEGER REFERENCES Client(ClientID) ON DELETE CASCADE
    );


    CREATE OR REPLACE FUNCTION process_log_audits() RETURNS TRIGGER AS $log_audit$
    BEGIN
        --
        -- Create a row in log_audit to reflect the operation performed on Client,
        -- make use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO AuditLog (timestamp_,activity,ClientID) VALUES(now(),'Client has been deleted!',OLD.ClientID);
            RETURN OLD;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO AuditLog (timestamp_,activity,ClientID) VALUES(now(),'Client information has been updated!',NEW.ClientID);
            RETURN NEW;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO AuditLog (timestamp_,activity,ClientID) VALUES(now(),'New Client Inserted!',NEW.ClientID);
            RETURN NEW;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
    $log_audit$ LANGUAGE plpgsql;


    DROP TRIGGER IF EXISTS log_audit
    ON Client;

    CREATE TRIGGER log_audit
    AFTER INSERT OR UPDATE OR DELETE ON Client
    FOR EACH ROW EXECUTE PROCEDURE process_log_audits();

    `;

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
