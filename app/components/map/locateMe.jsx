"use client";
import { useMap } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocationAndPosts } from "../../providers/locationAndPosts";

export default function LocateMe() {
  const map = useMap();
  const { location } = useLocationAndPosts();
  const [disable, setDisable] = useState(false);

  function locateUser() {
    setDisable(true);
    map.setView([location.latitude, location.longitude], 14, {
      animate: true,
      duration: 0.5,
    });
    setDisable(false);
  }

  const disabled = disable ? "spinner" : "text-slate-200";

  return (
    <FontAwesomeIcon
      disabled={disable}
      onClick={locateUser}
      icon={faLocation}
      className={`${disabled} bottom-2 left-2  absolute z-20 w-6 h-6 rounded-full p-2 bg-slate-800 hover:cursor-pointer`}
    />
  );
}
