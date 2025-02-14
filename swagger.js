const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Create, update, get, and delete contact data through this API.'
  },
  host: 'cse341-project2-q9um.onrender.com',
  securityDefinitions: {
    oAuth: {
      type: 'oauth2',
      authorizationUrl: '/auth/google',
      flow: 'implicit',
      scopes: {}
    }
  }
};



const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);