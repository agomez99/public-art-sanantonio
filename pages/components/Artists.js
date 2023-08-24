import React from 'react';
import geoJson from "../data/locations.json";
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion } from "framer-motion";
import styles from '../../styles/Artist.module.css'

export default function Artists() {
  // Create a Set to store unique artist names
  const uniqueArtistNames = new Set();

  return (
    <Container fluid className={styles.artistContainer}>
      <Row>
        <Col>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.artistHeader}>Artists Index</h1>
            <div className={styles.artistIndexContainer}>
              {geoJson.features.map(({ properties: { name, avatar } }, index) => {
                // Check if the artist name is already added to the Set
                if (!uniqueArtistNames.has(name)) {
                  uniqueArtistNames.add(name);
                  return (
                    <div key={index} className={styles.avatarContainer}>
                      <a href={`/profiles/${name}`} className={styles.artistLink}>
                        <Image src={avatar} alt="avatar" width={200} height={200} className={styles.artistAvatar} priority />
                        <p className={styles.artistName}>{name}</p>
                      </a>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
