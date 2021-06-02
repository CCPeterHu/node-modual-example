const express = require('express');
const bodyPaser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyPaser.json());

// root of leaders subdivition
leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res) =>{
    res.end('Will send all leaders to you!');
})

.post((req, res) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})

.delete((req, res) => {
    res.end('Deleting all the leaders to you!');
});

//=======================
// leaders/:leaderId
//=======================

leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    res.end('Will send detaills of the leader:' + req.params.leaderId + ' to you!');
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})

.put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId + "\n");
    res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.discription);
})

.delete((req, res, next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;