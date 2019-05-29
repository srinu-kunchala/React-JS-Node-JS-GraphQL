const userAuthResolver = require('./userauth');
const departmentResolver = require('./department');
const categoryResolver = require('./category');
const productResolver = require('./product');
const rootResolver = {
    ...userAuthResolver,
    ...departmentResolver,
    ...categoryResolver,
    ...productResolver
}
module.exports = rootResolver;