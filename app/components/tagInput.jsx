"use client";
import { useState, useReducer, useMemo, useEffect } from "react";
import Loading from "@/app/components/animations/loading";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/app/components/iconButton";

export default function TagInput({
  tags,
  setTags,
  triggerErrorMessage,
  placeholder,
}) {
  const [currentTag, setCurrentTag] = useState("");

  function SelectButton({ name, isSelected }) {
    return (
      <button
        onClick={() => setTags({ ...tags, [name]: !isSelected })}
        className={`bg-slate-500 text-white rounded-md px-2 p-1 ${
          isSelected ? "bg-slate-700" : ""
        }`}
      >
        {name}
      </button>
    );
  }

  placeholder = placeholder || "Add a tag!";

  function handleTag(e) {
    e.preventDefault();
    const cleanTag = currentTag.trim();
    if (cleanTag === "") {
      return;
    }
    if (tags[cleanTag]) {
      return;
    }
    setTags({ ...tags, [cleanTag]: true });
    setCurrentTag("");
  }

  return (
    <div className="w-full flex flex-row flex-wrap justify-start items-center gap-2 bg-stone-200 shadow-inner shadow-black rounded-md  h-auto min-h-fit p-2">
      <div className="flex flex-row justify-center gap-2 sm:w-1/2 w-full">
        <input
          placeholder={placeholder}
          onChange={(e) => setCurrentTag(e.target.value)}
          onSubmit={handleTag}
          className=" text-slate-800 bg-stone-200 shadow-inner shadow-stone-500 rounded-md p-1 flex-grow"
        ></input>
        <IconButton onClick={handleTag} icon={faPlus} />
      </div>
      {tags &&
        Object.entries(tags).map(([tag, isSelected]) => (
          <SelectButton key={tag} name={tag} isSelected={isSelected} />
        ))}
    </div>
  );
}
