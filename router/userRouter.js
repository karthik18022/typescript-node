"use strict";
const { authenticateToken } = require("../auth/auth");
const express = require('express');
const userRouter = express.Router();
const { userCreation, login, userDetails, healthcheck } = require("../service/userService");
/**
* @openapi
*  /user/healthcheck:
*    get:
*      tags:
*        - Healthcheck
*      description: Responds if the app is up and running
*      responses:
*        '200':
*         description: App is up and running
*/
userRouter.get('/healthcheck', healthcheck);
/**
 * @openapi
 * /user/register:
 *   post:
 *     tags:
 *       - Register
 *     summary: Register a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User registration successful
 *       '400':
 *         description: Bad request

 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 */
userRouter.post('/register', userCreation);
userRouter.post('/login', login);
userRouter.get('/details', authenticateToken, userDetails);
module.exports = userRouter;
