
const routesReducer = (state={},action) =>{
    switch(action.type){
        case 'SET_ROUTE':
            return state = action.payload;
        default:
            return state;
    }
}

export default routesReducer;