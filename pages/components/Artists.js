import React from 'react';
import geoJson from "../data/locations.json";
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion } from "framer-motion";

export default function Artists() {
  // Create a Set to store unique artist names
  const uniqueArtistNames = new Set();

  return (
    <Container fluid>
      <Row>
        <Col>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='artist-header'>Artists Index</h1>
            <div className="artist-image-container">
              {geoJson.features.map(({ properties: { name, avatar } }, index) => {
                // Check if the artist name is already added to the Set
                if (!uniqueArtistNames.has(name)) {
                  uniqueArtistNames.add(name);
                  return (
                    <div key={index}>
                      <a href={`/profiles/${name}`} className="name-link">
                        <Image src={avatar} alt="avatar" width={200} height={200} className="artist-image" />
                        <p className="name-text">{name}</p>
                      </a>
                    </div>
                  );
                }
                return null; // Skip duplicates
              })}
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
