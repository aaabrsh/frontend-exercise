import UserForm from "../components/UserForm";
import { UserFormData } from "../type/interfaces";

export default function Signup() {
  const submitData = (data: UserFormData) => {
    console.log(data);
  };

  return (
    <>
      <div>
        <UserForm onSubmit={submitData} />
      </div>
    </>
  );
}
