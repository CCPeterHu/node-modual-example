const express = require('express');
const http = require('http');
const morgan = require('morgan')
const bodyPaser = require('body-parser');

//============
// get all the routers here
//============
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

//===========
//  server config 
//==========
const hostname = 'localhost';
const port = 3000;

//===========
// apply middleware to express
//===========
const app = express();
app.use(morgan('dev'));
app.use(bodyPaser.json());

//==========
// apply router to express app
//==========
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


// apply static pages inside public folder
app.use(express.static(__dirname + '/public'));

//==========
// default page of express app
//==========
app.use((req, res, next)=>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

//==========
// server setup
//==========
const server = http.createServer(app);

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}: ${port}`);
});