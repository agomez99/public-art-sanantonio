import mapboxgl from "mapbox-gl";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { createRoot } from 'react-dom/client'

import Image from "next/image";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import Link from "next/link"

import geoJson from "../data/locations.json"
import otherlocations from "../data/otherlocations.json"
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

const Map = () => {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);

  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
  const map = useRef(null);
  const [lng] = useState(-98.48612044232871);
  const [lat] = useState(29.426359577566828);
  const [zoom, setZoom] = useState(12);

  const [artistheading, setHeading] = useState("")
  const [artistname, setName] = useState([geoJson.features[0].properties.name])
  const [artistImage, setImage] = useState([geoJson.features[0].properties.image])
  const [addressLocation, setAddressLocation] = useState([geoJson.features[0].properties.address])

  const [artistData, setArtistData] = useState({
    heading: geoJson.features[0].properties.heading,
    name: geoJson.features[0].properties.name,
    image: geoJson.features[0].properties.image,
    address: geoJson.features[0].properties.address,
  });

  const [expanded, setExpanded] = useState(false)
  const dataForDisplay = expanded ? geoJson.features : geoJson.features.slice(0, 9)

  const [selectedLocation, setSelectedLocation] = useState({
    name: artistname,
    latitude: lat,
    longitude: lng,
  });
  const handleLocationSelection = (coordinates) => {
    setLatitude(coordinates[1]);
    setLongitude(coordinates[0]);
  };
  const handleNearbyLocationClick = (location) => {
    handleSelectLocation(location);
    setExpanded(false);
    setZoom(15);

  }



  const handleSelectLocation = (geoJson) => {
    const { coordinates } = geoJson.geometry;
    const { heading, name, image, address, description } = geoJson.properties;

    const newZoom = 15;

    if (map.current) {
      const { flyTo, Popup } = map.current;

      flyTo({
        center: coordinates,
        zoom: newZoom,
        essential: true,
      });

      const popupContent = (
        <Popup
          heading={heading}
          name={name}
          image={image}
          address={address}
          description={description}
        />
      );

      const popupRef = popUpRef.current;
      popupRef
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    }

    const artistData = { heading, name, image, address };

    setArtistData(artistData);

    const selectedLocation = {
      name,
      latitude: coordinates[1],
      longitude: coordinates[0],
      heading,
      image,
      address,
      description,
    };
    setSelectedLocation(selectedLocation);
  }



  // Initialize map when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [lng, lat],
      zoom: zoom,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    //   map.on('style.load', () => {
    //     map.setConfigProperty('basemap', 'lightPreset', 'dusk');
    // });

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
            glyphs: "https://api.mapbox.com/fonts/v1/agomez99/Arial%20Unicode%20MS%20Regular/0-255.pbf",
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
        "/images/starmark.png",
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


        createRoot(popupNode).render(
          <Popup
            image={feature?.properties?.image}
            heading={feature?.properties?.heading}
            name={feature?.properties?.name}
          />,
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

    map.on("click", ["points", "star"], function (e) {
      const layer = e.features[0].layer.id;

      handlePopup(e, [layer]);

      map.flyTo({
        center: e.lngLat,
        zoom: 16,
        essential: true
      });

      setArtistData({
        name: e.features[0].properties.name,
        heading: e.features[0].properties.heading,
        address: e.features[0].properties.address,
        image: e.features[0].properties.image,

      });

      handleLocationSelection(e.features[0].geometry.coordinates);

    });



    map.on("click", ["points", "star"], function (e) {
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

      } else {
        map.getCanvas().style.cursor = popUpRef.current.remove();
      }
    });


    map.on('style.load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });

  }, [ lat,lng, zoom]);





const calculateDistance = useCallback( (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }
  , []);

  const isApproximatelyEqual = (value1, value2, tolerance = 0.00001) => {
    return Math.abs(value1 - value2) < tolerance;
  };


  const degToRad = (deg) => {
    return deg * (Math.PI / 180);
  };
  useEffect(() => {
    if (latitude && longitude) {
      const nearby = geoJson.features.filter(location => {
        const distance = calculateDistance(
          latitude,
          longitude,
          location.geometry.coordinates[1], // Latitude
          location.geometry.coordinates[0]  // Longitude
        );
        return distance <= 3 && !isApproximatelyEqual(
          location.geometry.coordinates[1], latitude) &&
          !isApproximatelyEqual(location.geometry.coordinates[0], longitude);
      });
      setNearbyLocations(nearby);

    }
  }, [latitude, longitude, calculateDistance]);






  return (

    //show more button CSS
    <Container>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: #372545;
      color: white;
      margin-bottom: 1rem;
      width:50%;
    }
    .btn-flat:hover {
      background-color: white;
      color:  #372545;
      margin-bottom: 1rem;
      width:50%;
      border: 1px solid #372545;
    }
    .btn-xxl {
      font-size: 1.5rem;
    }
    
    @media only screen and (max-width: 600px) {
        .btn-xxl {
          font-size: 1rem;
        }
        .btn-flat {

      width:100%;
    }
     .btn-flat:after  {
      background-color:white;
      width:100%;
    }
      
    }
    `}

      </style>
      <Row className="text-center" >
        <div className="image-box-container ">
          {dataForDisplay.map((location, index) => (
            <ul key={index} >
              <a href="#side">
                <Image onClick={() => handleSelectLocation(location)} src={geoJson.features[index].properties.image} width={100} height={100} alt="location-image" className="image-list" />
              </a>
            </ul>
          ))}

        </div>
        <h1>Locations</h1>

        <div className="text-center" >
          <Button type="button" onClick={() => setExpanded(!expanded)} variant="flat" size="xxl" >
            {expanded ?
              (
                <>
                  <ArrowUp /> show less
                </>
              )
              :
              (
                <>
                  <ArrowDown />show more
                </>
              )
            }
          </Button>
        </div>
        </Row>
        <Row className="text-center mapfeature-container" >

        <Col md={8}>
          <div className="map-container" ref={mapContainerRef} />
          {/*           
          {latitude && longitude ? (
        <div>
          Latitude: {latitude}<br />
          Longitude: {longitude}
        </div>
      ) : (
        <p>Loading...</p>
      )} */}

          <h2>Nearby Locations</h2>
          <div class="nearby-container">
            <ul>
              {nearbyLocations.map((location, index) => (

                <li key={index} className="nearby-list">
                  <button
                    onClick={() => handleNearbyLocationClick(location)}
                  >
                    <img src={location.properties.image} className="nearby-image" alt="featured-image" />
                  </button>
                  <p> {calculateDistance(
                    latitude,
                    longitude,
                    location.geometry.coordinates[1], // Latitude
                    location.geometry.coordinates[0]  // Longitude
                  ).toFixed(2)}mi</p>
                </li>
              ))}
            </ul>
          </div>

        </Col>
        <Col md={4}>
          <div className="sidebar">
            <Link href={`/profiles/${artistData.name}`}> <h2 className="artlink"> {artistData.name} </h2></Link>
            <p> {artistData.heading} </p>
            <p> Location: {artistData.address} </p>
            <a href="#side">
              <img src={artistData.image} className="display-image" alt="featured-image" />
            </a>

          </div>

        </Col>
        </Row>
    </Container>
  )
};


export default Map;