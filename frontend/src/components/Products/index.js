import React, { Component} from "react";
import {connect} from "react-redux";
import {getProducts} from "../../redux/actions/products";
import {API_ROOT, SERVER_ROOT} from '../../api';
import auth0Client from '../../Auth';
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
        if((props.products.data !== undefined && props.products.data !== null)){ 
            if(this.state.data){            
                if(props.products.data === this.state.data)
                {
                    let catids_arr = JSON.stringify(props.cat_ids);        
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
                        this.props.getProducts({data:products.data.products});
                    }).catch(err =>{
                        throw err;
                    }) 
                }
                else
                {
                   this.setState({data:props.products.data,catID:null});
                }
           }   
           else
           {
               this.setState({data:props.products.data,catID:null});
           }
           
       } 
       else{
        let catids_arr = JSON.stringify(props.cat_ids);        
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
            this.props.getProducts({data:products.data.products});
        }).catch(err =>{
            throw err;
        }) 
       }
    }
    addtoCart(e){
        console.log(e);
    }
    render(){
        let products = [];
        if(this.props.products.data !== undefined){
            products=this.props.products.data;
        }       
        return(             
            <div className="row">                       
             {
                    products.map((productsList, index) =>(                                              
                        <div className="product_single_block col-md-6 col-lg-3 item pb-3">
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
                            <Button onClick={this.addtoCart.bind(this)}>Add to cart</Button>
                            {/* <button className="btn btn-sm" onClick={this.addtoCart.bind(this)}>
                                Add to cart
                            </button> */}
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
        getProducts : (data)=>{
            dispatch(getProducts(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);