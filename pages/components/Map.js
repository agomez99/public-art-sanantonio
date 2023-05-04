import mapboxgl from "mapbox-gl";
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import geoJson from "../data/locations.json"
import Image from "next/image";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWdvbWV6OTkiLCJhIjoiY2tjbWp1cjFqMDIyNjJ6bnNia2NhYXl1OCJ9.cMo6zH8dcAS-1g_nR9HjFQ";

const Popup = ({ heading, name, image }) => (
  <div className="popup">
    <div className="route-metric-row">
      <Image className="row-value" src={image} alt="location image" width={50} height={50} />
    </div>
    <p className="loc-heading"> {heading}</p>
    <p className="loc-artist"> Artist: {name}</p>
  </div>
)

const Images = () => {
  return (
    <div className="image-box-container">
      {geoJson.features.map(({ properties: { image } }, index) => {
        return (
          <div key={index} className="image-box">
          <a href="">
            <Image src={image} className="image" alt="artist" width={200} height={200} />
            </a>
          </div>
        ) }
      )}
    </div>
  )
}


const Map = () => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
  const map = useRef(null);

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);




  // Initialize map when component mounts
  useEffect(() => {
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-98.48612044232871, 29.426359577566828],
      zoom: 12,
    });



    
    map.on("load", function () {
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);

          // Add a GeoJSON source with multiple points
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: geoJson.features,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });



    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.on("click", e => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["points"],
      })
      //var id = e.features.properties.id;

      if (features.length > 0) {
        const feature = features[0]
        // create popup node
        const popupNode = document.createElement("div")

        ReactDOM.render(
          <Popup
            image={feature?.properties?.image}
            heading={feature?.properties?.heading}
            name={feature?.properties?.name}

          />,
          popupNode
        )
        popUpRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(popupNode)
          .addTo(map)
      }
    })





    // Clean up on unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    });


  return (
    <div>
        <div id="listings" />

    <div className="sidebar">

            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      <div className="map-container" ref={mapContainerRef} />
      <Images />
      <div>
        </div>
    </div>
  )
};


export default Map;
