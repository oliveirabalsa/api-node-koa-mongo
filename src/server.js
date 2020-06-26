if (!process.env.PRODUCTION) {
    require('dotenv').config();
}

const db = require('./_shared/database/database.connector.js');

db.connect();

const App = require('./app');

const listenPort = process.env.PORT || 3777;

App.listen(listenPort);

console.log('Server is running on port ' + listenPort);