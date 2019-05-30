import React, {Component} from "react";
import { getDepartmentCategories } from '../../redux/actions/category';
import { getAllDepartments } from '../../redux/actions/department';
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
        
        if((props.categories !== undefined && props.categories !== null)){ 
            if(this.state.data){            
                 if(props.categories === this.state.data)
                 {
                    let departmentName = props.match.params.departmentName;    
                    if(props.departments)
                    {
                        let dep = props.departments.find(o => o.name === departmentName);                
                        props.getDepartmentCategories({data:dep._id}); 
                    }
                    else{
                        props.getAllDepartments();
                    }        
                    
                 }
                 else
                 {
                    this.setState({data:props.categories,catID:null});
                 }
            }   
            else
            {
                this.setState({data:props.categories,catID:null});
            }
            
        }else{
            let departmentName = props.match.params.departmentName;            
            if(props.departments.length>0)
            {
                let dep = props.departments.find(o => o.name === departmentName);               
                props.getDepartmentCategories({data:dep._id});
            } 
            else
            {
                props.getAllDepartments();
            }           
             
        }
       
        
    }
    categoryClick(e){
        this.setState({catID:e.currentTarget.id});
    }
    render(){
        let categories=[]; 
        let departmentName = this.props.match.params.departmentName; 
        if(this.props.categories !== undefined){
            categories=this.props.categories;
        }
        let category_ids = [];          
    return(
        <div className="categoriesList container">
            <div className="row pt-5">
            <h2>{departmentName}</h2>
            <div style={{"float":"left", "marginTop": "76px", "marginLeft": "-122px", "paddingBottom": "10px" }}>
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
        getDepartmentCategories: (data) =>{return getDepartmentCategories(dispatch,data);},
        getAllDepartments:(data) =>{return getAllDepartments(dispatch,data);}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category); 