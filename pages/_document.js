import { Html, Head, Main, NextScript } from 'next/document'
import Nav from './components/Navbar'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.0.0-beta.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <link rel="icon" href="./alamo.png" />
        <meta charset="utf-8" />
      </Head>
      <Nav />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
