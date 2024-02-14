"use client";
import dynamic from "next/dynamic";
import PostInput from "../components/post/postInput";
import { useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import PostList from "./postList";
const ExploreMap = dynamic(() => import("../components/map/exploreMap"), {
  ssr: false,
});

function ExplorePage() {
  const params = useSearchParams();
  const [toggle, setToggle] = useState(false);
  const latitude = params.get("latitude");
  const longitude = params.get("longitude");

  function toggleCb(toggleFunc) {
    console.log("toggling");
    // get the interface element and set height to 0
    const interfaceElement = document.getElementById("interface");
    if (!interfaceElement.classList.contains("h-full")) {
      interfaceElement.classList.remove("h-full");
      interfaceElement.classList.add("h-0");
    } else {
      interfaceElement.classList.remove("h-0");
      interfaceElement.classList.add("h-full");
    }

    return toggleFunc;
  }

  return (
    <section className="h-full relative flex flex-col items-start gap-2">
      <ExploreMap
        toggledHeight={"h-1/2"}
        toggledWidth={"w-full"}
        toggleCb={toggleCb}
        position={{
          latitude: latitude ? latitude : null,
          longitude: longitude ? longitude : null,
        }}
      />
      <div id="interface" className={`w-full h-auto flex flex-col flex-grow`}>
        <div className="flex flex-row items-center justify-center w-full">
          <button
            className="bg-stone-200 text-slate-800"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? "Create Post" : "View Posts"}
          </button>
        </div>
        <div className="w-full h-auto relative flex flex-row flex-grow">
          {toggle ? <PostList /> : <PostInput />}
        </div>
      </div>
    </section>
  );
}

export default ExplorePage;
