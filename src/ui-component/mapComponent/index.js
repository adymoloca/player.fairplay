import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const MapComp = (props) => {
    const { fieldLat, fieldLng, mapWidth, mapHeight } = props;

    const containerStyle = {
        width: mapWidth,
        height: mapHeight,
        borderRadius: '12px'
    };

    const center = {
        lat: Number(fieldLat) || 44.43708572726908,
        lng: Number(fieldLng) || 26.15170922883606,
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyChkmfu80TmFTSrSbXnkoPlkMA3dJ1rKhE"
    })

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            options={{
                streetViewControl: false,
            }}
        >
            <Marker key="marker_1"
                position={center}
            />
        </GoogleMap>
    ) : <div>Map cannot be loaded right now, sorry.</div>
}

MapComp.defaultProps = {
    mapWidth: '100%',
    mapHeight: '400px',
}

MapComp.propTypes = {
    mapWidth: PropTypes.string,
    mapHeight: PropTypes.string,
    fieldLat: PropTypes.string,
    fieldLng: PropTypes.string,
}

export default MapComp;