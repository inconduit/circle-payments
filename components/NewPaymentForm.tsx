import { useCallback, useState } from "react";
import Select from "react-select";
import useFetch from "use-http";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";

import UserData from "../types/UserData";
import UserOption from "../types/UserOption";
import PaymentData from "../types/PaymentData";
import RequiredInputLabel from "./RequiredInputLabel";
import generateUniqueId from "../utils/generateUniqueId";
import {
  InputRow,
  customSelectStyles,
  SubmitButton,
  SpinnerContainer,
  SubmitContainer,
} from "./NewPaymentForm.styled";
import { InputContainer, InputLabel } from "./PaymentFilterInput.styled";
import { currencies } from "../types/Currency";
import { selectNewPaymentIds } from "../store/payments/newPaymentsSlice";
import Spinner from "./Spinner";

const currencyOptions = currencies.map((currency) => ({
  value: currency,
  label: currency,
}));

// Set the retry delay to 1 second to make the retries visible via the loading spinner
const POST_RETRY_DELAY = 1000;
const POST_RETRY_LIMIT = 10;

const NewPaymentForm = ({
  onAddPayment,
}: {
  onAddPayment: (payment: PaymentData) => void;
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const newPaymentIds = useSelector(selectNewPaymentIds);
  const paymentsPost = useFetch("http://localhost:8080/payments", {
    retries: POST_RETRY_LIMIT,
    retryOn: [503],
    retryDelay: POST_RETRY_DELAY,
  });
  const userFetch = useFetch(
    "http://localhost:8080/users",
    {
      onNewData: (_, newData) =>
        setUserOptions(
          newData.data.map((userData: UserData) => ({
            value: userData.id,
            label: userData.name,
          }))
        ),
    },
    []
  );

  const onSubmit = useCallback(
    (data) => {
      const postData = {
        id: generateUniqueId(newPaymentIds),
        date: new Date().toISOString(),
        sender: { id: data.sender.value, name: data.sender.label },
        receiver: { id: data.receiver.value, name: data.receiver.label },
        amount: Number(data.amount).toFixed(2),
        currency: data.currency.value,
        memo: data.memo,
      };

      paymentsPost.post(postData).then(() => {
        reset({
          sender: "",
          receiver: "",
          currency: "",
        });
        onAddPayment(postData);
      });
    },
    [paymentsPost, reset, onAddPayment, newPaymentIds]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputRow>
        <InputContainer>
          <RequiredInputLabel fieldName="sender" errors={errors} />
          <Controller
            name="sender"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                id="select-sender"
                instanceId="selectFromUser"
                options={userOptions}
                placeholder="Select Sender"
                styles={customSelectStyles}
                isSearchable={false}
                {...field}
              />
            )}
          />
        </InputContainer>
        <InputContainer>
          <RequiredInputLabel fieldName="receiver" errors={errors} />
          <Controller
            name="receiver"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                instanceId="selectToUser"
                options={userOptions}
                placeholder="Select Recipient"
                styles={customSelectStyles}
                isSearchable={false}
                {...field}
              />
            )}
          />
        </InputContainer>
      </InputRow>
      <InputRow>
        <InputContainer>
          <RequiredInputLabel fieldName="amount" errors={errors} />
          <input
            id="input-amount"
            placeholder="Enter amount"
            {...register("amount", { required: true, pattern: /\d+/ })}
          />
        </InputContainer>
        <InputContainer>
          <RequiredInputLabel fieldName="currency" errors={errors} />
          <Controller
            name="currency"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                id="select-currency"
                instanceId="selectCurrency"
                options={currencyOptions}
                placeholder="Select Currency"
                styles={customSelectStyles}
                isSearchable={false}
                {...field}
              />
            )}
          />
        </InputContainer>
      </InputRow>
      <InputContainer>
        <InputLabel htmlFor="input-memo">Memo</InputLabel>
        <input id="input-memo" placeholder="Enter memo" {...register("memo")} />
      </InputContainer>
      <SubmitContainer>
        <SubmitButton type="submit" disabled={paymentsPost.loading}>
          Send Payment
        </SubmitButton>
        <SpinnerContainer>
          {paymentsPost.loading && <Spinner />}
        </SpinnerContainer>
      </SubmitContainer>
    </form>
  );
};

export default NewPaymentForm;
