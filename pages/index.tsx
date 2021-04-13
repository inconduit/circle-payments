import { useCallback, useState } from "react";

import PaymentsList from "../components/PaymentsList";
import PaymentFilter from "../types/PaymentFilter";
import PaymentFilterInput from "../components/PaymentFilterInput";

const IndexPage = () => {
  const [paymentFilters, setPaymentFilters] = useState<PaymentFilter[]>([]);
  const onChangeFilter = useCallback(
    (key, value) => {
      setPaymentFilters(
        paymentFilters
          .filter((filter) => filter.key !== key)
          .concat({ key, value })
      );
    },
    [paymentFilters, setPaymentFilters]
  );

  return (
    <>
      <div>Circle Payments</div>
      <br />
      <PaymentFilterInput filterKey="sender.name" onChange={onChangeFilter} />
      <PaymentFilterInput filterKey="receiver.name" onChange={onChangeFilter} />
      <PaymentFilterInput filterKey="amount" onChange={onChangeFilter} />
      <PaymentFilterInput filterKey="currency" onChange={onChangeFilter} />
      <PaymentFilterInput filterKey="memo" onChange={onChangeFilter} />
      <PaymentFilterInput filterKey="date" onChange={onChangeFilter} />

      <PaymentsList filters={paymentFilters} />
    </>
  );
};

export default IndexPage;
