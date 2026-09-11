import { MapContainer, TileLayer, Marker, Popup, Polygon, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet's default marker icon paths (Vite bundler gotcha)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function LeafletMap({
  center = [23.0225, 72.5714], // Ahmedabad default
  zoom = 11,
  height = '500px',
  markers = [],
  polygons = [],
  circleMarkers = [],
  showLegend = true,
}) {
  // Default demo markers if none passed — great for dev preview
  const effectiveMarkers = markers.length
    ? markers
    : [
        { position: [23.0225, 72.5714], label: 'Ahmedabad' },
        { position: [19.076, 72.8777], label: 'Mumbai' },
        { position: [28.6139, 77.209], label: 'Delhi' },
      ];

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-emerald-900/10 shadow-sm">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width: '100%' }}
        scrollWheelZoom={true}
      >
        {/* Real OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {effectiveMarkers.map((m, i) => (
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
      </MapContainer>

      {/* Land Use / Land Cover Legend */}
      {showLegend && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs z-[400] border border-emerald-900/10">
          <p className="font-extrabold text-emerald-900 uppercase tracking-wide mb-2 text-[10px]">
            Land Use / Land Cover Legend
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
              <span className="text-slate-700">Agricultural Land</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
              <span className="text-slate-700">Forest Land</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span className="text-slate-700">Built-up Area</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-400 inline-block"></span>
              <span className="text-slate-700">Water Bodies</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-200 inline-block border border-amber-300"></span>
              <span className="text-slate-700">Barren Land</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}