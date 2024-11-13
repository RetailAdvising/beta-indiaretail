import { createStore } from "@reduxjs/toolkit";
import rootReducers from './reducers/index'

const store  = createStore(rootReducers);

export default store;