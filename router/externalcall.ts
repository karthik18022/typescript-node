const express1 = require('express');

const externalRouter = express1.Router();

const {getExternalDataCall} = require('../service/externalService.ts')

externalRouter.get('/jira', getExternalDataCall);

module.exports= externalRouter;