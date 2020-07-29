
const jwt = require('jsonwebtoken');
const express=require('express');
const Router=express.Router();
const mysqlConnection=require('./connection');

Router.post('/api/userInfo',verifyToken,(request,response)=>{

    //now verify token if it was issued by our server
    jwt.verify(request.token,'secret_key',(err,authData)=>{
  
      if(err){
  
          response.send("Invalid token")
      }
      else{
  
          response.json({
                 message:"Post created",
                 authData
                 
                              
          });
      }
  
  
  
    })
  
  
  })
  
  //get token from header
  function verifyToken(request, response, next) {
      const bearerHeader = request.headers['authorization'];
      //check bearer is undefined
  
      if (typeof bearerHeader !== 'undefined') {
          //split at space
          const bearer = bearerHeader.split(' ');
          //get token from array
          const bearerToken = bearer[1];
          //set the token
          request.token = bearerToken;
          //next middleware
          next();
      }
      else {
          response.sendStatus("separating token error");
      }
  }