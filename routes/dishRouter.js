const express = require('express');
const bodyPaser = require('body-parser');

const dishRouter = express.Router();// this will declair dishRouther as express router

dishRouter.use(bodyPaser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    res.end('Will send all the dishes to you!');
})

.post((req, res, next) => {
    res.end('Will add the dish:' + req.body.name + ' with details: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.delete((req, res, next) => {
    res.end('Deleting all the dishes to you!');
});

module.exports = dishRouter;