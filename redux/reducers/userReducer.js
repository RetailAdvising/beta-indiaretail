
// // if(typeof window !== 'undefined'){
// const initialState = (typeof window !== 'undefined') ? {userid: localStorage['userid'],apikey: localStorage['apikey'],secret: localStorage['secret']} : {}
// // }
const userReducer = (state='',action) => {
    switch(action.type){
        case 'SET_USER':
            return state = action.payload;
        default:
            return state;
    }
}

export default userReducer;
