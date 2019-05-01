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
    }
    input CategoryInput{
        name:String!
        description:String!
    }
    type RootQuery{
        users : [User!]!
        departments : [Department!]!
        categories : [Category!]!
    }
    type RootMutation{
        createUser(userInput: UserInput): User
        createDepartment(departmentInput: DepartmentInput) : Department
        createCategory(categoryInput : CategoryInput) : Category
    }
    schema {
        query:RootQuery
        mutation:RootMutation
    }
`);