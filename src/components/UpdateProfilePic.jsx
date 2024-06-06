import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateProfilePic() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [formValid, setFormValid] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadImage = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profilePic', selectedFile);

    setTimeout(() => {
        setFormValid(true);
    }, 3000);

    try {
      const response = await axios.post('https://blgczn97se.execute-api.us-east-1.amazonaws.com/prod/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.statusCode === 200) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <form action={uploadImage} enctype="multipart/form-data">
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
                Profile Pic uploaded successfully!
              </div>
            </div>
          )}
          <h2 className="text-base mb-4 font-semibold leading-7 text-gray-900">
            Upload Profile Pic
          </h2>

          <input type="file" onChange={handleFileChange} accept="image/*" required />
          <button
              type="submit"
              onClick={uploadImage}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Upload</button>

          <div className="mt-6 flex items-center justify-end gap-x-6">
                <a href="/profile" className="text-blue-600 underline">Back to Profile</a>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UpdateProfilePic;
