import React, {Component} from "react";
import {API_ROOT} from '../../api';
import auth0Client from '../../Auth';
import { getDepartmentCategories } from '../../redux/actions/category';
import { connect } from 'react-redux';
import Products from "../Products";
class Category extends Component{
    constructor(){
        super();
        this.state = {data:null, catID:null};
    }
    componentDidMount(){   
        this.categoriesInfo();
    }
    componentWillReceiveProps(props){
        this.categoriesInfo(props);
    }
    categoriesInfo(prop){
        let props=null;
        if(prop){
           props = prop;
        }else{
           props = this.props;
        }
        
        if((props.categories.data !== undefined && props.categories.data !== null)){ 
            if(this.state.data){            
                 if(props.categories.data === this.state.data)
                 {
                    let departmentName = props.match.params.departmentName;            
                    let dep = props.departments.data.find(o => o.name === departmentName);                
                    const queryBody = {
                    query:`
                        query{
                            categories(department_id:"${dep._id}"){                  
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
                        props.getDepartmentCategories({data:categories.data.categories});
                    }).catch(err =>{
                        throw err;
                    }) 
                 }
                 else
                 {
                    this.setState({data:props.categories.data,catID:null});
                 }
            }   
            else
            {
                this.setState({data:props.categories.data,catID:null});
            }
            
        } 
        else{
            let departmentName = props.match.params.departmentName;            
            let dep = props.departments.data.find(o => o.name === departmentName);                
            const queryBody = {
            query:`
                query{
                    categories(department_id:"${dep._id}"){                  
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
                props.getDepartmentCategories({data:categories.data.categories});
            }).catch(err =>{
                throw err;
            }) 
        }
       
        
    }
    categoryClick(e){
        this.setState({catID:e.currentTarget.id});
    }
    render(){
        let categories=[];  
        let departmentName = this.props.match.params.departmentName;            
        let dep = this.props.departments.data.find(o => o.name === departmentName);        
        if(this.props.categories.data !== undefined){
            categories=this.props.categories.data;
        }
        let category_ids = [];          
    return(
        <div className="categoriesList container">
            <div className="row pt-5">
            <h2>{departmentName}</h2>
            <div style={{"float":"left", "margin-top": "76px", "margin-left": "-122px", "padding-bottom": "10px" }}>
            {
                categories.map((categoriesList, index) =>(
                    category_ids.push(categoriesList._id),                       
                    <div key={index} id={categoriesList._id} onClick={this.categoryClick.bind(this)}>{categoriesList.name}</div>
                ))
            }
            </div>                            
            <Products cat_ids={this.state.catID !== null ? this.state.catID : category_ids } />
        </div>
        </div>
    )
    }
}
const mapStateToProps = (state)=>{
    return {
        categories:state.category.categories,
        departments:state.department.departments
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getDepartmentCategories: (data) =>{
            dispatch(getDepartmentCategories(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category); 