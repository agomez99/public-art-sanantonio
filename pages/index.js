import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import Map from "./components/Map"
import Image from 'next/image'
import { motion } from "framer-motion";
import Head from 'next/head';

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
      <Head>
      <title>Public Art San Antonio</title>
      </Head>
        <main className={`${styles.main}`}>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={styles.bannertxt}
          >
            Public Art San Antonio
          </motion.h1>
          <div className={styles.imageContainer}>
            <Image src="/images/Banner.png" alt="banner" className={styles.banner} width={400} height={400} priority />
          </div>
          <div>
            <Map />
          </div>
        </main>
      </motion.div>
    </>
  )
}
