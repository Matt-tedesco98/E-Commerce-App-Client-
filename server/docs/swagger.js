const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'Simple shopping cart & ordering API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./routes/*'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;