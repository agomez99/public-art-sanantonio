
import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '@/styles/About.module.css'
import { motion } from 'framer-motion';




export default function About() {
  return <>
    <Container className={styles.main}>
      <Row>
        <Col>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p>
                Greetings, my name is Austine. I possess a strong passion for both web development and the arts.
                The purpose behind my website is to promote a greater understanding and appreciation of public art within my city. I aimed to establish a user-friendly platform that allows local residents and visitors alike to effortlessly discover various public art installations. Furthermore, I sought to highlight the works of talented local artists,
                both from the past and present, who have graciously contributed their art for everyone to admire.
              </p>
            </div>
          </motion.div>


        </Col>
      </Row>
    </Container>

  </>
}