import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(null);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const [formValid, setFormValid] = useState(false);

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);

    validateFirstName(value);
  };

  const validateFirstName = (value) => {
    if (!value.trim()) {
      setFirstNameError("First Name cannot be empty.");
      return false;
    } else if (!/^[a-zA-Z]*$/.test(value)) {
      setFirstNameError("First Name must only contain alphabets.");
      return false;
    } else {
      setFirstNameError(null);
      return true;
    }
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);

    validateLastName(value);
  };

  const validateLastName = (value) => {
    if (!value.trim()) {
      setLastNameError("Last Name cannot be empty.");
      return false;
    } else if (!/^[a-zA-Z]*$/.test(value)) {
      setLastNameError("Last Name must only contain alphabets.");
      return false;
    } else {
      setLastNameError(null);
      return true;
    }
  };

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

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);

    validateConfirmPassword(value);
  };

  const validateConfirmPassword = (value) => {
    if (!value.trim()) {
      setConfirmPasswordError("Confirm Password cannot be empty.");
      return false;
    } else if (value !== password) {
      setConfirmPasswordError(
        "Password and confirm password fields do not match."
      );
      return false;
    } else {
      setConfirmPasswordError(null);
      return true;
    }
  };

  const reset = (event) => {
    event.preventDefault();

    setFirstName("");
    setFirstNameError(null);

    setLastName("");
    setLastNameError(null);

    setEmail("");
    setEmailError(null);

    setPassword("");
    setPasswordError(null);

    setConfirmPassword("");
    setConfirmPasswordError(null);

    setFormValid(false);
  };

  const register = async (event) => {
    event.preventDefault();

    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      setFormValid(false);
    } else {
      const request = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      const response = await axios.post("https://blgczn97se.execute-api.us-east-1.amazonaws.com/prod/registration", request);
      if (response.status === 200) {
        setFormValid(true);
        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      } else {
        setFormValid(false);
      }
    }
  };

  return (
    <form action={register}>
      <div className="h-screen flex justify-center items-center">
        <div className="w-1/3 border rounded-3xl border-gray-900/10 shadow-xl p-6">
          {formValid && (
            <div
              id="toast-success"
              class="flex items-center w-full max-w-xs p-4 mb-4 text-green-700 bg-green-200 rounded-lg shadow"
              role="alert"
            >
              <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-700 bg-green-200 rounded-lg">
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span class="sr-only">Check icon</span>
              </div>
              <div class="ms-3 text-sm font-normal">
                Registration Successful!
              </div>
            </div>
          )}
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Registration
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
            <div className="sm:col-span-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    onBlur={handleFirstNameChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {firstNameError && (
                <div className="text-red-600">{firstNameError}</div>
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
            <div className="sm:col-span-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    onBlur={handleLastNameChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {lastNameError && (
                <div className="text-red-600">{lastNameError}</div>
              )}
            </div>
          </div>

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

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
            <div className="sm:col-span-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={handleConfirmPasswordChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {confirmPasswordError && (
                <div className="text-red-600">{confirmPasswordError}</div>
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
              onClick={register}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
                <a href="/" className="text-blue-600 underline">Go back to Signin</a>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Registration;
