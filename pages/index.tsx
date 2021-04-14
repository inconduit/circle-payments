import { useCallback, useState } from "react";

import PaymentsList from "../components/PaymentsList";
import PaymentFilter from "../types/PaymentFilter";
import PaymentFilterInput from "../components/PaymentFilterInput";
import {
  PageLayout,
  FiltersContainer,
  FiltersRow,
  PaymentsListContainer,
} from "../layouts/index.styled";

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
    <PageLayout>
      <FiltersContainer>
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
      </FiltersContainer>
      <PaymentsListContainer>
        <PaymentsList filters={paymentFilters} />
      </PaymentsListContainer>
    </PageLayout>
  );
};

export default IndexPage;
