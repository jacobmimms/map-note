"use client";
import React, { useState, useCallback } from "react";
import Loading from "../animations/loading";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCamera } from "@fortawesome/free-solid-svg-icons";
import { useLocationAndPosts } from "@/app/providers/locationAndPosts";

async function updateSqlDatabase(
  location,
  content,
  tags,
  setSuccess,
  setFailure
) {
  const post = { post: { content, location, tags } };
  let postResponse;
  try {
    postResponse = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  } catch (error) {
    console.error(error);
  }
  if (postResponse?.ok) {
    if (postResponse.redirected) {
      setFailure(true);
      return;
    }
    setSuccess(true);
  } else {
    console.error("Post upload error:", postResponse);
    setFailure(true);
  }
}

const ImagePreview = React.memo(function ImagePreview({ file }) {
  if (!file) return null;
  return (
    <div className="relative bg-transparent rounded-lg h-20 w-20">
      <Image
        fill
        src={URL.createObjectURL(file)}
        alt="preview image"
        className="rounded-md object-cover "
      />
    </div>
  );
});

export default function UploadBase({
  uploadData,
  setUploadData,
  toggleShelf,
  setFailure,
  setSuccess,
}) {
  const [uploading, setUploading] = useState(false);
  const { location } = useLocationAndPosts();
  const [toggle, setToggle] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!uploadData.file) {
        showPopup();
        return;
      }
      if (location.latitude == null || location.longitude == null) {
        return;
      }
      try {
        const id = `${Date.now()}${uploadData.file.name}`;
        setUploading(true);
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: id,
            contentType: uploadData.file.type,
          }),
        });
        if (response.ok) {
          const { url, fields } = await response.json();
          const formData = new FormData();
          Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
          });
          formData.delete("file");
          formData.append("file", uploadData.file);

          const uploadResponse = await fetch(url, {
            method: "POST",
            body: formData,
          });
          if (!uploadResponse.ok) {
            console.error("S3 Upload Error:", uploadResponse);
            setFailure(true);
          }

          updateSqlDatabase(
            location,
            uploadData.text,
            ["test-tag", "test-tag2"],
            setSuccess,
            setFailure
          );
        } else {
          alert("Failed to get pre-signed URL.");
        }
      } catch (error) {
        console.error(error);
        setFailure(true);
      }
      setUploading(false);
      toggleShelf();
    },
    [uploadData, location, setFailure, setSuccess]
  );

  const setFile = useCallback(
    (e) => {
      const files = e.target.files;
      if (files && files[0]) {
        if (files[0].size > 5000000) {
          alert("File size too large. Please select a file smaller than 5MB.");
          return;
        }
        setUploadData({ ...uploadData, file: files[0] });
      }
    },
    [uploadData, setUploadData]
  );

  const dropdownClass = toggle ? "scale-100" : "scale-0";

  const showPopup = () => {
    setToggle(true);

    setTimeout(() => {
      setToggle(false);
    }, 1200);
  };

  return (
    <div className="relative h-full">
      <div
        className={`${dropdownClass} absolute flex justify-center items-center transition-transform duration-300 w-2/3 h-2/3 bg-red-500  inset-x-0 mx-auto inset-y-0 my-auto rounded-lg p-2`}
      >
        <p className="text-white text-center">
          Please select a file to upload.
        </p>
      </div>

      <form
        className="flex flex-col h-full items-center justify-between p-2 rounded-lg bg-slate-600"
        onSubmit={handleSubmit}
      >
        <ImagePreview file={uploadData.file} />

        <input
          className="hidden"
          id="file"
          type="file"
          onChange={setFile}
          accept="image/png, image/jpeg"
        />
        <input
          id="camera-pic"
          type="file"
          accept="image/*"
          capture="camera"
          className="hidden"
          onChange={setFile}
        ></input>

        <textarea
          className="h-1/2 w-full rounded-lg p-2 bg-slate-800 "
          type="text"
          id="content"
          placeholder="Write your thoughts here!"
          rows={2}
          onChange={(e) => {
            setUploadData({ ...uploadData, text: e.target.value });
          }}
          value={uploadData.text}
        />

        <label
          className="block rounded-lg w-full p-2 hover:cursor-pointer bg-slate-800 hover:bg-slate-700  hover:active:bg-slate-800 hover:text-white"
          htmlFor="camera-pic"
        >
          <FontAwesomeIcon icon={faCamera} className="h-6 w-full" />
        </label>

        <button
          className="block rounded-lg hover:cursor-pointer w-full p-2 bg-slate-800 hover:bg-slate-700 hover:active:bg-slate-800 hover:text-white"
          type="submit"
          disabled={uploading}
        >
          {!uploading ? (
            <FontAwesomeIcon icon={faUpload} className="h-6 w-full" />
          ) : (
            <Loading className={"h-6 w-full"} />
          )}
        </button>
      </form>
    </div>
  );
}
