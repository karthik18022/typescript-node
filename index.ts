import express, { Express, Request, Response } from 'express';

import { Sequelize } from 'sequelize';
import bodyParser from 'body-parser';
// import { getClient } from './config/dbconfig.js';
require('dotenv').config();
import Address from './models/Address';
import User from './models/User';
import ExternalData  from './models/ExternalData'
import swaggerDocs from './Utils/swagger';
const app: Express = express();
const UserEndpoint = require('./router/userRouter');
const externalCallEndpoint = require('./router/externalcall.ts')
const fileEndpoint = require('./router/fileUploadRouter')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse form data
app.use('/user', UserEndpoint);
app.use('/external', externalCallEndpoint);
app.use('/file', fileEndpoint);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  swaggerDocs(app, 8081);
});

    const sequelize = new Sequelize('type_db', 'postgres', 'demo', {
      host: 'localhost',
      dialect:  'postgres' 
    });

      Address.initModel(sequelize);
      User.initModel(sequelize);
      ExternalData.initModel(sequelize);
      
      sequelize.sync({

    }).then(result => {
      console.log('db connected');

  }).catch(err => {
    console.log('err', err)
  });
