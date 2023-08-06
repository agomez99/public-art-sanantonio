
import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '@/styles/About.module.css'
import { motion } from 'framer-motion';
import {FaGithub, FaLinkedin} from 'react-icons/fa';







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
                I try to keep the artwork up todate and always in sync with the latest developments in art.
                I hope you enjoy the website as much as I enjoy creating it!
              </p>
              <p>
                If you have any questions or would like your art removed, please feel free to contact me at agdevelop3r@gmail.com.
                I look forward to hearing from you!
              </p>
              <p>
                Thank you for visiting!
              </p>
              <p>
                -Austine
              </p>
              <p>
                <a href="https://github.com/agomez99">
                <FaGithub size={30}  color="#372545"/>                </a>
                <a href="https://www.linkedin.com/in/austine-gomez/">
                <FaLinkedin size={30}  color="#372545" />  
                </a>
              </p>
              <p>Blog for more info</p>
              <a href="https://artlocalsanantonio.wordpress.com/" className={styles.blogLink}>https://artlocalsanantonio.wordpress.com/</a>
            </div>
          </motion.div>


        </Col>
      </Row>
    </Container>

  </>
}