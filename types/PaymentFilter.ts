const filterKeys = [
  "date",
  "sender.name",
  "receiver.name",
  "amount",
  "currency",
  "memo",
] as const;

export type PaymentFilterKey = typeof filterKeys[number];

interface PaymentFilter {
  key: PaymentFilterKey;
  value: string;
}

export default PaymentFilter;
