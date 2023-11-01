"use strict";
const express = require('express');
const externalRouter = express.Router();
const { getExternalDataCall } = require('../service/externalService.ts');
externalRouter.get('/jira', getExternalDataCall);
module.exports = externalRouter;
