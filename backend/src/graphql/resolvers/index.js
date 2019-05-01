const userAuthResolver = require('./userauth');
const departmentResolver = require('./department');
const categoryResolver = require('./category');
const rootResolver = {
    ...userAuthResolver,
    ...departmentResolver,
    ...categoryResolver
}
module.exports = rootResolver;