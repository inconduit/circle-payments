import { configureStore } from "@reduxjs/toolkit";
import newPaymentsReducer from "../store/payments/newPaymentsSlice";

const store = configureStore({
  reducer: {
    newPayments: newPaymentsReducer,
  },
});

export default store;
