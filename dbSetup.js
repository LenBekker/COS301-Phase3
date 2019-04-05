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

    /* Client and Audit tables are created if they cannot be found in the DB,
    this is basic error handling for the database. */

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

    /*------ 6 digit unique code function ------ 
     Creates a random logID for each user */

    CREATE OR REPLACE FUNCTION random_string()
    RETURNS text AS $$
    SELECT array_to_string(
      ARRAY(
          SELECT substring(
            '0123456789',
            trunc(random()*10)::int+1,
            1
          )
          FROM generate_series(1,6) AS gs(x)
      )
      , ''
    )
    $$ LANGUAGE SQL;

    CREATE TABLE IF NOT EXISTS AuditLog(
    ClientID integer default null,
    accountID text not null default random_string(), 
    event text NOT NULL,
    timesstamp timestamp(0) default date_trunc('second', now()),
    FOREIGN KEY (ClientID) REFERENCES Client(ClientID) on delete cascade on update cascade
    );

    /*---------------------------- Insert Trigger --------------------------------*/

    /* When a new client is inserted into the client table, 
        a trigger is activated to log the time that it happen,
        the event that occurred and the new ClientID*/
    
    CREATE OR REPLACE FUNCTION triggerInsert() RETURNS TRIGGER AS $audit_insert$
    DECLARE BEGIN
        INSERT INTO AuditLog (timesstamp,event,ClientID) VALUES(now(),'New Client Inserted!',new.ClientID);
    RETURN NEW;
    END;
    $audit_insert$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS triggerInsert ON Client;

    CREATE TRIGGER triggerInsert
    AFTER INSERT ON Client
    FOR EACH ROW EXECUTE PROCEDURE triggerInsert();

     /*---------------------------- Update Email Trigger --------------------------------*/
    
    /* When an existing clients e-mail is updated, 
        a trigger is activated to log the time that it happen,
        the event that occurred and the ClientID which was effected by the action.*/

    CREATE OR REPLACE FUNCTION triggerUpdateEmail() RETURNS TRIGGER AS $update_email$
    DECLARE BEGIN
        INSERT INTO AuditLog (timesstamp,event,ClientID) VALUES(now(),'Client email updated!',OLD.ClientID);
            RETURN OLD;
    END;
    $update_email$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS triggerUpdateEmail ON Client;

    CREATE TRIGGER triggerUpdateEmail
    AFTER UPDATE ON Client
    FOR EACH ROW 
    WHEN(OLD.email IS DISTINCT FROM NEW.email)
    EXECUTE PROCEDURE triggerUpdateEmail();

    /*---------------------------- Update Address Trigger --------------------------------*/
    
    /* When an existing clients address is updated, 
        a trigger is activated to log the time that it happen,
        the event that occurred and the ClientID which was effected by the action.*/

    CREATE OR REPLACE FUNCTION triggerUpdateAddress() RETURNS TRIGGER AS $update_address$
    DECLARE BEGIN
        INSERT INTO AuditLog (timesstamp,event,ClientID) VALUES(now(),'Client address updated!',OLD.ClientID);
            RETURN OLD;
    END;
    $update_address$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS triggerUpdateAddress ON Client;

    CREATE TRIGGER triggerUpdateAddress
    AFTER UPDATE ON Client
    FOR EACH ROW 
    WHEN(OLD.address IS DISTINCT FROM NEW.address)
    EXECUTE PROCEDURE triggerUpdateAddress();

    /*---------------------------- Update Phone Number Trigger --------------------------------*/
    
    /* When an existing clients phone number is updated, 
        a trigger is activated to log the time that it happen,
        the event that occurred and the ClientID which was effected by the action.*/

    CREATE OR REPLACE FUNCTION triggerUpdateNumber() RETURNS TRIGGER AS $update_number$
    DECLARE BEGIN
        INSERT INTO AuditLog (timesstamp,event,ClientID) VALUES(now(),'Client phone number updated!',OLD.ClientID);
            RETURN OLD;
    END;
    $update_number$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS triggerUpdateNumber ON Client;

    CREATE TRIGGER triggerUpdateNumber
    AFTER UPDATE ON Client
    FOR EACH ROW 
    WHEN(OLD.phonenumber IS DISTINCT FROM NEW.phonenumber)
    EXECUTE PROCEDURE triggerUpdateNumber();

    /*---------------------------- Client Activated/Deactivate Trigger --------------------------------*/
    
    /* When an existing client is activated or deactivated, 
        a trigger is activated to log the time that it happen,
        the event that occurred and the ClientID which was effected by the action.*/

    CREATE OR REPLACE FUNCTION triggerActivate() RETURNS TRIGGER AS $update$
    DECLARE BEGIN
        INSERT INTO AuditLog (timesstamp,event,ClientID) VALUES(now(),'Client Activated/Deactivated!',OLD.ClientID);
            RETURN OLD;
    END;
    $update$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS triggerActivate ON Client;

    CREATE TRIGGER triggerActivate
    AFTER UPDATE ON Client
    FOR EACH ROW 
    WHEN(OLD.active IS DISTINCT FROM NEW.active)
    EXECUTE PROCEDURE triggerActivate();

    
    `;

    /* If a successful connection was made to the Client table*/
    pool.query(createQuery)
    .then((res) => {
            console.log("[Postgres Connection]: Client Table Found");
            pool.end();
    })

    /* If the connection was unsuccessful and a new Client table was created*/
    .catch((err) => {
        console.log("[Postgres Connection]: Created Client Table from Schema");
            console.log(err);
            pool.end();
    });
}

module.exports = {
    psqlSetup
};
