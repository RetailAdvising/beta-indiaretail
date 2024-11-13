const paginationReducer = (state=false,action) =>{
    switch(action.type){
        case 'SET_PAGINATION':
            return state = action.payload;
        default:
            return state;
    }
}

export default paginationReducer;