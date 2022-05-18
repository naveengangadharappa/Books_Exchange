'use strict'
// autocannon -c 5000 -d 10 http://localhost:3000/BookExchange/

const autocannon = require('autocannon')

const instance = autocannon({
  url: 'http://localhost:3000',
  connections: 1000, //default 10                 //4000 98-291 timeouts 3500 94-110 timeout     8k requests in 10.88s, 4.55 MB read
                                                //405 errors (175 timeouts)
    //with cluster instances we can easily reach 5000 connections with 1 pipeline
  pipelining: 1, // default
  duration: 10, // default
  headers:{
    "content-type":"application/json"
  },
  requests:[
      {
          method:'POST',
          path:'/BookExchange/login',
          setupRequest:(req)=>{
            req.body=JSON.stringify({
                "choice":"login",
                "stu_id":"1BI16CS414",
                "stu_email":"neha@gmail.com",
                "stu_password":"1234567890",
                "device_details":"nnu",
                "Ip_Address":"192.193.98.29"
            });
              return req;
          }    
      }
  ]
}, console.log)

autocannon.track(instance);

// // async/await
// async function foo () {
//   const result = await autocannon({
//     url: 'http://localhost:3000',
//     connections: 10, //default
//     pipelining: 1, // default
//     duration: 10 // default
//   })
//   console.log(result)
// }