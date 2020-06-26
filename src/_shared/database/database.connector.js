const db = require('mongoose');

class DBConnector {
    static connect() {
        const connectionString = process.env.DATABASE_URL;        

        DBConnector._connection = db.createConnection(connectionString, {
            useNewUrlParser: true,
            autoReconnect: true,
            useUnifiedTopology: true
        });
    }

    static close() {
        db.disconnect();
    }
 
    static get connection() {
        return DBConnector._connection;
    }
}

module.exports = DBConnector;