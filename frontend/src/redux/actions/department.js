import {API_ROOT} from '../../api';
import auth0Client from '../../Auth';

// export function getDepartments(data){
//     return {
//         type : "GET_DEPARTMENTS",
//         payload : data
//     }
// }

export function getAllDepartments(dispatch){
    const queryBody = {
        query : `
            query{
                departments{
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
        }).then(departments =>{                                                
            dispatch({
                type : "GET_ALL_DEPARTMENTS",
                payload : departments.data.departments
            })
        }).catch(err =>{
            throw err;
        })
    
}