import { useCallback, useState } from "react";
import { PaymentFilterKey } from "../types/PaymentFilter";
import {
  ClearButton,
  InputContainer,
  InputLabel,
} from "./PaymentFilterInput.styled";

const PaymentFilterInput = ({
  filterKey,
  onChange,
}: {
  filterKey: PaymentFilterKey;
  onChange: (aKey: string, value: string) => void;
}) => {
  const [value, setValue] = useState("");
  const handleChangeInput = useCallback(
    (event) => {
      setValue(event.currentTarget.value);
      onChange(filterKey, event.currentTarget.value);
    },
    [onChange, setValue, filterKey]
  );
  const onClickClearButton = useCallback(() => {
    setValue("");
    onChange(filterKey, "");
  }, [onChange, setValue, filterKey]);

  return (
    <InputContainer>
      <InputLabel htmlFor={`filter-${filterKey}`}>
        {filterKey.split(".").join(" ")}
      </InputLabel>
      <input
        id={`filter-${filterKey}`}
        placeholder="Type text"
        onChange={handleChangeInput}
        value={value}
      />
      {value && (
        <ClearButton onClick={onClickClearButton}>{"\u2715"}</ClearButton>
      )}
    </InputContainer>
  );
};

export default PaymentFilterInput;
