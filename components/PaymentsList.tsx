import { useState, useMemo } from "react";
import useFetch from "use-http";
import get from "lodash/get";

import useInterval from "../hooks/useInterval";
import PaymentData from "../types/PaymentData";
import PaymentFilter from "../types/PaymentFilter";

const MAX_PAYMENTS_LIST_LENGTH = 10;

const PaymentsList = ({ filters = [] }: { filters?: PaymentFilter[] }) => {
  const [tickCount, setTickCount] = useState(0);
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const { error } = useFetch(
    // `count` is an unused query param that triggers the url dependency in useFetch hook
    `http://localhost:8080/payments?count=${tickCount}`,
    {
      onNewData: (_, newData) => setPayments([newData.data].concat(payments)),
    },
    [tickCount]
  );
  const filteredPayments = useMemo(() => {
    const allFilteredPayments = payments.filter((payment) =>
      filters.every(
        (filter) =>
          filter.value === "" ||
          get(payment, filter.key)
            .toLowerCase()
            .includes(filter.value.toLowerCase())
      )
    );

    return allFilteredPayments.length > MAX_PAYMENTS_LIST_LENGTH
      ? allFilteredPayments.slice(0, MAX_PAYMENTS_LIST_LENGTH)
      : allFilteredPayments;
  }, [filters, payments]);

  useInterval(() => setTickCount(tickCount + 1), 1000);

  if (filteredPayments.length === 0) {
    return <div>No Results</div>;
  }
  return filteredPayments.map(
    ({ id, sender, receiver, amount, currency }: PaymentData) => (
      <div key={id}>
        sender: {sender.name} receiver: {receiver.name} amount: {amount}{" "}
        currency: {currency}
      </div>
    )
  );
};

PaymentsList.defaultProps = {
  filters: [],
};

export default PaymentsList;
