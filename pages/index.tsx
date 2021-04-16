import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import NewPaymentForm from "../components/NewPaymentForm";
import PaymentsList from "../components/PaymentsList";
import PaymentFilter from "../types/PaymentFilter";
import PaymentFilterInput from "../components/PaymentFilterInput";
import {
  addPayment,
  selectNewPayments,
} from "../store/payments/newPaymentsSlice";
import {
  PageLayout,
  RoundedBorderContainer,
  FiltersRow,
  PaymentsListContainer,
} from "../layouts/index.styled";
import PaymentData from "../types/PaymentData";

const IndexPage = () => {
  const dispatch = useDispatch();
  const newPayments = useSelector(selectNewPayments);
  const [paymentFilters, setPaymentFilters] = useState<PaymentFilter[]>([]);
  const onChangeFilter = useCallback(
    (key, value) => {
      const updatedPaymentFilters = paymentFilters.filter(
        (filter) => filter.key !== key
      );
      setPaymentFilters(
        value
          ? updatedPaymentFilters.concat({ key, value })
          : updatedPaymentFilters
      );
    },
    [paymentFilters, setPaymentFilters]
  );
  const dispatchAddPayment = useCallback(
    (payment: PaymentData) => dispatch(addPayment(payment)),
    [dispatch]
  );

  return (
    <PageLayout>
      <RoundedBorderContainer>
        <h5>New Payment</h5>
        <NewPaymentForm onAddPayment={dispatchAddPayment} />
      </RoundedBorderContainer>

      <RoundedBorderContainer>
        <h5>Filters</h5>
        <FiltersRow>
          <PaymentFilterInput
            filterKey="sender.name"
            onChange={onChangeFilter}
          />
          <PaymentFilterInput
            filterKey="receiver.name"
            onChange={onChangeFilter}
          />
          <PaymentFilterInput filterKey="amount" onChange={onChangeFilter} />
        </FiltersRow>
        <FiltersRow>
          <PaymentFilterInput filterKey="currency" onChange={onChangeFilter} />
          <PaymentFilterInput filterKey="memo" onChange={onChangeFilter} />
          <PaymentFilterInput filterKey="date" onChange={onChangeFilter} />
        </FiltersRow>
      </RoundedBorderContainer>
      <PaymentsListContainer>
        <PaymentsList filters={paymentFilters} newPayments={newPayments} />
      </PaymentsListContainer>
    </PageLayout>
  );
};

export default IndexPage;
