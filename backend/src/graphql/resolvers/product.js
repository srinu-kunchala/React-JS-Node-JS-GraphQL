const Product = require("../../models/product");
const productResolver = {
    products:(args)=>{    
        let cat_ids = args.cat_id;    
        return Product.find({'cat_id':{ $in: cat_ids }}).then(product =>{
            return product;
        }).catch(err=>{
            throw err;
        })
    },
    createProduct:(args)=>{       
        return Product.findOne({name:args.productInput.name})
        .then((product)=>{
            if(product){
                throw new Error('Product already exists');
            }else{
                const product = new Product({
                    name : args.productInput.name,
                    description : args.productInput.description,
                    price : args.productInput.price,                   
                    discounted_price : args.productInput.discounted_price,
                    image : args.productInput.image,
                    image_2 : args.productInput.image_2,
                    thumbnail : args.productInput.thumbnail,        
                    cat_id : args.productInput.cat_id
                });
                return product.save();
            }
                    
        })
        .then(result=>{
            return { ...result._doc, _id:result._doc._id, cat_id:result._doc.cat_id}
        })
        .catch(err=>{
            throw err;
        })
    }
}
module.exports = productResolver;
