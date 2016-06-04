"use strict";
const express = require('express');
const router = express.Router();
const passport = require('passport');

const API = require('../apis');

/* home page routes */
router.get('/', function(req, res) {
  res.end('index');
});

/* account routes */
router.get('/api/account/authenticated', API.account.authenticated);
router.get('/api/account/logout', API.account.logout);
router.post('/api/account/login', API.account.login);
router.post('/api/account/register', API.account.register);

module.exports = router;

