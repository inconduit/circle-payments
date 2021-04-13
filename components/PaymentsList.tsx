import { useState } from "react";
import useFetch from "use-http";

import useInterval from "../hooks/useInterval";
import PaymentData from "../types/PaymentData";

const MAX_PAYMENTS_LIST_LENGTH = 25;

const PaymentsList = () => {
  const [tickCount, setTickCount] = useState(0);
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const { error } = useFetch(
    // `count` is an unused query param that triggers the url dependency in useFetch hook
    `http://localhost:8080/payments?count=${tickCount}`,
    {
      onNewData: (_, newData) => {
        let newPayments = [newData.data].concat(payments);

        if (newPayments.length > MAX_PAYMENTS_LIST_LENGTH) {
          newPayments = newPayments.slice(0, MAX_PAYMENTS_LIST_LENGTH);
        }
        setPayments(newPayments);
      },
    },
    [tickCount]
  );

  useInterval(() => setTickCount(tickCount + 1), 1000);

  return (
    <>
      <div>Payments List</div>
      {payments.map(
        ({ id, sender, receiver, amount, currency }: PaymentData) => (
          <div key={id}>
            sender: {sender.name} receiver: {receiver.name} amount: {amount}{" "}
            currency: {currency}
          </div>
        )
      )}
    </>
  );
};

export default PaymentsList;
