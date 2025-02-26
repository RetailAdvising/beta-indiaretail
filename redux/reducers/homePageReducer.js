
// // if(typeof window !== 'undefined'){
// const initialState = (typeof window !== 'undefined') ? {userid: localStorage['userid'],apikey: localStorage['apikey'],secret: localStorage['secret']} : {}
// // }
const homePageReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DATA':
            // return state = [...state, ...action.payload]
            const updatedState = [...state, ...action.payload];

            // Use a Set to track unique section_ids
            const seenSectionIds = new Set();

            // Filter out duplicate objects based on section_id
            const uniqueState = updatedState.filter(item => {
                // If the section_id is already seen, skip this item
                if (seenSectionIds.has(item.section_id)) {
                    return false;
                }
                // Otherwise, add the section_id to the Set and include the item
                seenSectionIds.add(item.section_id);
                return true;
            });

            return state = uniqueState;
        default:
            return state;
    }
}

export default homePageReducer;
