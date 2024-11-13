const customerInfoReducer = (state={},action) =>{
    switch(action.type){
        case 'Set_CustomerInfo':
            return state = action.payload;
        default:
            return state;
    }
}

export default customerInfoReducer;