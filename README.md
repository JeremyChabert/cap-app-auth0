# Getting Started

Welcome to your new project.

## Repository tree

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide

## Authentication script
`auth.js`

```js
const cds = require("@sap/cds");
const { requiresAuth } = require("express-openid-connect");
const jsonwebtoken = require("jsonwebtoken");

// To debug this module set export DEBUG=cds-auth0
const DEBUG = cds.debug("cds-auth0");

// CAP user
const Auth0User = class extends cds.User {
  is(role) {
    DEBUG && DEBUG("Requested role: " + role);
    return role === "any" || this._roles[role];
  }
};

// the authentication function for CAP
function capAuth0(req, res, next) {
  if (!req.oidc.user) {
    DEBUG && DEBUG("No user");
    return next(Error());
  }

  // map token attributes to CAP user
  let capUser = {
    id: req.oidc.user.sub,
    _roles: ["authenticated-user"],
  };

  // retrieve permissions
  let jwtDecoded = jsonwebtoken.decode(req.oidc.accessToken.access_token);

  if (jwtDecoded.permissions) {
    capUser._roles.push(...jwtDecoded.permissions);
  }

  req.user = new Auth0User(capUser);

  DEBUG && DEBUG("capUser");
  DEBUG && DEBUG(capUser);

  next();
}

module.exports = [requiresAuth(), capAuth0]; 
```

`.env`

```txt
ISSUER_BASE_URL=<AUTH0_ISSUER_BASE_URL>
CLIENT_ID=<AUTH0_CLIENT_ID>
CLIENT_SECRET=<AUTH0_CLIENT_SECRET>

SECRET=A very long random string
BASE_URL=http://localhost:4004
```

## Next Steps

- Open a new terminal and run `cds watch` 
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

## Credits

https://blogs.sap.com/2021/08/06/sap-cap-with-social-login-and-rbac-using-auth0/

