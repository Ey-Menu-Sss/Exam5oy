import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";

    const store = configureStore({
      reducer: {
        userDatas: userReducer,
      },
    });

export default store;
