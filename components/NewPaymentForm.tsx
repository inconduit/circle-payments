import { useCallback, useState } from "react";
import Select from "react-select";
import useFetch from "use-http";
import { useForm, Controller } from "react-hook-form";

import UserData from "../types/UserData";
import UserOption from "../types/UserOption";
import { currencies } from "../types/Currency";
import { customSelectStyles } from "./NewPaymentForm.styled";

const currencyOptions = currencies.map((currency) => ({
  value: currency,
  label: currency,
}));

// TODO ensure unique ID against existing payment ids
const generateUniqueUserId = () => Math.random().toString(36).substr(2, 9);

const NewPaymentForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const paymentsPost = useFetch("http://localhost:8080/payments");
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
        id: generateUniqueUserId(),
        date: new Date().toISOString(),
        sender: { id: data.sender.value, name: data.sender.label },
        receiver: { id: data.receiver.value, name: data.receiver.label },
        amount: data.amount,
        currency: data.currency.value,
        memo: data.memo,
      };
      // TODO handle errors and retries on 503
      paymentsPost.post(postData);
    },
    [paymentsPost]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="sender"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              instanceId="selectFromUser"
              options={userOptions}
              placeholder="Select Sender"
              styles={customSelectStyles}
              {...field}
            />
          )}
        />
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
              {...field}
            />
          )}
        />
        <input
          placeholder="Enter amount"
          {...register("amount", { pattern: /\d+/ })}
        />
        <Controller
          name="currency"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              instanceId="selectCurrency"
              options={currencyOptions}
              placeholder="Select Currency"
              styles={customSelectStyles}
              {...field}
            />
          )}
        />
        <input placeholder="Enter memo" {...register("memo")} />
        <input type="submit" />
      </form>
    </>
  );
};

export default NewPaymentForm;
