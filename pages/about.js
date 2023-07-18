
import React from 'react'
import Navbar from './components/Navbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '@/styles/About.module.css'





export default function About() {
    return<>
    <Navbar/>
  <Container className={styles.main}>
      <Row>
        <Col>
          <div>
            <p>
            Greetings, my name is Austine. I possess a strong passion for both web development and the arts. 
            The purpose behind my website is to promote a greater understanding and appreciation of public art within my city. I aimed to establish a user-friendly platform that allows local residents and visitors alike to effortlessly discover various public art installations. Furthermore, I sought to highlight the works of talented local artists, 
            both from the past and present, who have graciously contributed their art for everyone to admire.
            </p>
          </div>
        </Col>
      </Row>
    </Container>

    </> 
  }