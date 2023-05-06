import React from 'react'
import geoJson from "../data/locations.json"
import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export default function Artists() {
  return (
    <Container fluid>    
     <Row>
        <Col>
          <div className="artist-image-container">
            {geoJson.features.map(({ properties: { name, avatar } }, index) => (
              <div key={index}>
                <a href={`/profiles/${name}`} className="name-link">
                  <Image src={avatar} alt="avatar" width={200} height={200} className="artist-image" />
                  <p className="name-text">{name}</p>
                </a>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

