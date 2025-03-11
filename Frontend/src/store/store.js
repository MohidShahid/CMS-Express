import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';


const store = configureStore({
    reducer: { // Add reducers here
        auth : authReducer,
        // user : userSlice.reducer,
        // post : postSlice.reducer,
        // comment : commentSlice.reducer,
        // like : likeSlice.reducer,
        // follow : followSlice.reducer,
        // notification : notificationSlice.reducer,
        // chat : chatSlice.reducer,
        // message : messageSlice.reducer,
        // search : searchSlice.reducer,
    } });

export default store;
// Compare this snippet from Frontend/src/store/userSlice.js: