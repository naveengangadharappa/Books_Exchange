const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  swaggerDefinition: {
    info: {
      title: 'BookExchange API Services Documentation',
      version: '1.0.0',
      description: 'All APi services documentation for the Book Exchange',
    },
  },
  apis: ['./Routs/Common_Routs','./Routs/Auth_Routs.js'], // Path to your API route files
  //apis: ['./Routs/Common_Routs','./Routs/Auth_Routs.js','./Routs/File_Routs','./Routs/Order_Routs','./Routs/Book_Routs'], // Path to your API route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;