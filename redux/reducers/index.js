import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "./userReducer";
import routesReducer from "./routesReducer";
import paginationReducer from "./PaginationReducer";
import alertReducer from './alertReducer';
import customerInfoReducer from './customerInfoReducer';
import isMobileReducer from './isMobileReducer';
import commentsReducer from './commentsReducer';
import rolesReducer from './rolesReducer';
import homePageReducer from "./homePageReducer";
import paginationCountReducer from "./paginationCountReducer";

const rootReducer = combineReducers({
    user: userReducer,
    routes: routesReducer,
    pagination: paginationReducer,
    alert: alertReducer,
    customer:customerInfoReducer,
    comments:commentsReducer,
    role: rolesReducer,
    home: homePageReducer,
    page_no: paginationCountReducer
    // isMobile: isMobileReducer
})

export default rootReducer;