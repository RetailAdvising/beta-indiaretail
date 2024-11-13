const initialState = {
    isOpen: false
  };
  
  const alertReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_DIALOG':
        return {
          ...state,
          isOpen: !state.isOpen
        };
      default:
        return state;
    }
  };
  
  export default alertReducer;
