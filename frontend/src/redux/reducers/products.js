const productsReducer = (state={
    products:[]
}, action)=>{
    switch(action.type){
        case "GET_PRODUCTS":
            state={
                ...state,
                products : action.payload
            }

            default:
                return state;
    }
}
export default productsReducer;