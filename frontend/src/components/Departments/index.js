import React, { Component} from 'react';
import { connect } from 'react-redux';
import { getAllDepartments} from '../../redux/actions/department';
import { Link } from "react-router-dom";
class Department extends Component{
    constructor(){
        super();
        this.state = {data:null};
        
    }
    componentDidMount(){
        this.departmentsInfo();
    } 
    // componentWillReceiveProps(){
    //     this.departmentsInfo();
    // } 
    departmentsInfo(){
        if(this.props.departments !== undefined && this.props.departments !== null){
            this.setState({data:this.props.departments});  
        }
        this.props.getAllDepartments(); 
    }

render(){
    let departments=[];    
    if(this.props.departments !== undefined)
        departments=this.props.departments;
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
        //getDepartments: (data) =>{ dispatch(getDepartments(data)); },
        getAllDepartments:(data) =>{getAllDepartments(dispatch,data);}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Department);