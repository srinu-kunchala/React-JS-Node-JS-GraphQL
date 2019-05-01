import React, { Component} from 'react';
import auth0Client from '../../Auth';
import apiUrl from '../../api';
import { connect } from 'react-redux';
import { getDepartments } from '../../redux/actions/department';
class Department extends Component{
    constructor(){
        super();
        this.state = {data:[]};
    }
    async componentDidMount(){
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
        await fetch(apiUrl, {
            method:"POST",
            body : JSON.stringify(queryBody),            
            headers: {
                'Content-Type':'application/json', 
                'Authorization': `Bearer ${auth0Client.getIdToken()}` 
            }
        }).then(res=>{
            return res.json();
        }).then(departments =>{            
            this.props.getDepartments({data:departments.data.departments});
        }).catch(err =>{
            throw err;
        })
    }
render(){
    let departments=[];
    if(this.props.departments)
        departments=this.props.departments.data;
    return(
        <div className="departmentlist">
           <ul> {
                departments.map((departmentList, index) =>(
                    <li key={index} id={departmentList._id}>{departmentList.name}</li>
                ))
            }
            </ul>
        </div>
    )
}
}

const mapStateToProps = (state) =>{    
    return {
        departments:state.departments
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getDepartments: (data) =>{
            dispatch(getDepartments(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Department);