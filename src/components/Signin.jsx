import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [formValid, setFormValid] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    validateEmail(value);
  };

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!value.trim()) {
      setEmailError("Email cannot be empty.");
      return false;
    } else if (!emailPattern.test(value)) {
      setEmailError("Invalid email format.");
      return false;
    } else {
      setEmailError(null);
      return true;
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    validatePassword(value);
  };

  const validatePassword = (value) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value.trim()) {
      setPasswordError("Password cannot be empty.");
      return false;
    } else if (!passwordPattern.test(value)) {
      setPasswordError(
        "Password must contain atleast 8 characters, one uppercase, one lowercase, one number, one special character."
      );
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };

  const reset = (event) => {
    event.preventDefault();

    setEmail("");
    setEmailError(null);

    setPassword("");
    setPasswordError(null);

    setFormValid(false);
  };

  const signin = async (event) => {
    event.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (
        !isEmailValid ||
        !isPasswordValid
      ) {
        setFormValid(false);
      } else {
        const request = {
            email: email,
            password: password
        };
        const response = await axios.post("https://blgczn97se.execute-api.us-east-1.amazonaws.com/prod/signin", request);
        if (response.status === 200) {
            setFormValid(true);
            setTimeout(() => {
                navigate(`/profile?email=${email}`);
            }, 3000);
        } else {
            setFormValid(false);
        }
      }
  };

  return (
    <form action={signin}>
      <div className="h-screen flex justify-center items-center">
        <div className="w-1/3 border rounded-3xl border-gray-900/10 shadow-xl p-6">
          {formValid && (
            <div
              id="toast-success"
              className="flex items-center w-full max-w-xs p-4 mb-4 text-green-700 bg-green-200 rounded-lg shadow"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-700 bg-green-200 rounded-lg">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">
                Signin Successful!
              </div>
            </div>
          )}
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Signin
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {emailError && <div className="text-red-600">{emailError}</div>}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
            <div className="sm:col-span-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {passwordError && (
                <div className="text-red-600">{passwordError}</div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={reset}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Reset
            </button>
            <button
              type="submit"
              onClick={signin}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
                Don't have an account?
                <a href="/register" className="text-blue-600 underline">Register here</a>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signin;
