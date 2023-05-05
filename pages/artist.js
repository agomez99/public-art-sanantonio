import React from 'react'
import Artists from "./components/Artists"
import Navbar from './components/Navbar'
export default function artist() {
  return (
    <div>
    <Navbar/>
    <h1 className='artist-header'>Artists Index</h1>
      <Artists/>
      </div>
  )
}
