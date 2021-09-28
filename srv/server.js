const cds = require('@sap/cds');
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false, // deactivate auth for all routes
  auth0Logout: true, // logout from IdP
  authorizationParams: {
    // required to retrieve JWT including permissions (our roles)
    response_type: 'code',
    scope: 'openid',
    audience: 'ssg-demo-api',
  },
};

cds.on("bootstrap", (app) => {
  // initialize openid-connect with auth0 configuration
  app.use(auth(config));

});

module.exports = cds.server;