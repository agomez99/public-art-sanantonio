import React from 'react'
const year = new Date().getFullYear();

function FooterComponent() {
  return <footer>{`Copyright © AGDigital ${year}`}</footer>;
}
  

export default FooterComponent