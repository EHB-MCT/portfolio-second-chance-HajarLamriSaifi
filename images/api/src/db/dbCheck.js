const db = require('./connections');

const checkDatabaseConnection = () => {
    return db.raw('SELECT 1+1 AS value')
        .then(result => {
            console.log(`Database connected successfully with value: ${result.rows[0].value}`);
        })
        .catch(err => {
            console.error('Error connecting to the database', err);
        });
};

module.exports = checkDatabaseConnection;
