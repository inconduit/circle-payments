import UserData from "./UserData";

interface PaymentData {
  id: string;
  date: string;
  sender: UserData;
  receiver: UserData;
  amount: string;
  currency: string;
  memo?: string;
}

export default PaymentData;
