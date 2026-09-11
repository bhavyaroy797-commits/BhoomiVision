import { MapContainer, TileLayer, Marker, Popup, Polygon, CircleMarker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'

// Fix Leaflet's default marker icon paths (Vite bundler gotcha)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Component to log map clicks (for future use — click to add markers)
function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      if (onClick) onClick(e.latlng)
    },
  })
  return null
}

export default function RealMap({
  center = [23.0225, 72.5714], // Ahmedabad
  zoom = 11,
  markers = [],
  polygons = [],
  circleMarkers = [],
  onMapClick,
  height = '600px',
}) {
  return (
    <div style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        {/* Real OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {/* Optional: Satellite tiles toggle — uncomment to use */}
        {/* <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri'
        /> */}

        {markers.map((m, i) => (
          <Marker key={i} position={m.position}>
            <Popup>{m.label}</Popup>
          </Marker>
        ))}

        {polygons.map((p, i) => (
          <Polygon
            key={i}
            positions={p.coords}
            pathOptions={{ color: p.color || '#059669', fillOpacity: 0.3 }}
          >
            {p.label && <Popup>{p.label}</Popup>}
          </Polygon>
        ))}

        {circleMarkers.map((c, i) => (
          <CircleMarker
            key={i}
            center={c.center}
            radius={c.radius || 8}
            pathOptions={{ color: c.color || '#064e3b', fillOpacity: 0.6 }}
          >
            {c.label && <Popup>{c.label}</Popup>}
          </CircleMarker>
        ))}

        <ClickHandler onClick={onMapClick} />
      </MapContainer>
    </div>
  )
}