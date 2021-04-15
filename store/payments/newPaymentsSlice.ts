import { createSlice, Draft } from "@reduxjs/toolkit";

import PaymentData from "../../types/PaymentData";

interface NewPaymentsState {
  value: Array<PaymentData>;
}

const initialState: NewPaymentsState = {
  value: [],
};

export const newPaymentsSlice = createSlice({
  name: "newPayments",
  initialState,
  reducers: {
    addPayment: (state: Draft<NewPaymentsState>, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = state.value.concat(action.payload);
    },
  },
});

export default newPaymentsSlice.reducer;
export const { addPayment } = newPaymentsSlice.actions;
export const selectNewPayments = (state: { newPayments: NewPaymentsState }) =>
  state.newPayments.value;
export const selectNewPaymentIds = (state: { newPayments: NewPaymentsState }) =>
  state.newPayments.value.map(({ id }) => id);
