import {Express, Request, Response} from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const options: swaggerJsDoc.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title : "Rest API"
        },
        // components: {
        //     securitySechmas: {
        //         bearerAuth: {
        //             type: 'http',
        //             scheme: 'bearer',
        //             bearerFormat: 'JWT' 
        //         }
        //     }
        // },
        // security: [{
        //     bearerAuth: [],
        // }]
    },
    apis : ['./router/userRouter.ts']
}

const swaggerSpec = swaggerJsDoc(options)

function swaggerDocs (app: Express, port:number) {
    //swagger page
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

    //Docs in JSON format
    app.get('/docs.json', (req: Request, res: Response) => {

        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec)
    })
    console.log('docs available')
}

export default swaggerDocs;