"use client";
import React, { useMemo } from "react";
import {
  GoogleMap,
  HeatmapLayer,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

interface HeatmapProps {
  hmap: {
    curr?: { lat: number; lon: number };
    high: { lat: number; lon: number }[];
    modarate: { lat: number; lon: number }[];
    low: { lat: number; lon: number }[];
  };
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Heatmap: React.FC<HeatmapProps> = ({ hmap }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["visualization"],
  });

  const heatmapData = useMemo(() => {
    if (!isLoaded || !window.google) return [];

    const data: google.maps.LatLng[] = [];

    hmap.high?.forEach((p) =>
      data.push(new window.google.maps.LatLng(p.lat, p.lon))
    );
    hmap.modarate?.forEach((p) =>
      data.push(new window.google.maps.LatLng(p.lat, p.lon))
    );
    hmap.low?.forEach((p) =>
      data.push(new window.google.maps.LatLng(p.lat, p.lon))
    );

    return data;
  }, [hmap, isLoaded]);

  const center = useMemo(() => {
    if (hmap.curr) return { lat: hmap.curr.lat, lng: hmap.curr.lon };

    const all = [...hmap.high, ...hmap.modarate, ...hmap.low];
    if (!all.length) return { lat: 22.5, lng: 25.2 };

    const lat = all.reduce((s, p) => s + p.lat, 0) / all.length;
    const lon = all.reduce((s, p) => s + p.lon, 0) / all.length;
    return { lat, lng: lon };
  }, [hmap]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
      {/* ✅ Show heatmap points */}
      {heatmapData.length > 0 && (
        <HeatmapLayer
          data={heatmapData}
          options={{
            radius: 30,
            opacity: 0.7,
            gradient: [
              "rgba(0, 255, 0, 0)",   // transparent
              "rgba(0, 255, 0, 1)",   // green (low)
              "rgba(255, 255, 0, 1)", // yellow (medium)
              "rgba(255, 0, 0, 1)",   // red (high)
            ],
          }}
        />
      )}

      {hmap.curr && (
        <Marker
          position={{ lat: hmap.curr.lat, lng: hmap.curr.lon }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Heatmap;
