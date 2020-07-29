const mysql = require('mysql');

const mysqlConnection = mysql.createConnection(
    {
       
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'smart_pasal',
        multipleStatements: true
    }


);

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("connected")

    }
    else {
        console.log("Connection failed");
    }
}

);

module.exports=mysqlConnection;
