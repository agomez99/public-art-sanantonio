import { Spacer } from '@chakra-ui/react';
import React from 'react'
const year = new Date().getFullYear();
import { Linkedin, Github, Wordpress } from 'react-bootstrap-icons';

function FooterComponent() {
  return <footer>
  {`Copyright © AGDigital ${year}`}  
  <div >
  <a className='p-1' style={{'color': 'white'}} target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/austine-gomez/'>
  <Linkedin />
  </a> 
  <a   className='p-2' style={{'color': 'white'}}  href='https://github.com/agomez99'>
  <Github />
  </a>
  <a style={{'color': 'white'}} href='https://artlocalsanantonio.wordpress.com/'>
    <Wordpress />
  
  </a>
  </div>
  
  </footer>;
}
  

export default FooterComponent