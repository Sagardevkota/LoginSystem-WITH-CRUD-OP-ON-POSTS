
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
var cors = require('cors')
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const mysqlConnection=require('./connection');


const app = express();
const port = '5000'



app.use(bodyParser.json({type:'application/json'}));
app.use(express.urlencoded({extended:false}));

app.use(cors({'Access-Control-Allow-Headers': '*'}));
   app.disable('x-powered-by')

   app.post('/api/login',  (request, response) => {

   

    const user = {
        email: request.body.email,
        password: request.body.password
    }

    const tokenUser={
        email:request.body.email
    }

    console.log(user);
   


    let sql = "SELECT * FROM user_info WHERE email='" + user.email + "' AND password='" + user.password + "' ";

    mysqlConnection.query(sql,  (err, results) => {
            if (!err) {

               

                if (results.length > 0) {
                    //if there is one row
                    //create jwt token
                    jwt.sign({ tokenUser }, 'secret_key', (err, token) => {
 
                        if(!err){
                                  response.send({
                                "status": "ok",
                                "code": "Correct credentials",
                                "token": token
                               
                            })
                        }
                
                        else{
                
                            response.send("jwt token creation error is" + err);
                        }
                
                
                
                    });
                   


                }

                else {
                    response.send({

                        "status": "error",
                        "code": "Incorrect credentials",



                    });

                }



             
            }
            else {


                response.send("connection query error is" +err);

                response.destroy();
                mysqlConnection.end();
            }


        });




})

;



app.listen(port, () => console.log("App is listening on 5000"))

