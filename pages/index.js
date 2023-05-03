import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Map from "./components/Map"
const inter = Inter({ subsets: ['latin'] })
import  ImageBox  from './components/ImageBox'
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
      <main className={`${styles.main}`}>
          <h1>Public Art San Antonio</h1>
        <div className="map-container">
          <Map/>
        </div>
       
      </main>
    </>
  )
}
