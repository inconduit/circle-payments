import { useCallback, useState } from "react";
import Select from "react-select";
import useFetch from "use-http";
import UserData from "../types/UserData";

type UserOption = {
  value: string;
  label: string;
};

const NewPaymentForm = () => {
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
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
  const [selectedFromUserId, setSelectedFromUserId] = useState<
    string | undefined
  >(undefined);
  const [selectedToUserId, setSelectedToUserId] = useState<string | undefined>(
    undefined
  );

  return (
    <>
      <Select
        instanceId="selectFromUser"
        options={userOptions}
        onChange={(option) => setSelectedFromUserId(option?.value)}
        placeholder="Select From User"
      />
      <Select
        instanceId="selectToUser"
        options={userOptions}
        onChange={(option) => setSelectedToUserId(option?.value)}
        placeholder="Select To User"
      />
    </>
  );
};

export default NewPaymentForm;
