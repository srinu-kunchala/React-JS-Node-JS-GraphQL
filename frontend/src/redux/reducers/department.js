const departmentReducer = (state={
    departments : []
},action)=>{
    switch(action.type){
        case "GET_DEPARTMENTS":
        state = {
            ...state,
            departments : action.payload
        }
        default:
        return state;
    }
}

export default departmentReducer;