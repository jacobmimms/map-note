"use client";
import dynamic from "next/dynamic";
import PostInput from "../components/post/postInput";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import PostList from "./postList";
import { useMapContext } from "@/app/providers/mapProvider";

const ExploreMap = dynamic(() => import("../components/map/exploreMap"), {
  ssr: false,
});

function ComponentSelector({ names, children, ...props }) {
  const [componentIndex, setComponentIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to the current component based on its index
    const currentElement = scrollRef.current;
    if (currentElement) {
      const scrollWidth = currentElement.scrollWidth / children.length;
      currentElement.scrollTo({
        left: scrollWidth * componentIndex,
        behavior: "smooth",
      });
    }
  }, [componentIndex, children.length]);

  useEffect(() => {
    // Disable touch scrolling
    const handleTouchMove = (e) => {
      e.preventDefault();
    };

    const scrollElement = scrollRef.current;
    scrollElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      scrollElement.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  function ComponentSelect() {
    return (
      <div className="flex flex-row items-center justify-center w-full gap-2">
        {names.map((name, index) => (
          <button
            key={index}
            className={`text-white rounded-md m-1 ${
              index === componentIndex
                ? "bg-slate-700 border-2 border-slate-700"
                : "bg-slate-800 border-2 border-slate-700"
            }`}
            onClick={() => setComponentIndex(index)}
            disabled={index === componentIndex}
          >
            {name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div {...props} className="h-full w-full flex flex-col">
      <ComponentSelect />
      <div
        ref={scrollRef}
        className="h-full flex overflow-x-scroll scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", touchAction: "none" }} // Hide scrollbar for Firefox
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="flex-none w-full snap-center h-full"
            style={{ scrollSnapAlign: "start" }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
function ExplorePage() {
  const params = useSearchParams();
  const [toggle, setToggle] = useState(false);
  const latitude = params.get("latitude");
  const longitude = params.get("longitude");
  const { mapRef } = useMapContext();

  useEffect(() => {
    function locatePost(latitude, longitude) {
      mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
    }
    if (latitude && longitude) {
      locatePost(latitude, longitude);
    }
  }, [latitude, longitude, mapRef]);

  function toggleCb(toggleFunc) {
    const interfaceElement = document.getElementById("interface");
    interfaceElement.classList.toggle("opacity-100");
    interfaceElement.classList.toggle("opacity-0");
    setToggle(!toggle);
    return toggleFunc;
  }
  const slideClass = toggle ? "translate-y-full" : "translate-y-0";

  return (
    <section className="h-full relative flex flex-col items-start gap-2 overflow-y-hidden">
      <ExploreMap
        toggledHeight={"h-1/2"}
        toggledWidth={"w-full"}
        toggleCb={toggleCb}
        position={{
          latitude: latitude ? latitude : null,
          longitude: longitude ? longitude : null,
        }}
      />
      <div
        id="interface"
        className={`absolute bottom-0 w-full h-1/2 flex flex-col flex-grow transition-transform duration-500 ${slideClass}`}
      >
        <ComponentSelector names={["Create Post", "View Posts"]}>
          <PostInput className="h-full" />
          <PostList />
        </ComponentSelector>
      </div>
    </section>
  );
}

export default ExplorePage;
