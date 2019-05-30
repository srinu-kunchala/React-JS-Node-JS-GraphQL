import {API_ROOT} from '../../api';
import auth0Client from '../../Auth';
export function getProducts(dispatch, data){
    let catids_arr = JSON.stringify(data.data);        
        const queryBody = {
        query:`
            query{
                products(cat_id:${catids_arr}){                  
                    _id
                    name
                    description
                    price
                    discounted_price
                    image
                    image_2
                    thumbnail
                }
            }
        `  
        };                
        fetch(API_ROOT, {
            method : "POST",
            body : JSON.stringify(queryBody),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${auth0Client.getIdToken()}`
            }
        }).then(res=>{
            return res.json();
        }).then(products =>{ 
            dispatch({
                type : "GET_PRODUCTS",
                payload : products.data.products
            })
        }).catch(err =>{
            throw err;
        })
} 