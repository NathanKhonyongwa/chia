"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Mission centers and surrounding areas coordinates (Malawi)
const locations = {
  missionCenters: [
    {
      name: "Dowa Mission Center",
      coords: [-13.65, 33.94],
      description: "Primary mission center serving the Dowa district and surrounding communities.",
      icon: "church",
      influenceRadius: 50 // km
    },
    {
      name: "Guma Mission Center",
      coords: [-13.68, 33.92],
      description: "Secondary mission center expanding our reach to the Guma area and neighboring villages.",
      icon: "church",
      influenceRadius: 40 // km
    }
  ],
  surroundingAreas: [
    {
      name: "Nkhotakota",
      coords: [-12.93, 34.30],
      description: "Lakeshore district benefiting from mission outreach programs and community services."
    },
    {
      name: "Salima",
      coords: [-13.78, 34.45],
      description: "Strategic location receiving support through education and healthcare initiatives."
    },
    {
      name: "Ntchisi",
      coords: [-13.37, 33.92],
      description: "Mountain district served through our spiritual growth and community development programs."
    }
  ]
};

export default function MapSection() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Dynamically import Leaflet only on client side
    const loadMap = async () => {
      const leafletModule = await import("leaflet");
      const L = leafletModule.default || leafletModule;
      
      // Import Leaflet CSS
      await import("leaflet/dist/leaflet.css");

      // Fix for default marker icon issue in Next.js
      if (typeof window !== "undefined" && L.Icon && L.Icon.Default) {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });
      }

      if (!mapRef.current || mapInstanceRef.current) {
        return;
      }

      // Center map on Dowa
      const center = [-13.65, 33.94];
      const map = L.map(mapRef.current, {
        center: center,
        zoom: 9,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add mission center markers with custom icons
      locations.missionCenters.forEach((center) => {
        const churchIcon = L.divIcon({
          className: "custom-marker church-marker",
          html: `<div style="
            background: #1e40af;
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            position: relative;
          "><span style="
            transform: rotate(45deg);
            display: block;
            color: white;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            line-height: 24px;
          ">✟</span></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        const marker = L.marker(center.coords, { icon: churchIcon }).addTo(map);
        
        // Add influence circle
        const circle = L.circle(center.coords, {
          color: "#3b82f6",
          fillColor: "#3b82f6",
          fillOpacity: 0.15,
          radius: center.influenceRadius * 1000, // Convert km to meters
          weight: 2,
          dashArray: "5, 5"
        }).addTo(map);

        marker.bindPopup(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #1e40af; font-weight: bold;">${center.name}</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">${center.description}</p>
            <p style="margin: 8px 0 0 0; color: #888; font-size: 12px;"><strong>Influence Radius:</strong> ~${center.influenceRadius} km</p>
          </div>
        `);
      });

      // Add surrounding area markers
      locations.surroundingAreas.forEach((area) => {
        const areaIcon = L.divIcon({
          className: "custom-marker area-marker",
          html: `<div style="
            background: #10b981;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        const marker = L.marker(area.coords, { icon: areaIcon }).addTo(map);
        marker.bindPopup(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #059669; font-weight: bold;">${area.name}</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">${area.description}</p>
          </div>
        `);
      });

      mapInstanceRef.current = map;

      // Fit bounds to show all locations
      const allMarkers = [
        ...locations.missionCenters.map((loc) => L.marker(loc.coords)),
        ...locations.surroundingAreas.map((loc) => L.marker(loc.coords)),
      ];
      const group = L.featureGroup(allMarkers);
      if (group.getBounds().isValid()) {
        map.fitBounds(group.getBounds().pad(0.2));
      }
    };

    loadMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <motion.div
      className="w-full py-16 bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="mb-4 text-3xl font-bold text-blue-900 sm:text-4xl">
            Our Mission Reach
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            Our mission centers in Dowa and Guma serve as hubs of spiritual growth and community development, 
            extending our influence across the surrounding districts of Nkhotakota, Salima, and Ntchisi.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl border-4 border-blue-100">
          <div ref={mapRef} className="w-full h-full z-0" />
          
          {/* Map Legend */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 z-[1000] border border-gray-200">
            <h3 className="font-bold text-sm mb-3 text-gray-800">Legend</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full" style={{ transform: "rotate(-45deg)", borderRadius: "50% 50% 50% 0" }}>
                  <span className="text-white text-[10px]" style={{ transform: "rotate(45deg)", display: "block", lineHeight: "16px", textAlign: "center" }}>✟</span>
                </div>
                <span className="text-gray-700">Mission Center</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                <span className="text-gray-700">Served Area</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-dashed rounded-full bg-blue-500/20"></div>
                <span className="text-gray-700">Influence Zone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Influence Description */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-blue-900 mb-3">Spiritual Impact</h3>
            <p className="text-gray-700">
              Our mission centers provide regular worship services, Bible study groups, and prayer meetings, 
              reaching thousands of families across the region with the gospel message.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-green-900 mb-3">Community Development</h3>
            <p className="text-gray-700">
              Through educational programs, healthcare initiatives, and community outreach, we're transforming 
              lives and empowering communities throughout the central region of Malawi.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}