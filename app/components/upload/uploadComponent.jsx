"use client";
import { useEffect, useState } from "react";
import UploadBase from "./uploadBase";

export default function UploadComponent({ ...props }) {
  const [shelfOpen, setShelfOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const [uploadData, setUploadData] = useState({
    file: null,
    text: "",
  });

  useEffect(() => {
    if (success) {
      setUploadData({
        file: null,
        text: "",
      });
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
    if (failure) {
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }
  }, [failure, success, shelfOpen]);

  const toggleShelf = () => {
    setShelfOpen(!shelfOpen);
  };
  return (
    <div className="flex h-full w-full flex-grow">
      {success && (
        <div className="absolute  inset-x-0 mx-auto inset-y-0 my-auto  w-2/3 h-2/3">
          <div className="bg-green-500 rounded-md shadow-md p-4">
            <p className="text-white text-center">Upload successful!</p>
          </div>
        </div>
      )}
      {failure && (
        <div className="absolute  inset-x-0 mx-auto inset-y-0 my-auto  w-2/3 h-2/3">
          <div className="bg-red-500 rounded-md shadow-md p-4">
            <p className="text-white text-center">Upload failed!</p>
          </div>
        </div>
      )}

      <div
        className={`bg-transparent rounded-lg shadow-md w-full transition-transform duration-300`}
      >
        <UploadBase
          uploadData={uploadData}
          setUploadData={setUploadData}
          toggleShelf={toggleShelf}
          setFailure={setFailure}
          setSuccess={setSuccess}
        />
      </div>
    </div>
  );
}
