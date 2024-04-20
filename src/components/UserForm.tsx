import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import "../styles/form.css";

interface UserForm {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  address: string;
  isBuyer: boolean;
  profilePicture?: string;
}

interface UserFormErrors {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  city: string;
  country: string;
}

interface AddressForm {
  city: string;
  country: string;
}

const INITIAL_DATA: UserForm = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  address: "",
  isBuyer: false,
  password: "",
  confirmPassword: "",
};

const INITIAL_ERRORS: UserFormErrors = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
  city: "",
  country: "",
};

const INITIAL_ADDRESS: AddressForm = {
  city: "",
  country: "",
};

export default function UserForm() {
  const [form, setForm] = useState<UserForm>(INITIAL_DATA);
  const [address, setAddress] = useState<AddressForm>(INITIAL_ADDRESS);
  const [errors, setErrors] = useState<UserFormErrors>(INITIAL_ERRORS);
  const [sendingData, setSendingData] = useState(false);

  useEffect(() => {
    if (address.city || address.country) {
      setForm((form) => ({
        ...form,
        address: `${address.city}, ${address.country}`,
      }));
    }
  }, [address]);

  const handleFormChange = (name: string, value: any) => {
    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleAddressChange = (name: string, value: string) => {
    setAddress((address) => ({ ...address, [name]: value }));
  };

  const handleFormClear = () => {
    setForm(INITIAL_DATA);
    setAddress(INITIAL_ADDRESS);
    setErrors(INITIAL_ERRORS);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    validatePassword();
  };

  const validatePassword = () => {
    const errors_copy: UserFormErrors = { ...INITIAL_ERRORS };

    // first name validation
    if (!form.firstName) errors_copy.firstName = "first name is required";

    // last name validation
    if (!form.lastName) errors_copy.lastName = "last name is required";

    // email validation
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!form.email) errors_copy.email = "email is required";
    else if (!emailRegex.test(form.email)) {
      errors_copy.email = "invalid email pattern";
    }

    // username validation
    if (!form.userName) errors_copy.userName = "username is required";

    // password validation
    if (!form.password) errors_copy.password = "password is required";
    // else if (form.password.length < 8)
    //   errors_copy.password = "password length must be atleast 8";

    // confirm password validation
    if (!form.confirmPassword)
      errors_copy.confirmPassword = "password is required";
    else if (form.confirmPassword !== form.password)
      errors_copy.confirmPassword = "passwords don't match";

    // address validation
    if (!address.city) errors_copy.city = "city is required";
    if (!address.country) errors_copy.country = "country is required";

    setErrors(errors_copy);
  };

  return (
    <section className="min-h-[100vh] w-full flex flex-col items-center justify-center py-4">
      <div className="row justify-center">
        <div className=" !max-w-[80vw] flex flex-col items-center justify-center border border-gray-300 rounded-lg px-6 py-6 shadow-xl">
          <div className="pt-4 pb-2 w-full">
            <h5 className="text-center pb-0 text-3xl font-semibold mb-1 tracking-wider">
              Sign Up
            </h5>
            {/* {apiError && (
              <p className="text-center text-red-700 font-bold text-xs bg-red-200 py-3 mt-2">
                {apiError}
              </p>
            )} */}
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-3 w-full">
            <div className="flex gap-10 flex-col md:flex-row">
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex gap-3 flex-col sm:flex-row md:flex-col">
                  <FormInput
                    label="First Name"
                    value={form.firstName}
                    error={errors.firstName}
                    onChange={(e) =>
                      handleFormChange("firstName", e.target.value)
                    }
                  />

                  <FormInput
                    label="Last Name"
                    value={form.lastName}
                    error={errors.lastName}
                    onChange={(e) =>
                      handleFormChange("lastName", e.target.value)
                    }
                  />
                </div>

                <FormInput
                  label="Username"
                  value={form.userName}
                  error={errors.userName}
                  onChange={(e) => handleFormChange("userName", e.target.value)}
                />

                <FormInput
                  label="Email"
                  value={form.email}
                  error={errors.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                />

                <div className="flex gap-3 sm:flex-row flex-col">
                  <FormInput
                    label="City"
                    value={address.city}
                    error={errors.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                  />

                  <FormInput
                    label="Country"
                    value={address.country}
                    error={errors.country}
                    onChange={(e) =>
                      handleAddressChange("country", e.target.value)
                    }
                  />
                </div>

                <div className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    name="isBuyer"
                    id="isBuyer"
                    checked={form.isBuyer}
                    onChange={(e) =>
                      handleFormChange("isBuyer", e.target.checked)
                    }
                  />
                  <label htmlFor="isBuyer" className="">
                    Is Buyer
                  </label>
                </div>
              </div>

              <hr className="border-gray-400 block md:hidden" />

              <div className="flex flex-col gap-4 flex-1">
                <FormInput
                  label="Password"
                  value={form.password}
                  error={errors.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                  isPassword={true}
                />

                <FormInput
                  label="Confirm Password"
                  value={form.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={(e) =>
                    handleFormChange("confirmPassword", e.target.value)
                  }
                  isPassword={true}
                />

                <hr className="border-gray-400 block md:hidden mt-3" />

                <div>
                  <FormInput
                    label="Profile Picture (optional)"
                    value={form.profilePicture ?? ""}
                    onChange={(e) =>
                      handleFormChange("profilePicture", e.target.value)
                    }
                  />
                  {form.profilePicture && (
                    <div className="flex justify-center items-center py-3 border-2 mt-2 border-dashed border-gray-500">
                      <img
                        src={form.profilePicture}
                        alt="Picture Not Found"
                        className="max-h-[160px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <button
                className="bg-blue-600 text-white text-sm py-3 rounded w-full disabled:bg-blue-400 flex justify-center items-center"
                type="submit"
                disabled={sendingData}
              >
                {sendingData ? (
                  <Loader className="!border-t-transparent" />
                ) : (
                  "Submit"
                )}
              </button>
              <button
                className="bg-gray-600 text-white text-sm py-3 rounded w-full disabled:bg-gray-400 flex justify-center items-center mt-2"
                type="button"
                onClick={handleFormClear}
              >
                Clear
              </button>
              <div className="mt-2 text-sm">
                <span>Have an account?</span>
                &nbsp;
                <Link to={"/login"} className="text-blue-600 underline">
                  Log In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
