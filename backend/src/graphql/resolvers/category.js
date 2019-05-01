const Category = require('../../models/category');
const categoryResolver = {
    categories:()=> {
        return Category.find();
    },
    createCategory:(args)=>{       
        return Category.findOne({name:args.categoryInput.name})
        .then((category)=>{
            if(category){
                throw new Error('Category name already exists');
            }else{
                const category = new Category({
                    name : args.categoryInput.name,
                    description : args.categoryInput.description,
                    department_id : '5cc1b1d517b8fa4a3cbf4472'
                });
                return category.save();
            }
                    
        })
        .then(result=>{
            return { ...result._doc, _id:result._doc._id, department_id:result._doc.department_id}
        })
        .catch(err=>{
            throw err;
        })
    }
};
module.exports = categoryResolver;