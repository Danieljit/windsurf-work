"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"

interface MapProps {
  location: string
}

export function Map({ location }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize the map
    mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 13)

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: ' OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current)

    // Geocode the location
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
      .then(response => response.json())
      .then((data: Array<{ lat: string; lon: string }>) => {
        if (data && data[0] && mapInstanceRef.current) {
          const { lat, lon } = data[0]
          const latitude = parseFloat(lat)
          const longitude = parseFloat(lon)
          mapInstanceRef.current.setView([latitude, longitude], 13)
          L.marker([latitude, longitude]).addTo(mapInstanceRef.current)
        }
      })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }
    }
  }, [location])

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[300px] rounded-lg overflow-hidden"
    />
  )
}
