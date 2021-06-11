const express = require('express');
// const bodyPaser = require('body-parser');
const mongoose = require('mongoose');

const leaderRouter = express.Router();
const Leaders = require('../models/leaders');

const authenticate = require('../authenticate');

//this is substitution
// leaderRouter.use(express.urlencoded());
leaderRouter.use(express.json());

// root of leaders subdivition
leaderRouter.route('/')
    .get((req, res) => {
        Leaders.find({})
            .then(leaders => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, err => next(err))
            .catch(err => next(err));
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        Leaders.create(req.body)
            .then(leader => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, err => next(err))
            .catch(err => next(err));
    })

    .put(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })

    .delete(authenticate.verifyUser, (req, res) => {
        Leaders.deleteMany({})
            .then(resp => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, err => next(err) )
            .catch (err => next(err) );
    });

//=======================
// leaders/:leaderId
//=======================

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
            .then(leader => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, err => next(err) )
            .catch( err => next(err) );
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })

    .put(authenticate.verifyUser, (req, res, next) => {
       Leaders.findByIdAndUpdate(req.params.leaderId, 
        { $set: req.body }, { new : true })
        .then(leader => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, err => next(err ) )
        .catch( err => next(err) );
        
    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then(leader => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, err => next(err) )
            .catch( err =>next(err) ); 

    });

module.exports = leaderRouter;