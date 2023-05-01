import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import geoJson from "../data/locations.json"
import Image from "next/image";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWdvbWV6OTkiLCJhIjoiY2tjbWp1cjFqMDIyNjJ6bnNia2NhYXl1OCJ9.cMo6zH8dcAS-1g_nR9HjFQ";

  const Popup = ({heading, name, image}) => (
    <div className="popup">
      <div className="route-metric-row">
        <Image className="row-value" src={image} alt="location image"/>
      </div>
      <p className="loc-heading"> {heading}</p>
      <p className="loc-artist"> Artist: {name}</p>
    </div>
  )
/*   
const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.description);
  };

  return (
    <button onClick={_onClick} className="marker">
      {children}
    </button>
  );
}; */

const Map = () => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))

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

  return <div className="" ref={mapContainerRef} />;
};


export default Map;
