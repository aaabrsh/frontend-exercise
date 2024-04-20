import { useState } from "react";
import UserForm from "../components/UserForm";
import { UserFormData } from "../type/interfaces";

export default function Signup() {
  const [sendingData, setSendingData] = useState(false);

  const submitData = (data: UserFormData) => {
    setSendingData(true);
    console.log(data);
  };

  return (
    <>
      <div>
        <UserForm
          title="Sign Up"
          onSubmit={submitData}
          isLoading={sendingData}
        />
      </div>
    </>
  );
}
