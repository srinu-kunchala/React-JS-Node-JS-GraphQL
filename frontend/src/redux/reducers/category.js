const categoryReducer = (state={
    categories : []
},action)=>{
    switch(action.type){
        case "GET_CATEGORIES":
        state = {
            ...state,
            categories : action.payload
        }
        default:
        return state;
    }
}

export default categoryReducer;