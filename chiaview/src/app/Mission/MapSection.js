"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Mission centers and surrounding areas coordinates (Malawi)
const locations = {
  missionCenters: [
    {
      name: "Guma Mission Center, Dowa",
      coords: [-13.68, 33.92],
      description: "Our mission center in Guma, located in Dowa District, serving as the hub for community transformation and spiritual growth.",
      icon: "church",
      influenceRadius: 60, // km
      population: "~50,000+",
      programs: ["Bible Studies", "Prayer Meetings", "Youth Mentorship", "Community Outreach"]
    }
  ],
  surroundingAreas: [
    {
      name: "Nkhotakota",
      coords: [-12.93, 34.30],
      description: "Lakeshore district benefiting from mission outreach programs and community services.",
      population: "~35,000+",
      distance: "~65 km"
    },
    {
      name: "Salima",
      coords: [-13.78, 34.45],
      description: "Strategic location receiving support through education and healthcare initiatives.",
      population: "~42,000+",
      distance: "~75 km"
    },
    {
      name: "Ntchisi",
      coords: [-13.37, 33.92],
      description: "Mountain district served through our spiritual growth and community development programs.",
      population: "~28,000+",
      distance: "~40 km"
    }
  ]
};

// Function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

export default function MapSection() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapStats, setMapStats] = useState({
    totalAreas: 4,
    totalReachKm: 0,
    totalPopulation: "155,000+"
  });

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

      // Center map on Guma, Dowa
      const center = [-13.68, 33.92];
      const map = L.map(mapRef.current, {
        center: center,
        zoom: 9,
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
      });

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Calculate total reach
      let totalReach = 0;
      locations.missionCenters.forEach(center => {
        totalReach += center.influenceRadius;
      });
      setMapStats(prev => ({ ...prev, totalReachKm: totalReach }));

      // Add mission center markers with custom icons
      locations.missionCenters.forEach((center) => {
        const churchIcon = L.divIcon({
          className: "custom-marker church-marker",
          html: `<div style="
            background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
            width: 45px;
            height: 45px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 4px solid white;
            box-shadow: 0 4px 12px rgba(30, 64, 175, 0.4), 0 0 0 3px rgba(30, 64, 175, 0.2);
            position: relative;
            animation: pulse 2s infinite;
          "><span style="
            transform: rotate(45deg);
            display: block;
            color: white;
            font-weight: bold;
            font-size: 24px;
            text-align: center;
            line-height: 36px;
          ">✟</span></div>`,
          iconSize: [45, 45],
          iconAnchor: [22, 45],
        });

        const marker = L.marker(center.coords, { icon: churchIcon }).addTo(map);
        
        // Add influence circle with animation
        const circle = L.circle(center.coords, {
          color: "#3b82f6",
          fillColor: "#60a5fa",
          fillOpacity: 0.12,
          radius: center.influenceRadius * 1000,
          weight: 2,
          dashArray: "5, 5"
        }).addTo(map);

        // Enhanced popup with more details
        marker.bindPopup(`
          <div style="padding: 14px; min-width: 280px; font-family: system-ui;">
            <h3 style="margin: 0 0 12px 0; color: #1e40af; font-weight: bold; font-size: 17px;">${center.name}</h3>
            <p style="margin: 0 0 10px 0; color: #374151; font-size: 14px; line-height: 1.6;">${center.description}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 10px 0;">
            <p style="margin: 8px 0; color: #6b7280; font-size: 13px;"><strong>📍 Reach Radius:</strong> ~${center.influenceRadius} km</p>
            <p style="margin: 6px 0; color: #6b7280; font-size: 13px;"><strong>👥 Population:</strong> ${center.population}</p>
            <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 13px;"><strong>📋 Programs:</strong></p>
            <ul style="margin: 6px 0 0 16px; padding: 0; font-size: 12px; color: #374151;">
              ${center.programs.map(prog => `<li style="margin: 3px 0;">${prog}</li>`).join('')}
            </ul>
          </div>
        `);
      });

      // Add surrounding area markers with distance info
      locations.surroundingAreas.forEach((area) => {
        const areaIcon = L.divIcon({
          className: "custom-marker area-marker",
          html: `<div style="
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3), 0 0 0 2px rgba(16, 185, 129, 0.15);
          "></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const marker = L.marker(area.coords, { icon: areaIcon }).addTo(map);
        
        // Calculate distance from main center
        const distance = calculateDistance(
          locations.missionCenters[0].coords[0],
          locations.missionCenters[0].coords[1],
          area.coords[0],
          area.coords[1]
        );

        marker.bindPopup(`
          <div style="padding: 14px; min-width: 260px; font-family: system-ui;">
            <h3 style="margin: 0 0 12px 0; color: #059669; font-weight: bold; font-size: 17px;">${area.name}</h3>
            <p style="margin: 0 0 10px 0; color: #374151; font-size: 14px; line-height: 1.6;">${area.description}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 10px 0;">
            <p style="margin: 6px 0; color: #6b7280; font-size: 13px;"><strong>📏 Distance from Center:</strong> ${distance} km</p>
            <p style="margin: 6px 0; color: #6b7280; font-size: 13px;"><strong>👥 Population:</strong> ${area.population}</p>
            <div style="margin: 10px 0 0 0; padding: 8px; background: #f0fdf4; border-left: 3px solid #10b981; border-radius: 4px;">
              <p style="margin: 0; font-size: 12px; color: #166534;"><strong>✓ Within reach zone</strong></p>
            </div>
          </div>
        `);
      });

      mapInstanceRef.current = map;

      // Fit bounds to show all locations with padding
      const allMarkers = [
        ...locations.missionCenters.map((loc) => L.marker(loc.coords)),
        ...locations.surroundingAreas.map((loc) => L.marker(loc.coords)),
      ];
      const group = L.featureGroup(allMarkers);
      if (group.getBounds().isValid()) {
        map.fitBounds(group.getBounds().pad(0.2));
      }

      // Add map styles for animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0% { box-shadow: 0 4px 12px rgba(30, 64, 175, 0.4), 0 0 0 3px rgba(30, 64, 175, 0.2); }
          50% { box-shadow: 0 4px 12px rgba(30, 64, 175, 0.6), 0 0 0 8px rgba(30, 64, 175, 0.1); }
          100% { box-shadow: 0 4px 12px rgba(30, 64, 175, 0.4), 0 0 0 3px rgba(30, 64, 175, 0.2); }
        }
        .leaflet-popup-content { font-size: 14px; }
        .leaflet-control-zoom { z-index: 10; }
      `;
      document.head.appendChild(style);
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
      {/* Full-width map container */}
      <div className="w-full">
        <div className="px-0 md:px-4">
          <div className="text-center mb-8 px-6">
            <h2 className="mb-4 text-3xl font-bold text-blue-900 sm:text-4xl">
              Our Mission Reach & Analysis
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-700">
              Interactive map showing our mission center and areas served across Central Malawi
            </p>
          </div>

          {/* Map Container - Full Width with proper containment */}
          <div className="relative w-full h-[700px] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-100" style={{ isolation: "isolate" }}>
            <div ref={mapRef} className="w-full h-full z-0 relative" />
            
            {/* Map Legend - Contained within map */}
            <div className="absolute top-6 right-6 bg-white/98 backdrop-blur-md rounded-xl shadow-xl p-5 z-50 border-2 border-blue-200 max-w-sm pointer-events-auto" style={{ position: "absolute" }}>
              <h3 className="font-bold text-base mb-4 text-blue-900 flex items-center gap-2">
                <span className="text-lg">📍</span> Map Legend
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded transition">
                  <div className="w-5 h-5 bg-blue-600 rounded-full" style={{ transform: "rotate(-45deg)", borderRadius: "50% 50% 50% 0", border: "2px solid white", boxShadow: "0 2px 6px rgba(30, 64, 175, 0.3)" }}>
                    <span className="text-white text-[9px]" style={{ transform: "rotate(45deg)", display: "block", lineHeight: "18px", textAlign: "center", fontWeight: "bold" }}>✟</span>
                  </div>
                  <span className="text-gray-700 font-medium">Main Mission Center</span>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-green-50 rounded transition">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                  <span className="text-gray-700 font-medium">Served Districts</span>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded transition">
                  <div className="w-5 h-5 border-2 border-blue-400 border-dashed rounded-full bg-blue-300/20"></div>
                  <span className="text-gray-700 font-medium">Influence Zone</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">Click on markers for details</p>
              </div>
            </div>

            {/* Map Stats Card - Bottom Left */}
            <div className="absolute bottom-6 left-6 bg-white/98 backdrop-blur-md rounded-xl shadow-xl p-4 z-50 border-2 border-blue-200 pointer-events-auto" style={{ position: "absolute" }}>
              <h4 className="font-bold text-sm text-blue-900 mb-3">📊 Coverage Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Areas:</span>
                  <span className="font-bold text-blue-600">{mapStats.totalAreas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reach Zone:</span>
                  <span className="font-bold text-blue-600">{mapStats.totalReachKm} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Population:</span>
                  <span className="font-bold text-blue-600">{mapStats.totalPopulation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Below Map */}
      <div className="mx-auto max-w-7xl px-6 mt-12">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">✟</span> Spiritual Impact
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Our mission centers provide regular worship services, Bible study groups, and prayer meetings, reaching thousands of families with the gospel message.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🤝</span> Community Reach
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Through educational programs, healthcare initiatives, and community outreach, we're transforming lives across the central region of Malawi.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📈</span> Growth Metrics
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              With a reach zone of 60+ km and a combined population of 155,000+, our mission continues to expand its kingdom impact.
            </p>
          </motion.div>
        </div>

        {/* Detailed Area Analysis */}
        <motion.div
          className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8 border border-blue-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-6">📋 Areas Served Analysis</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {locations.surroundingAreas.map((area, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-bold text-blue-900 mb-2">{area.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{area.description}</p>
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>👥 Population: {area.population}</span>
                  <span>📏 {area.distance}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}