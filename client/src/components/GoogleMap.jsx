import {AdvancedMarker, InfoWindow, Map, Pin} from "@vis.gl/react-google-maps";

import mapPin from "../assets/map-pin.png"
import {useState} from "react";

const GoogleMap = ({width, height, lat, lng, zoom, markers, onChange}) => {
    console.log(location);

    const [curlMarker, setCurlMarker] = useState(null);

    const onBoundsChange = (data) => {
        onChange(data.detail.bounds);
    }

    return (
        <>
            <Map
                style={{width: width, height: height}}
                defaultCenter={{lat, lng}}
                defaultZoom={zoom}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={"9ef6f7f0425fa870"}
                onBoundsChanged={onBoundsChange}
            >
                {curlMarker &&
                    <InfoWindow position={{lat: curlMarker.lat, lng: curlMarker.lng}} onClose={() => setCurlMarker(null)} >
                        {curlMarker.name}
                    </InfoWindow>
                }
                {
                    markers.map((marker, index) => {
                        return (
                            <AdvancedMarker position={{lat: marker.lat, lng: marker.lng}} key={index}
                            onClick={()=>setCurlMarker(marker)}>
                                <div className={"flex justify-center items-center"}>
                                    {marker.name}<img src={mapPin} className={"w-[50px]"}/>
                                </div>
                            </AdvancedMarker>
                        )
                    })
                }
            </Map>
        </>
    )
}

export default GoogleMap;