'use client'
import React, { useState, useEffect } from 'react';
import { Marker } from 'react-leaflet/Marker'

export default function LocationMarker({ position }) {
    const icon = L.icon({
        iconUrl: './location.png',
        iconSize: [15, 15],
    });

    if (!position) return null;

    return (<Marker position={[position.latitude, position.longitude]} icon={icon} ></Marker>
    )
}