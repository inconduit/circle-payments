import { PaymentFilterKey } from "../types/PaymentFilter";

const PaymentFilterInput = ({
  filterKey,
  onChange,
}: {
  filterKey: PaymentFilterKey;
  onChange: (aKey: string, value: string) => void;
}) => (
  <>
    <label htmlFor={`filter-${filterKey}`}>
      {filterKey.split(".").join(" ")}:
      <input
        id={`filter-${filterKey}`}
        placeholder="Type text"
        onChange={(event) => onChange(filterKey, event.currentTarget.value)}
      />
    </label>
  </>
);

export default PaymentFilterInput;
