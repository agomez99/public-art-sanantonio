import React from 'react'
import Artists from "./components/Artists"
import Navbar from './components/Navbar'
export default function artist() {
  return (
    <div>
    <Navbar/>
    Artists List
      <Artists/>
      </div>
  )
}
