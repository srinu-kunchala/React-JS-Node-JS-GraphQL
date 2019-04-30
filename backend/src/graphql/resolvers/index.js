const userAuthResolver = require('./userauth');
const departmentResolver = require('./department');
const rootResolver = {
    ...userAuthResolver,
    ...departmentResolver
}
module.exports = rootResolver;