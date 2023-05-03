import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Map from "./components/Map"
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Navbar/>

      <main className={`${styles.main}`}>
          <h1>Public Art San Antonio</h1>
        <div className="map-container">
          <Map/>
        </div>
       
      </main>
    </>
  )
}
