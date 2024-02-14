"use client";
import { useState, useReducer, useMemo, useEffect } from "react";
import Loading from "@/app/components/animations/loading";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/app/components/iconButton";

export default function TagInput({ tags, setTags, triggerErrorMessage }) {
  const [currentTag, setCurrentTag] = useState("");

  function handleTag(e) {
    e.preventDefault();
    if (currentTag === "") {
      triggerErrorMessage({
        message: "Tag cannot be empty",
        color: "bg-red-500",
      });
      return;
    }
    if (tags.includes(currentTag)) {
      triggerErrorMessage({
        message: "Tag already exists",
        color: "bg-red-500",
      });
      return;
    }
    setTags([...tags, currentTag]);
  }

  return (
    <div className="flex flex-row flex-wrap justify-start items-center gap-2 bg-stone-200 shadow-inner shadow-black rounded-md overflow-x-scroll h-auto min-h-fit p-2">
      <div className="flex flex-row justify-center gap-2 sm:w-1/2 w-full">
        <input
          placeholder={"Add a tag!"}
          onChange={(e) => setCurrentTag(e.target.value)}
          onSubmit={(e) => {
            e.preventDefault();
            if (tags.includes(currentTag)) {
              triggerErrorMessage({
                message: "Tag already exists",
                color: "bg-red-500",
              });
              return;
            }
            setTags([...tags, currentTag]);
            setCurrentTag("");
          }}
          className=" text-slate-800 bg-stone-200 shadow-inner shadow-stone-500 rounded-md p-1 flex-grow"
        ></input>
        <IconButton onClick={handleTag} icon={faPlus} />
      </div>
      {tags &&
        tags.map((tag, index) => (
          <div
            key={index}
            className="flex flex-row justify-between gap-2 items-center bg-slate-800 rounded-lg px-3 py-1 shadow-md shadow-stone-500"
          >
            <span>{tag}</span>
          </div>
        ))}
    </div>
  );
}
