"use client";
import { createContext, useContext, useState, useRef } from "react";
const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null);
  const [update, setUpdate] = useState(null);

  function setMap(map) {
    mapRef.current = map;
    setUpdate(map);
  }

  return (
    <MapContext.Provider value={{ mapRef, setMap }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
