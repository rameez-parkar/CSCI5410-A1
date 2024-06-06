import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formValid, setFormValid] = useState(false);
  const request = {
    email: email
  };
  useEffect(() => {
    axios.post("https://blgczn97se.execute-api.us-east-1.amazonaws.com/prod/profile", request).then((response) => {
    if (response.status === 200) {
      setFirstName(response.data.data.firstName);
      setLastName(response.data.data.lastName);
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  });
   });

   const navigatetoUpload = () => {
    navigate("/uploadprofilepic");
   };
  

  return (
    <div>
    {formValid && <div className="h-screen flex justify-center items-center">
      <div className="w-1/3 border rounded-3xl border-gray-900/10 shadow-xl p-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Profile
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
              <div className="flex rounded-md focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                {firstName}
              </div>
            </div>
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
              <div className="flex rounded-md focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                {lastName}
              </div>
            </div>
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
              <div className="flex rounded-md focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                {email}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
                <a onClick={navigatetoUpload} className="text-blue-600 underline">Upload Profile Pic</a>
        </div>
      </div>
    </div>}
    </div>
  );
}

export default Profile;
