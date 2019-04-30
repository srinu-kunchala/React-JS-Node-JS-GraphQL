const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-or-d8gpn.auth0.com/.well-known/jwks.json`
    }),  
    // Validate the audience and the issuer.
    audience: 'rYvvdsdd3hypHqA2VM2DCj35NHbwB0b5',
    issuer: `https://dev-or-d8gpn.auth0.com/`,
    algorithms: ['RS256']
  });

app.use('/graphql', 
  graphqlHttp({
    'schema': graphQLSchema,
    'rootValue' : graphQLResolvers,
    'graphiql' : true
    }));

mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`, { useNewUrlParser: true })
.then(()=>{
    app.listen(3001, ()=>{
        console.log('Server is running');
    });
})
.catch(err=>{
    throw err;
});