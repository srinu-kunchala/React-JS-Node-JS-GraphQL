import {API_ROOT} from '../../api';
import auth0Client from '../../Auth';
export function getDepartmentCategories(dispatch, data){    
    const queryBody = {
        query:`
            query{
                categories(department_id:"${data.data}"){                  
                    _id
                    name
                    description
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
        }).then(categories =>{                                      
            dispatch({
                type : "GET_CATEGORIES",
                payload : categories.data.categories
            })
        }).catch(err =>{
            throw err;
        })
}