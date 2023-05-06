import mapboxgl from "mapbox-gl";
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import geoJson from "../data/locations.json"
import otherlocations from "../data/otherlocations.json"
import Image from "next/image";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXKEY;


const Popup = ({ heading, name, image }) => (
  <div className="popup-container">
    <p className="loc-heading"> {heading}</p>
    <div className="popup" id="popupId">
      <Image className="loc-image" src={image} alt="location image" width={70} height={70} />
    </div>
    <p className="loc-artist"> By: {name}</p>

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
        )
      }
      )}
    </div>
  )
}
const ImageList = () => {

  return (

    <div className="image-list-container">
      {geoJson.features.map(({ properties: { image } }, index) => {
        return (
          <div key={index} className="image-list">
            <a href="#popId">
              <Image src={image} className="image" alt="artist" width={200} height={200} />
            </a>
          </div>
        )
      }
      )}
    </div>
  )
}

const Map = () => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
  const map = useRef(null);

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


    map.on("load", function () {
      // Add an image to use as a custom marker
      map.loadImage(
        "/images/star.png",
        function (error, stars) {
          if (error) throw error;
          map.addImage("local-marker", stars);
          // Add a GeoJSON source with multiple points
          map.addSource("star", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: otherlocations.features,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: "star",
            type: "symbol",
            source: "star",
            layout: {
              "icon-image": "local-marker",
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

    function handlePopup(e, layers) {
      const features = map.queryRenderedFeatures(e.point, {
        layers,
      });

      if (features.length > 0) {
        const feature = features[0];
        const popupNode = document.createElement("div");

        ReactDOM.render(
          <Popup
            image={feature?.properties?.image}
            heading={feature?.properties?.heading}
            name={feature?.properties?.name}
          />,
          popupNode
        );
        popUpRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(popupNode)
          .addTo(map);
      }
    }

    map.on("mouseenter", ["points", "star"], function () {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", ["points", "star"], function () {
      map.getCanvas().style.cursor = "";
      popUpRef.current.remove();
    });

    map.on("click", ["points", "star"], function (e) {
      const layer = e.features[0].layer.id;
      handlePopup(e, [layer]);
    });

    map.on("mousemove", ["points", "star"], function (e) {
      const layer = e.features[0].layer.id;
      const features = map.queryRenderedFeatures(e.point, {
        layers: [layer],
      });

      if (features.length > 0) {
        const feature = features[0];
        map.getCanvas().style.cursor = "pointer";

        const coordinates = feature.geometry.coordinates.slice();
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // create popup node
        const popupNode = document.createElement("div");

        ReactDOM.render(
          <Popup
            image={feature?.properties?.image}
            heading={feature?.properties?.heading}
            name={feature?.properties?.name}
          />,
          popupNode
        );

        popUpRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(popupNode)
          .addTo(map);
      } else {
        map.getCanvas().style.cursor = popUpRef.current.remove();
      }
    });

    return () => map.remove();

  }, []);

  return (
    <div>
      <ImageList />
      <div className="map-container" ref={mapContainerRef} />
      <Images />
      <div>
      </div>
    </div>
  )
};


export default Map;
