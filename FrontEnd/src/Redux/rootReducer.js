import {combineReducers} from "redux"
import loginReducer from "./Login/LoginReducers";
import registerReducer from "./Register/RegisterReducer";
import posts from "./Post/PostReducers"

const rootReducer= combineReducers({
    login : loginReducer,
    register: registerReducer,
    posts
});

export default rootReducer
