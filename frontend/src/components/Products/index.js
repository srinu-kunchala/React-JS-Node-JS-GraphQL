import React, { Component} from "react";
import {connect} from "react-redux";
import {getProducts} from "../../redux/actions/products";
import { SERVER_ROOT} from '../../api';
import { LinkContainer } from "react-router-bootstrap";
import { Button } from 'react-bootstrap';
class Products extends Component{
    constructor(){
        super();
        this.state = {data:null}
    }
    componentDidMount(){        
        this.productsData();
    }
    componentWillReceiveProps(props){
        this.productsData(props);
    }
    productsData(prop){
        let props=null;
        if(prop){
           props = prop;
        }else{
           props = this.props;
        }
        if((props.products !== undefined && props.products !== null)){ 
            if(this.state.data){            
                if(props.products === this.state.data)
                {
                    props.getProducts({data:props.cat_ids});
                }
                else
                {
                   this.setState({data:props.products,catID:null});
                }
           }   
           else
           {
               this.setState({data:props.products,catID:null});
           }
           
       } 
       else{
        props.getProducts({data:props.cat_ids});
       }
    }
    addtoCart(e){
        let product_info =JSON.parse(e.currentTarget.getAttribute('product_details'));
        console.log(product_info._id);
        
    }
    render(){
        let products = [];
        if(this.props.products !== undefined){
            products=this.props.products;
        }       
        return(             
            <div className="row">                       
             {
                    products.map((productsList, index) =>(                                              
                        <div key={index} className="product_single_block col-md-6 col-lg-3 item pb-3">
                            <LinkContainer
                                to={
                                "/product/" +
                                productsList._id +
                                "/" +
                                productsList.name
                                }
                            >
                                <a>
                                <img
                                src={SERVER_ROOT + "images/product_images/" +productsList.image}
                                alt={SERVER_ROOT + "images/product_images/" +productsList.image}
                                />
                                </a>
                            </LinkContainer>
                            <LinkContainer
                                to={
                                "/product/" +
                                productsList._id +
                                "/" +
                                productsList.name
                                }
                            >
                                <a>
                                <h5 className="black pt-3">{productsList.name}</h5>{" "}
                                </a>
                            </LinkContainer>
                            <h3 className="red">
                                {"$"}                                    
                                {productsList.discounted_price !== undefined &&
                                productsList.discounted_price !== "0.00"
                                ? productsList.discounted_price
                                : productsList.price}
                            </h3>
                            <Button product_details={JSON.stringify(productsList)} onClick={this.addtoCart.bind(this)}>Add to cart</Button>                            
                        </div>
                    ))
                }
            </div>                          
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        products : state.products.products
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getProducts : (data)=>{return getProducts(dispatch, data);}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);