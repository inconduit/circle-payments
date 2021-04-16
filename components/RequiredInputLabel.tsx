import { InputLabel } from "./PaymentFilterInput.styled";

const RequiredInputLabel = ({
  fieldName,
  errors,
  ...props
}: {
  fieldName: string;
  errors: Record<string, any>;
}) => {
  const isRequiredInvalid = errors?.[fieldName]?.type === "required";
  const isPatternInvalid =
    !isRequiredInvalid && errors?.[fieldName]?.type === "pattern";
  const patternMessage = isPatternInvalid && errors?.[fieldName]?.message;

  return (
    <InputLabel
      htmlFor={`input-${fieldName}`}
      isError={isRequiredInvalid || isPatternInvalid}
      {...props}
    >
      {fieldName} {isRequiredInvalid && "(required)"}{" "}
      {isPatternInvalid && patternMessage}
    </InputLabel>
  );
};

export default RequiredInputLabel;
