"use client";
import { useState, useReducer, useMemo } from "react";
import Loading from "@/app/components/animations/loading";
import Image from "next/image";
import {
  faUpload,
  faCamera,
  faTag,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useLocationAndPosts } from "@/app/providers/locationAndPosts";
import IconButton from "@/app/components/iconButton";
import TagInput from "./tagInput";

function ImagePreview({ file, height, width }) {
  if (!file) {
    return null;
  }
  height = height || "h-20";
  width = width || "w-20";
  return (
    <div className={`relative bg-transparent rounded-lg ${height} ${width}`}>
      <Image
        fill
        src={URL.createObjectURL(file)}
        alt="preview image"
        className="rounded-md object-cover "
      />
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <div
      className={`absolute flex items-center justify-center w-4/5 h-4/5 rounded-lg bg-opacity-60 inset-0 m-auto ${error.color} z-10 text-white drop-shadow-md`}
    >
      <span className="text-2xl">{error.message}</span>
    </div>
  );
}

async function uploadToPostgres(id, text, tags, location, triggerErrorMessage) {
  const post = { post: { id, text, location, tags } };
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
    triggerErrorMessage({
      message: "Error in Upload API",
      color: "bg-red-500",
    });
  }

  if (postResponse?.ok) {
    if (postResponse.redirected) {
      triggerErrorMessage({
        message: "Post upload error",
        color: "bg-red-500",
      });
    } else {
      triggerErrorMessage({
        message: "Post uploaded successfully",
        color: "bg-green-500",
      });
    }
  } else {
    console.error("Post upload error:", postResponse);
    triggerErrorMessage({ message: "Post upload error", color: "bg-red-500" });
  }
}

export default function PostInput() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [error, setError] = useState({ message: "", color: "" });
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { location, posts } = useLocationAndPosts();
  const checkSetFile = (file) => {
    if (file.size > 2000000) {
      triggerErrorMessage({
        message: "File size too large",
        color: "bg-red-500",
      });
      return;
    }
    setFile(file);
  };

  function triggerErrorMessage(error) {
    setError(error);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      triggerErrorMessage({ message: "No file selected", color: "bg-red-500" });
      return;
    }
    if (location.latitude == null || location.longitude == null) {
      triggerErrorMessage({
        message: "Location not available",
        color: "bg-red-500",
      });
      return;
    }
    setLoading(true);
    try {
      const id = `${Date.now()}${file.name}`;
      console.log(id, "id", file.type, "file type", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: id,
          contentType: file.type,
        }),
      });
      if (response.ok) {
        const { url, fields } = await response.json();
        const formData = new FormData();
        Object.entries({ ...fields, file }).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.delete("file");
        formData.append("file", file);

        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });
        if (!uploadResponse.ok) {
          console.error("S3 Upload Error:", uploadResponse);
          triggerErrorMessage({
            message: "Upload to S3 failed",
            color: "bg-red-500",
          });
          return;
        }
        uploadToPostgres(id, text, tags, location, triggerErrorMessage);
      } else {
        triggerErrorMessage({
          message: "Failed to get pre-signed URL for S3",
          color: "bg-red-500",
        });
      }
    } catch (error) {
      console.error(error);
      triggerErrorMessage({ message: "Error in upload", color: "bg-red-500" });
    }
    setLoading(false);
  }

  return (
    <div className="w-full flex flex-row  items-start bg-slate-600 rounded-md p-2 shadow-inner shadow-black ">
      {showError && <ErrorMessage error={error} />}

      <form
        className="flex h-full w-full flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <textarea
          className="w-full grow-[2] rounded-lg p-2 bg-stone-200 text-slate-950 shadow-inner shadow-black "
          type="text"
          id="content"
          placeholder="Write your thoughts here!"
          rows={2}
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
        <TagInput
          tags={tags}
          setTags={setTags}
          triggerErrorMessage={triggerErrorMessage}
        />
        <div className="flex flex-row items-center justify-around shadow-inner shadow-slate-800 rounded-md p-2">
          <label htmlFor="file">
            {file ? (
              <ImagePreview file={file} height={"h-16"} width={"w-16"} />
            ) : (
              <IconButton size={8} icon={faCamera} />
            )}
          </label>
          <IconButton size={8} icon={faTag} />
          <IconButton
            size={8}
            type="submit"
            disabled={showError}
            icon={faUpload}
          />
        </div>

        <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => checkSetFile(e.target.files[0])}
        />
      </form>
    </div>
  );
}
