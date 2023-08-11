import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AnimatePresence } from "framer-motion";
import Nav from './components/Navbar'
 import FooterComponent from './components/FooterComponent';
function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode='wait'>
    <Nav />
      <Component {...pageProps} key={router.route} />
      <FooterComponent/>
    </AnimatePresence>
  );
}
 
export default MyApp;