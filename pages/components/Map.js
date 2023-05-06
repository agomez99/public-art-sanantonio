import mapboxgl from "mapbox-gl";
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { hydrate } from 'react-dom';

import geoJson from "../data/locations.json"
import otherlocations from "../data/otherlocations.json"
import Image from "next/image";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXKEY;


const Popup = ({ heading, name, image }) => (
  <div className="popup-container">
    <p className="loc-heading"> {heading}</p>
    <div className="popup" id="popupId">
    <a href="">
      <Image className="loc-image" src={image} alt="location image" width={70} height={70} />
      </a>
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
              <Image src={image} className="image-list" alt="artist" width={200} height={200} />
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
      {geoJson.features.map(({ properties: { image, heading } }, index) => {
        return (
          <div key={index} className="image-list">
            <a href="">
              {/* <p>{heading}</p> */}
              <Image src={image}  alt="featured-image" className="image"  width={50} height={50} />
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
  const [lng] = useState(-98.48612044232871);
  const [lat] = useState(29.426359577566828);
  const [zoom, setZoom] = useState(12);

  const [artistheading, setHeading] = useState([geoJson.features[0].properties.heading])
  const [artistname, setName] = useState( [geoJson.features[0].properties.name])
  const [artistImage, setImage] = useState([geoJson.features[0].properties.image])
  const[addressLocation,  setAddressLocation] = useState([geoJson.features[0].properties.address])
  

  // Initialize map when component mounts
  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
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
    })

    map.on("click", ["points", "star"], function (e) {
      const layer = e.features[0].layer.id;
      handlePopup(e, [layer]);
      map.flyTo({

        center: e.lngLat,
        zoom: 15,
        essential: true
      });

    });


    map.on("click", ["points",  "star"], function (e) {
      setName(e.features[0].properties.name);
      setImage(e.features[0].properties.image);
      setHeading(e.features[0].properties.heading);
      setAddressLocation(e.features[0].properties.address);
 

    })
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


    <Container>
      <ImageList />

      {/* <Images /> */}
      <Row>
        <Col md={8}>
          <div className="map-container" ref={mapContainerRef} />
        </Col>
        <Col sm={4}>
          <div className="sidebar">
            <p> {artistname} </p>
            <p> {artistheading} </p>
            <p> Address: {addressLocation} </p>
            <a href=" ">
            <img src={artistImage} className="display-image" alt="featured-image" width={400} height={400} />
          </a>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>

        </Col>
      </Row>
    </Container>
  )
};


export default Map;