import { useEffect, useState } from "react";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [apiError, setApiError] = useState();
  const [sendingData, setSendingData] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (emailTouched) validateEmail();
  }, [email]);

  useEffect(() => {
    if (passwordTouched) validatePassword();
  }, [password]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      setApiError(undefined);
      sendAuthRequest(email, password);
    }
  };

  const validateEmail = (): boolean => {
    if (email.length === 0) {
      setEmailError("email is required");
      return false;
    }

    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!emailRegex.test(email)) {
      setEmailError("invalid email pattern");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePassword = (): boolean => {
    if (password.length === 0) {
      setPasswordError("password is required");
      return false;
    }

    if (password.length < 8) {
      setPasswordError("password length is too short");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setEmailTouched(true);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
  };

  const sendAuthRequest = (email: string, password: string) => {
    setSendingData(true);
  };

  return (
    <>
      <section className="h-[100vh] w-full flex flex-col items-center justify-center py-4">
        <div className="row justify-center">
          <div className="w-[350px] flex flex-col items-center justify-center border border-gray-300 rounded-lg px-4 py-6 shadow-xl">
            <div className="pt-4 pb-2">
              <h5 className="text-center pb-0 text-xl font-semibold mb-1 tracking-wider">
                Login to Your Account
              </h5>
              {!apiError && (
                <p className="text-center mb-0 text-xs">
                  Enter your email & password to login
                </p>
              )}
              {apiError && (
                <p className="text-center text-red-600 font-bold text-xs">
                  {apiError}
                </p>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 mt-3 w-full"
            >
              <div className="">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="flex input-group">
                  <input
                    type="text"
                    name="username"
                    className={`input ${
                      !emailTouched
                        ? ""
                        : emailError.length > 0
                        ? "invalid"
                        : "valid"
                    }`}
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError.length > 0 && (
                    <div className="error_text">{emailError}</div>
                  )}
                </div>
              </div>

              <div className="">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="flex input-group flex-row">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`input rounded-r-none ${
                      !passwordTouched
                        ? ""
                        : passwordError.length > 0
                        ? "invalid"
                        : "valid"
                    }`}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <div
                    className="block bg-teal-900 rounded rounded-l-none  px-3"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    <button className="w-[17px] h-full" type="button">
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          fill="white"
                        >
                          <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                          fill="white"
                        >
                          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {passwordError.length > 0 && (
                  <div className="error_text text-left">{passwordError}</div>
                )}
              </div>
              <div className="mt-2">
                <button
                  className="bg-blue-600 text-white text-sm py-3 rounded w-full disabled:bg-blue-400"
                  type="submit"
                  disabled={sendingData}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
