const Department = require('../../models/department');

const departmentResolver = {
    departments: () =>{
        return Department.find();
    },
    createDepartment:(args) => {        
        return Department.findOne({name:args.departmentInput.name})
        .then((department)=>{
            if(department){
                throw new Error('Department name already exists');
            }else{                
                const department = new Department({
                    name : args.departmentInput.name,
                    description : args.departmentInput.description
                });
                return department.save();
            }            
        })
        .then(result => {
            return {...result._doc, _id:result._doc._id}
        })
        .catch(err=>{
            throw err;
        });
    }
}
module.exports = departmentResolver;