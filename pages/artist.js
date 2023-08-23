import React from 'react'
import Artists from "./components/Artists"

import Head from 'next/head'
export default function artist() {
  return (
    <div>
          <Head>
      <title>Public Art San Antonio</title>
      </Head>
      <Artists/>
      </div>
  )
}
