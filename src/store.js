import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slice/apiSlice";
const store = configureStore({
    reducer:{
      starwars:apiReducer
    }
})

export default store;