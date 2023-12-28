import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/AuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other slices here if needed
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
