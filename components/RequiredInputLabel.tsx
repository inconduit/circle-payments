import { InputLabel } from "./PaymentFilterInput.styled";

const RequiredInputLabel = ({
  fieldName,
  errors,
  ...props
}: {
  fieldName: string;
  errors: Record<string, any>;
}) => {
  const isInvalid = errors?.[fieldName]?.type === "required";

  return (
    <InputLabel htmlFor={`input-${fieldName}`} isError={isInvalid} {...props}>
      {fieldName} {isInvalid && "(required)"}
    </InputLabel>
  );
};

export default RequiredInputLabel;
