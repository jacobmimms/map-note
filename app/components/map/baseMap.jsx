"use client";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { ZoomControl } from "react-leaflet";
import { useMapContext } from "@/app/providers/mapProvider";

export default function BaseMap({ children, position, ...props }) {
  const { mapRef, setMap } = useMapContext();
  console.count("BaseMap");

  function handleReady(e) {
    setMap(e.target);
    e.target.locate({
      setView: false,
      watch: false,
      maxZoom: 14,
      enableHighAccuracy: true,
    });
    e.target.once("locationfound", (e) => {
      mapRef.current.setView(e.latlng, 14);
    });
    e.target.on("locationerror", (e) => {
      console.error("error in handle ready", e);
    });
  }

  return (
    <MapContainer
      className={"h-full w-full rounded-md"}
      center={[position.latitude, position.longitude]}
      zoom={14}
      zoomControl={false}
      scrollWheelZoom={false}
      whenReady={handleReady}
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
      <ZoomControl position="topright" />
    </MapContainer>
  );
}
