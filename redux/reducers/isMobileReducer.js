const isMobileReducer = (state=false,action) =>{
    switch(action.type){
        case 'setIsMobile':
            return state = action.payload;
        default:
            return state;
    }
}

export default isMobileReducer;