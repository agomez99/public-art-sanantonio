import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Map from "./components/Map"
import Image from 'next/image'
import { motion } from "framer-motion";


const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <main className={`${styles.main}`}>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='banner-txt'
          >
            Public Art San Antonio
          </motion.h1>
          <div className='image-container'>
            <Image src="/images/Banner.png" alt="banner" className="banner" width={400} height={400} />
          </div>
          <div className="map-container">
            <Map />
          </div>
        </main>
      </motion.div>
    </>
  )
}
