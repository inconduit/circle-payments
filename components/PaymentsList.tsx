import { useState, useMemo } from "react";
import useFetch from "use-http";
import get from "lodash/get";

import useInterval from "../hooks/useInterval";
import PaymentData from "../types/PaymentData";
import PaymentFilter from "../types/PaymentFilter";
import {
  PaymentCol,
  PaymentRow,
  PaymentListContainer,
} from "./PaymentsList.styled";

const MAX_PAYMENTS_LIST_LENGTH = 25;

const PaymentsList = ({
  filters = [],
  newPayments = [],
}: {
  filters?: PaymentFilter[];
  newPayments?: PaymentData[];
}) => {
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
  const mergedAndSortedPayments = useMemo(
    () =>
      payments
        .concat(newPayments)
        .sort((paymentA, paymentB) => (paymentA.date < paymentB.date ? 1 : -1)),
    [payments, newPayments]
  );
  const filteredPayments = useMemo(() => {
    const allFilteredPayments = mergedAndSortedPayments.filter((payment) =>
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
  }, [filters, mergedAndSortedPayments, payments]);

  useInterval(() => setTickCount(tickCount + 1), 1000);

  if (filteredPayments.length === 0) {
    return <div style={{ textAlign: "center" }}>No Results</div>;
  }

  return (
    <div>
      <PaymentRow isHeader>
        <PaymentCol>Sender Name</PaymentCol>
        <PaymentCol>Receiver Name</PaymentCol>
        <PaymentCol flex="0.5">Amount</PaymentCol>
        <PaymentCol flex="0.5">Currency</PaymentCol>
      </PaymentRow>
      <PaymentListContainer>
        {filteredPayments.map(
          ({ id, sender, receiver, amount, currency }: PaymentData) => (
            <PaymentRow key={id}>
              <PaymentCol>{sender.name}</PaymentCol>
              <PaymentCol>{receiver.name}</PaymentCol>
              <PaymentCol flex="0.5">{amount}</PaymentCol>
              <PaymentCol flex="0.5">{currency}</PaymentCol>
            </PaymentRow>
          )
        )}
      </PaymentListContainer>
    </div>
  );
};

PaymentsList.defaultProps = {
  filters: [],
  newPayments: [],
};

export default PaymentsList;
