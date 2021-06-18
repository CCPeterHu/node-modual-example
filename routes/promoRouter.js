const express = require('express');
// const bodyPaser = require('body-parser');
const mongoose = require('mongoose');

const Promitions = require('../models/promotions');

const authenticate = require('../authenticate');

const promoRouter = express.Router();

//I dont use body paser since it is deprecated
// this is substitution
// promoRouter.use(express.urlencoded());
promoRouter.use(express.json());

//======================
// Uri: promotions/ 
//======================
promoRouter.route('/')
    .get((req, res, next) => {
        Promitions.find({})
            .then(promotions => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, err => next(err))
            .catch(err => next(err));
    })

    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promitions.create(req.body)
            .then(promotion => {
                console.log("Promotion Created", promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch(err => next(err));
    })


    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promitions.deleteMany({})
            .then(resp => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, err => next(err))
            .catch(err => next(err));
    });

//=======================
// promitions/:promoId
//=======================

promoRouter.route('/:promoId')
    .get((req, res, next) => {
        Promitions.findById(req.params.promoId)
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, err => next(err))
            .catch(err => next(err));
    })

    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promitions/' + req.params.promoId);
    })

    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promitions.findByIdAndUpdate(req.params.promoId,
            { $set: req.body }, { new: true })
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, err => next(err))
            .catch(err => next(err));
    })

    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promitions.findByIdAndRemove(req.params.promoId)
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, err => next(err))
            .catch(err => next(err));
    });

module.exports = promoRouter;