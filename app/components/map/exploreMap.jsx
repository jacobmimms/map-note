"use client";
import Markers from "./markers";
import LocationMarker from "./locationMarker";
import LocateMe from "./locateMe";
import BaseMap from "./baseMap";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { useMapContext } from "@/app/providers/mapProvider";

function ExploreMap({ toggledHeight, toggledWidth, toggleCb }) {
  const [icon, setIcon] = useState(faMaximize);
  const { mapRef } = useMapContext();
  const savedLocation = localStorage.getItem("lastLocation");
  const mapPosition = useRef(
    savedLocation ? JSON.parse(savedLocation) : { latitude: 0, longitude: 0 }
  );

  function toggleSize() {
    const mapContainer = document.getElementById("explore-map-container");
    if (mapContainer.classList.contains("h-full")) {
      mapContainer.classList.remove("h-full");
      mapContainer.classList.add(toggledHeight);

      mapContainer.classList.remove("w-full");
      mapContainer.classList.add(toggledWidth);
    } else {
      mapContainer.classList.remove(toggledWidth);
      mapContainer.classList.add("h-full");

      mapContainer.classList.remove(toggledHeight);
      mapContainer.classList.add("w-full");
    }

    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 20 * i);
    }
    setIcon(icon === faMaximize ? faMinimize : faMaximize);
  }

  return (
    <div
      id="explore-map-container"
      className={`${toggledHeight} ${toggledWidth} relative rounded-md transition-all duration-500 ease-in-out bg-red-500`}
    >
      <BaseMap position={mapPosition.current}>
        <LocateMe />
        <LocationMarker />
        <Markers />
      </BaseMap>
      <FontAwesomeIcon
        onClick={() => toggleCb(toggleSize)()}
        icon={icon}
        className="absolute bottom-2 right-2 z-20 w-6 h-6 rounded-full p-2 bg-slate-800 hover:cursor-pointer"
      />
    </div>
  );
}

export default ExploreMap;
