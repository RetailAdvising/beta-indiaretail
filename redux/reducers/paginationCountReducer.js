
// // if(typeof window !== 'undefined'){
// const initialState = (typeof window !== 'undefined') ? {userid: localStorage['userid'],apikey: localStorage['apikey'],secret: localStorage['secret']} : {}
// // }
const paginationCountReducer = (state = 2, action) => {
    switch (action.type) {
        case 'SET_COUNT':
            return state = state + 1
        default:
            return state;
    }
}

export default paginationCountReducer;
