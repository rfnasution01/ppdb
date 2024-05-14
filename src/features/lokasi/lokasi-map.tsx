import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

export const LokasiMap = ({
  latitude,
  longitude,
  description,
}: {
  latitude: number
  longitude: number
  description?: string
}) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={17}
      style={{ height: '500px' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]}>
        <Tooltip sticky>
          <p className="text-[3rem]">{description}</p>
        </Tooltip>
      </Marker>
    </MapContainer>
  )
}
