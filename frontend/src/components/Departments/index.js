import React, { Component} from 'react';
import auth0Client from '../../Auth';
import {API_ROOT} from '../../api';
import { connect } from 'react-redux';
import { getDepartments } from '../../redux/actions/department';
import { Link } from "react-router-dom";
class Department extends Component{
    constructor(){
        super();
        this.state = {data:null};
        
    }
    componentDidMount(){
        this.departmentsInfo();
    } 
    componentWillReceiveProps(){
        this.departmentsInfo();
    } 
    departmentsInfo(){
        if(this.props.departments.data !== undefined && this.props.departments.data !== null){
            this.setState({data:this.props.departments.data});  
        }
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
            if(!this.state.data){        
            fetch(API_ROOT, {
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
    }

render(){
    let departments=[];    
    if(this.props.departments.data !== undefined)
        departments=this.props.departments.data;
    return(
        <div className="departmentlist">
           <ul> {
                departments.map((departmentList, index) =>(                    
                    <li key={index} id={departmentList._id}><Link to={`/categories/${departmentList.name}`}>{departmentList.name}</Link></li>
                ))
            }
            </ul>
        </div>
    )
}
}

const mapStateToProps = (state) =>{
    return {
        departments:state.department.departments
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