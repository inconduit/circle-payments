import styled from "styled-components";
import { PaymentFilterKey } from "../types/PaymentFilter";

const InputContainer = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 0.1rem 0.2rem;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  font-size: 0.7rem;
  top: -14px;
  text-transform: capitalize;
`;

const PaymentFilterInput = ({
  filterKey,
  onChange,
}: {
  filterKey: PaymentFilterKey;
  onChange: (aKey: string, value: string) => void;
}) => (
  <InputContainer>
    <InputLabel htmlFor={`filter-${filterKey}`}>
      {filterKey.split(".").join(" ")}
    </InputLabel>
    <input
      id={`filter-${filterKey}`}
      placeholder="Type text"
      onChange={(event) => onChange(filterKey, event.currentTarget.value)}
    />
  </InputContainer>
);

export default PaymentFilterInput;
