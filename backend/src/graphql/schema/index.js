const {buildSchema} = require('graphql');
module.exports = buildSchema(`
    type User{
        _id:ID!
        name:String!
        email: String!
    }
    input UserInput{
        name:String!
        email:String!
    }
    type Department{
        _id:ID!
        name:String!
        description:String!
    }
    input DepartmentInput{
        name:String!
        description:String!
    }
    type Category{
        _id:ID!
        name:String!
        description:String!
        department_id:ID!
    }
    input CategoryInput{
        name:String!
        description:String!
    }
    type Product{
        _id:ID!
        name:String!
        description:String!
        price:String!
        discounted_price:String!
        image:String
        image_2:String
        thumbnail:String!
        cat_id:ID!
    }
    input ProductInput{
        name:String!
        description:String!
        price:String!
        discounted_price:String!
        image:String
        image_2:String
        thumbnail:String!
        cat_id:ID!
    }
    type RootQuery{
        users : [User!]!
        departments : [Department!]!
        categories(department_id:ID): [Category!]!
        products(cat_id:[ID]) : [Product!]!
    }
    type RootMutation{
        createUser(userInput: UserInput): User
        createDepartment(departmentInput: DepartmentInput) : Department
        createCategory(categoryInput : CategoryInput) : Category
        createProduct(productInput : ProductInput)  : Product 
    }
    schema {
        query:RootQuery
        mutation:RootMutation
    }
`);