import React from 'react'
import geoJson from "../data/locations.json"
import Image from 'next/image'

export default function Artists() {
  return (
<div className="">
      {geoJson.features.map(({ properties: { name, avatar } }, index) => {
        return (
          <div key={index} className="image-box">
          <a href={`/profiles/${name}`}>
          <Image src={avatar} alt="avatar" width={200} height={200}/>
            <p>{name}</p> 
            </a>
          </div>
        ) }
      )}
    </div>
  )
}
