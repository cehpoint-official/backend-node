const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my Node.js + Express application',
    },
  },
  apis: ['index.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
