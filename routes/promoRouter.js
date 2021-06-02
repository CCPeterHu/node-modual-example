const express = require('express');
const bodyPaser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyPaser.json());

// root of promotions subdivition
promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res) =>{
    res.end('Will send all promotions to you!');
})

.post((req, res) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})

.delete((req, res) => {
    res.end('Deleting all the promitions to you!');
});

//=======================
// promitions/:promoId
//=======================

promoRouter.route('/:promoId')
.get((req, res, next) => {
    res.end('Will send detaills of the promition:' + req.params.promoId + ' to you!');
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promitions/' + req.params.promoId);
})

.put((req, res, next) => {
    res.write('Updating the promotion: ' + req.params.promoId + "\n");
    res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});

module.exports = promoRouter;